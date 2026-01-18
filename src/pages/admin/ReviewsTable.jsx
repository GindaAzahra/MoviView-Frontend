import React, { useEffect, useMemo, useRef, useState } from "react";
import { TMDB_IMG, exportReviewsExcel, exportReviewsPdf, getAllReviews, getMovieById } from "../../api";

export default function ReviewsTable() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 10 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [exporting, setExporting] = useState(false);

  // id_movie -> { title, posterUrl, year } cache (persists across pagination for perf)
  const movieMetaCacheRef = useRef(new Map());
  const [, forceRerender] = useState(0);

  const pageNumbers = useMemo(() => {
    const current = meta?.current_page ?? page;
    const last = meta?.last_page ?? 1;
    const start = Math.max(1, current - 2);
    const end = Math.min(last, current + 2);
    const nums = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  }, [meta, page]);

  const uniqueMovieIdsOnPage = useMemo(() => {
    const set = new Set();
    for (const r of items) {
      const id = r?.id_movie ?? r?.movie_id;
      if (id != null) set.add(String(id));
    }
    return Array.from(set);
  }, [items]);

  const missingMovieIds = useMemo(() => {
    const cache = movieMetaCacheRef.current;
    return uniqueMovieIdsOnPage.filter((id) => !cache.has(String(id)));
  }, [uniqueMovieIdsOnPage]);

  const triggerBlobDownload = ({ blob, filename }) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExport = async (type) => {
    setErrorMsg("");

    setExporting(true);
    try {
      // Export ALL reviews (no filtering)
      const res = type === "excel" ? await exportReviewsExcel() : await exportReviewsPdf();

      if (res.error) {
        setErrorMsg(res.message || "Export failed.");
        return;
      }

      triggerBlobDownload(res.data);
    } finally {
      setExporting(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setErrorMsg("");

      const res = await getAllReviews(page);
      if (cancelled) return;

      if (res.error) {
        setItems([]);
        setMeta({ current_page: page, last_page: 1, total: 0, per_page: 10 });
        setErrorMsg(res.message || "Failed to load reviews.");
        setLoading(false);
        return;
      }

      // normalized by api.js: { data: [...], meta: {...} }
      const list = res.data?.data ?? [];
      const m = res.data?.meta ?? null;

      setItems(list);
      setMeta({
        current_page: m?.current_page ?? page,
        per_page: m?.per_page ?? 10,
        total: m?.total ?? list.length,
        last_page: m?.last_page ?? 1,
      });

      setLoading(false);
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [page]);

  useEffect(() => {
    let cancelled = false;

    const buildPosterUrl = (posterPath) => {
      if (!posterPath) return null;
      // backend may already return full URL (as in MovieHero usage)
      if (String(posterPath).startsWith("http")) return posterPath;
      // otherwise treat as TMDB path
      return `${TMDB_IMG}${posterPath.startsWith("/") ? "" : "/"}${posterPath}`;
    };

    const hydrateMovieMeta = async () => {
      if (missingMovieIds.length === 0) return;

      setLoadingMovies(true);
      const cache = movieMetaCacheRef.current;

      try {
        // Fetch only what's needed for this page; cache ensures no repeat across pagination.
        const tasks = missingMovieIds.map((id) =>
          getMovieById(id)
            .then((res) => ({ id, res }))
            .catch(() => ({ id, res: { error: true } }))
        );

        const results = await Promise.all(tasks);
        if (cancelled) return;

        for (const { id, res } of results) {
          if (!res || res.error || !res.data) {
            cache.set(String(id), { title: `Movie #${id}`, posterUrl: null, year: null });
            continue;
          }

          const m = res.data;
          const title = m?.original_title ?? m?.title ?? m?.name ?? `Movie #${id}`;
          const year = m?.release_date ? new Date(m.release_date).getFullYear() : null;
          const posterUrl = buildPosterUrl(m?.poster_path);

          cache.set(String(id), { title, year, posterUrl });
        }

        forceRerender((x) => x + 1);
      } finally {
        if (!cancelled) setLoadingMovies(false);
      }
    };

    hydrateMovieMeta();

    return () => {
      cancelled = true;
    };
  }, [missingMovieIds]);

  const canPrev = (meta?.current_page ?? page) > 1;
  const canNext = (meta?.current_page ?? page) < (meta?.last_page ?? 1);

  const footerLabel = useMemo(() => {
    const total = meta?.total ?? items.length;
    const perPage = meta?.per_page ?? (items.length || 10);
    const current = meta?.current_page ?? page;
    const from = total === 0 ? 0 : (current - 1) * perPage + 1;
    const to = Math.min(total, current * perPage);
    return `Showing ${from} to ${to} of ${total} reviews`;
  }, [meta, items.length, page]);

  return (
    <div className="card admin-card border-0 shadow-sm">
      {/* Header actions (match DashboardTable vibe) */}
      <div className="px-4 py-3 d-flex align-items-center justify-content-between bg-admin-sidebar border-bottom border-secondary">
        <div className="d-flex flex-column">
          <span className="fw-semibold text-white">Reviews</span>
          <span className="text-white-50 small">
            {loadingMovies ? "Resolving movie details..." : ""}
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-admin-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              disabled={exporting}
            >
              {exporting ? "Exporting..." : "Export"}
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <button className="dropdown-item" onClick={() => handleExport("excel")} disabled={exporting}>
                  Export Excel
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => handleExport("pdf")} disabled={exporting}>
                  Export PDF
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0 text-white">
          <thead className="bg-admin-sidebar">
            <tr>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent" style={{ width: 110 }}>
                Review ID
              </th>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">
                Movie
              </th>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent" style={{ width: 120 }}>
                Rating
              </th>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">
                Review
              </th>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent" style={{ width: 200 }}>
                Reviewer
              </th>
              <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent" style={{ width: 220 }}>
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {errorMsg ? (
              <tr className="admin-table-row">
                <td colSpan={6} className="px-4 py-3">
                  <div className="alert alert-danger mb-0">{errorMsg}</div>
                </td>
              </tr>
            ) : loading ? (
              <tr className="admin-table-row">
                <td colSpan={6} className="px-4 py-4 text-center text-white-50">
                  Loading reviews...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr className="admin-table-row">
                <td colSpan={6} className="px-4 py-4 text-center text-white-50">
                  No reviews found.
                </td>
              </tr>
            ) : (
              items.map((r, idx) => {
                const idMovie = r?.id_movie ?? r?.movie_id;
                const movieIdKey = idMovie != null ? String(idMovie) : null;
                const movieMeta = movieIdKey ? movieMetaCacheRef.current.get(movieIdKey) : null;

                return (
                  <tr
                    key={r.id_review ?? `${idMovie}-${r.created_at}-${idx}`}
                    className={`admin-table-row ${idx % 2 === 1 ? "bg-admin-sidebar" : ""}`}
                  >
                    <td className="px-4 py-3 border-secondary">{r.id_review ?? "-"}</td>

                    <td className="px-4 py-3 border-secondary">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="bg-dark rounded flex-shrink-0"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundImage: movieMeta?.posterUrl ? `url('${movieMeta.posterUrl}')` : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          aria-hidden="true"
                        />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold">
                            {movieMeta?.title
                              ? `${movieMeta.title}${movieMeta.year ? ` (${movieMeta.year})` : ""}`
                              : (loadingMovies ? "Resolving..." : (movieIdKey ? `Movie #${movieIdKey}` : "-"))}
                          </span>
                          <span className="text-white-50 small">ID: {movieIdKey ?? "-"}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 border-secondary">
                      <span className="text-admin-primary fw-semibold">{r.rating ?? "-"}/5</span>
                    </td>

                    <td className="px-4 py-3 border-secondary text-white-50" style={{ maxWidth: 520, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {r.review ?? r.comment ?? "-"}
                    </td>

                    <td className="px-4 py-3 text-sm border-secondary text-white-50">
                      {r.user?.name ?? r.user_name ?? "-"}
                    </td>

                    <td className="px-4 py-3 text-white-50 small border-secondary">
                      {r.created_at ? new Date(r.created_at).toLocaleString() : "-"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (match DashboardTable) */}
      <div className="px-4 py-3 d-flex align-items-center justify-content-between bg-admin-sidebar">
        <span className="text-white-50 small">{footerLabel}</span>

        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-custom"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={!canPrev || loading}
          >
            Previous
          </button>

          <div className="btn-group" role="group" aria-label="Pagination">
            {pageNumbers.map((n) => (
              <button
                key={n}
                className={`btn btn-sm ${n === (meta?.current_page ?? page) ? "btn-admin-primary" : "btn-outline-custom"}`}
                onClick={() => setPage(n)}
                disabled={loading}
              >
                {n}
              </button>
            ))}
          </div>

          <button
            className="btn btn-sm btn-admin-primary"
            onClick={() => setPage((p) => p + 1)}
            disabled={!canNext || loading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
