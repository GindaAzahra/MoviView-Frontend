import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllMovies } from '../../api';

export default function ComingSoon() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getAllMovies("top_rated", 1).then((response) => {
            if (!response.error) {
                setMovies(response.data);
            }
            setLoading(false);
        });
    }, []);

    return (
        <section className="container-xl py-5 mt-4">
            <div className="d-flex justify-content-between align-items-center mb-5 px-2">
                <h2 className="h2 fw-bold text-white mb-0 text-uppercase" style={{ letterSpacing: '0.1em', fontWeight: 900 }}>
                    Film Rating Tertinggi
                </h2>
                <Link to="/movies?type=top_rated" className="text-primary-custom text-decoration-none fw-bold d-flex align-items-center gap-1 small">
                    Lihat Semua <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </Link>
            </div>

            <div className="row row-cols-2 row-cols-md-4 g-3 g-md-4">
                {loading ? (
                    // Skeleton Loading
                    [...Array(4)].map((_, index) => (
                        <div key={index} className="col">
                            <div className="movie-card">
                                <div className="skeleton mb-3" style={{ aspectRatio: '2/3', width: '100%', borderRadius: '0.5rem' }}></div>
                                <div className="skeleton ml-n2" style={{ height: '20px', width: '70%', borderRadius: '4px' }}></div>
                            </div>
                        </div>
                    ))
                ) : (
                    movies.slice(0, 4).map((movie, index) => (
                        <div key={index} className="col">
                            <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                                <div className="movie-card group">
                                    <div className="poster-wrapper mb-3">
                                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="poster-img" alt={movie.original_title} />
                                        <div className="overlay"></div>
                                        <div className="position-absolute bottom-0 start-0 m-3">
                                            <span className="date-badge">{movie.release_date}</span>
                                        </div>
                                    </div>
                                    <h4 className="h6 fw-bold text-white text-truncate mb-0">{movie.original_title}</h4>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
