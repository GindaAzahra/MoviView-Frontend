export default function MovieHero({ movie }) {
    if (!movie) return null;

    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    return (
        <section className="position-relative w-100 overflow-hidden" style={{ height: '650px' }}>
            {/* Background Image */}
            <div
                className="position-absolute w-100 h-100 start-0 top-0"
                style={{
                    backgroundImage: `url('${movie.backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            ></div>

            {/* Overlay */}
            <div className="position-absolute w-100 h-100 start-0 top-0 bg-black opacity-50"></div>

            {/* Gradient Overlay */}
            <div
                className="position-absolute w-100 h-100 start-0 top-0"
                style={{ background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 1) 100%)' }}
            ></div>

            {/* Content */}
            <div className="container-xl position-relative h-100 pb-5 d-flex align-items-end">
                <div className="d-flex flex-column flex-md-row gap-5 align-items-end w-100">

                    {/* Poster */}
                    <div className="d-none d-md-block flex-shrink-0 bg-dark rounded-3 overflow-hidden shadow-lg border border-warning border-opacity-50" style={{ width: '256px', aspectRatio: '2/3' }}>
                        <img
                            src={movie.poster_path}
                            alt={`${movie.original_title} Poster`}
                            className="w-100 h-100 object-fit-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-grow-1 pb-3">
                        <div className="d-flex flex-column gap-2">
                            <h1 className="display-3 fw-bold text-primary-custom text-uppercase mb-2" style={{ letterSpacing: '-0.05em' }}>{movie.original_title}</h1>

                            <div className="d-flex align-items-center gap-3 text-white-50 fw-medium">
                                <span>{releaseYear}</span>
                                {movie.genres && (
                                    <>
                                        <span className="rounded-circle bg-warning bg-opacity-50" style={{ width: '6px', height: '6px' }}></span>
                                        <span>{movie.genres.map(g => g.name).join(', ')}</span>
                                    </>
                                )}
                                {movie.runtime && (
                                    <>
                                        <span className="rounded-circle bg-warning bg-opacity-50" style={{ width: '6px', height: '6px' }}></span>
                                        <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                                    </>
                                )}
                            </div>

                            <div className="d-flex align-items-center gap-2 mt-3">
                                <span className="material-symbols-outlined text-primary-custom filled-icon">star</span>
                                <span className="h3 fw-bold text-primary-custom mb-0">{rating}<span className="h5 text-white-50 fw-normal">/10</span></span>
                                <span className="ms-2 text-white-50 small">({movie.vote_count} Penilaian)</span>
                            </div>

                            <p className="lead text-white-50 mt-4" style={{ maxWidth: '670px' }}>
                                {movie.overview}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
