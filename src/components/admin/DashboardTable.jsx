export default function DashboardTable() {
    return (
        <div className="card admin-card border-0 shadow-sm">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 text-white">
                    <thead className="bg-admin-sidebar">
                        <tr>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">Movie Title</th>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">Reviewer</th>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">Rating</th>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent">Date</th>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent text-center">Status</th>
                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 bg-transparent text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="admin-table-row">
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-dark rounded" style={{ width: '40px', height: '40px', backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlKpMX_BjLJE7vUD4MdxutiiB_8uAK6yzkzlIuoyso9xrruPXmJWDGZ-fcwaRMZun0Hxeq8BKq0NqrPvwZSc6zRwSYi9tgK79FFHXTPltyUF8sg1fnRsJtpYnZK_kbW1W5UL8RWrHHtU0cgKKSK-5SN9IYHktu4IwaAgUPSCI5opkKUlapxOMWcto3XfU4qT9Gcu8_qKXVFmExdh-meNOn51NnElrmbImE5Vqx4CBJjiBfH_nPVels-TZWarg9IDE3FBIHENYtwPA')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <span className="fw-semibold">Inception (2010)</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm border-secondary text-white-50">Christopher Nolan Fan</td>
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex text-admin-primary">
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-white-50 small border-secondary">05/12/2023</td>
                            <td className="px-4 py-3 text-center border-secondary">
                                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2">Published</span>
                            </td>
                            <td className="px-4 py-3 text-end border-secondary">
                                <button className="btn btn-link text-white-50 p-0 hover-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                            </td>
                        </tr>
                        <tr className="admin-table-row bg-admin-sidebar">
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-dark rounded" style={{ width: '40px', height: '40px', backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCB47cigA0g8OgTX7CJ5gmp29Kt3OuWebIPVXmErQ6xvG78x_wlfL-0flL5kLilurGMTT4UpvmzVxjJtSnV5rXSHE2fonkyKJPSNdlWELNoWUG3og1KAUoQ_Icas9BE_4zgsk179U0tmZy7htx5bK1eHOIk4-h3HriFL-wm3wupmSY8lWu2uutt3Crwi8aGF65dsx4q78lGAdgmaEZ69gksKzAebaFNd83dLGsXLD8UJOc-aw9YJr_lh84-VNiJE6_AYJiWzmG9dyU')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <span className="fw-semibold">The Godfather</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm border-secondary text-white-50">ClassicCinema_99</td>
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex text-admin-primary">
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star_half</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-white-50 small border-secondary">05/10/2023</td>
                            <td className="px-4 py-3 text-center border-secondary">
                                <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2">Published</span>
                            </td>
                            <td className="px-4 py-3 text-end border-secondary">
                                <button className="btn btn-link text-white-50 p-0 hover-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                            </td>
                        </tr>
                         <tr className="admin-table-row">
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-dark rounded" style={{ width: '40px', height: '40px', backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfSmE5lr4Vy6rGTzHSABbRKfIxhePiYhyYGZFaM2qSVcLvci0dszN7OETOyBriewRvZqGNWdoVHt4qmbh8fFfewCMJbVWpNsVRjRowYiO4gJpM7Hnb99jx57ehohiHiotgZkp-kxNywfcm6ik5bdB3V2umTj16J0KCTb7_AgimpsxCHgtIw-syoejy8yrd-SvcYwDsBYy39HogKpYU5ix4PAyyQYdISql6MORQ5l4sHceV_Kze9Yf-YslQYJI_FJnHgDhT66hli1s')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <span className="fw-semibold">Poor Things</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm border-secondary text-white-50">ArtHouseExplorer</td>
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex text-admin-primary">
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star_outline</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-white-50 small border-secondary">05/08/2023</td>
                            <td className="px-4 py-3 text-center border-secondary">
                                <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-2">Pending</span>
                            </td>
                            <td className="px-4 py-3 text-end border-secondary">
                                <button className="btn btn-link text-white-50 p-0 hover-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                            </td>
                        </tr>
                        <tr className="admin-table-row bg-admin-sidebar">
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="bg-dark rounded" style={{ width: '40px', height: '40px', backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvTQSVvPVTEXEXXaPJCRWdHqLWyB7PzqVQwMgPsvh_-U-k3TCXgv4_Gb28xyyqIVWNQB6xEtSV40eEcTezS2rzazyTOfT1LaW4-NKrBu5gv2yVlrIXdzdNsCeeuD-4y3HyEHOXk-dNfutJcYmEt9Zfy8ipnwoOEKtlZ2VtSYBZPOrKNs3l0zCoIvejd0f5deTsD4ef7pCCA4eVPsq9Kl7zUmByJ1TZwepeMhh8PJX_59LpIzgvaRkRvq5NX5CKKx7KTEzd1PCl_18')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    <span className="fw-semibold">Morbius</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm border-secondary text-white-50">CriticX</td>
                            <td className="px-4 py-3 border-secondary">
                                <div className="d-flex text-admin-primary">
                                    <span className="material-symbols-outlined fs-6">star</span>
                                    <span className="material-symbols-outlined fs-6">star_outline</span>
                                    <span className="material-symbols-outlined fs-6">star_outline</span>
                                    <span className="material-symbols-outlined fs-6">star_outline</span>
                                    <span className="material-symbols-outlined fs-6">star_outline</span>
                                </div>
                            </td>
                            <td className="px-4 py-3 text-white-50 small border-secondary">05/01/2023</td>
                            <td className="px-4 py-3 text-center border-secondary">
                                <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2">Flagged</span>
                            </td>
                            <td className="px-4 py-3 text-end border-secondary">
                                <button className="btn btn-link text-white-50 p-0 hover-primary"><span className="material-symbols-outlined">more_horiz</span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="px-4 py-3 d-flex align-items-center justify-content-between bg-admin-sidebar">
                <span className="text-white-50 small">Showing 1 to 4 of 1,240 movies</span>
                <div className="btn-group">
                    <button className="btn btn-sm btn-outline-custom">Previous</button>
                    <button className="btn btn-sm btn-admin-primary">Next</button>
                </div>
            </div>
        </div>
    );
}
