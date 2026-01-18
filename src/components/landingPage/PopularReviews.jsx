import { useState, useEffect } from "react";
import { getAllMovies } from "../../api";
import { Link } from "react-router-dom";

export default function PopularReviews() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getAllMovies("popular", 1).then((response) => {
            if (!response.error) {
                setReviews(response.data);
            }
        });
    }, []);
    
    return (
        <section className="container-xl py-5">
            <div className="d-flex justify-content-between align-items-center mb-4 px-2">
                <h2 className="h2 fw-bold text-white d-flex align-items-center gap-3 mb-0" style={{ fontWeight: 900, letterSpacing: '-1px' }}>
                    <span className="d-block bg-primary-custom rounded-pill" style={{ width: '8px', height: '32px' }}></span>
                    Popular Movies
                </h2>
                <Link to="/movies?type=popular" className="text-primary-custom text-decoration-none fw-bold d-flex align-items-center gap-1 small">
                    View All <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
                </Link>
            </div>

            <div className="row g-4">
               {reviews.slice(0, 4).map((movie) => (
                    <div key={movie.id} className="col-sm-6 col-lg-3">
                         <Link 
        to={`/movie/${movie.id}`} 
        className="text-decoration-none text-light"
      >
                        <div className="review-card p-3 h-100">
                            <div className="poster-wrapper mb-3">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="poster-img" />
                                <div className="position-absolute top-0 end-0 m-2 bg-dark bg-opacity-75 backdrop-blur px-2 py-1 rounded text-primary-custom fw-bold d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                                    <span className="material-symbols-outlined fill-icon" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span> {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                </div>
                            </div>
                            <h3 className="h5 fw-bold text-white mb-2 text-truncate" title={movie.title}>{movie.original_title}</h3>
                            <div className="d-flex align-items-center gap-3 pt-2 border-top border-white border-opacity-10 justify-content-between">
                                <div>
                                    <p className="mb-0 fw-bold text-white-50 small" style={{ fontSize: '0.8rem' }}>Release</p>
                                    <p className="mb-0 text-white" style={{ fontSize: '0.8rem' }}>{movie.release_date}</p>
                                </div>
                                <div className="text-end">
                                    <p className="mb-0 fw-bold text-white-50 small" style={{ fontSize: '0.8rem' }}>Votes</p>
                                    <p className="mb-0 text-white" style={{ fontSize: '0.8rem' }}>{movie.vote_count}</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
