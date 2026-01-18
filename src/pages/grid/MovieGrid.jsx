import { useState, useEffect } from "react";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import { getAllMovies } from "../../api";
import { Link } from "react-router-dom";

export default function MovieGrid() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies("popular", 1).then((response) => {
            if (!response.error) {
                setMovies(response.data);
            }
        });
    }, []);

    return (
        <div className="bg-dark min-vh-100 font-sans text-white d-flex flex-column">
            <Navbar />
            
            <main className="container-xl py-5 flex-grow-1">
                {/* Section Title & Filter */}
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
                    <div>
                        <h2 className="h2 fw-bold text-white mb-2">Popular Movies</h2>
                        <p className="text-muted-gray small">Discover the latest blockbusters and trending hits.</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-outline-light bg-card-dark border-opacity-10 rounded-pill d-flex align-items-center gap-2 px-4 py-2 small hover-bg-white-5">
                            <span className="material-symbols-outlined text-primary-custom" style={{fontSize: '18px'}}>filter_list</span>
                            <span className="fw-medium">Filters</span>
                        </button>
                        <button className="btn btn-outline-light bg-card-dark border-opacity-10 rounded-pill d-flex align-items-center gap-2 px-4 py-2 small hover-bg-white-5">
                            <span className="fw-medium">Release Year</span>
                            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>keyboard_arrow_down</span>
                        </button>
                    </div>
                </div>

                {/* Movie Grid */}
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                    {movies.map((movie) => (
                        <div key={movie.id} className="col">
                              <Link 
        to={`/movie/${movie.id}`} 
        className="text-decoration-none text-light"
      >
                            <div className="d-flex flex-column gap-3 h-100 group cursor-pointer">
                                <div className="position-relative w-100 rounded-4 overflow-hidden bg-card-dark" style={{ aspectRatio: '2/3' }}>
                                    <div 
                                        className="position-absolute top-0 start-0 w-100 h-100 bg-cover bg-center transition-transform duration-500 movie-poster-hover"
                                        style={{ 
                                            backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                         }}
                                    ></div>
                                    <div className="position-absolute top-0 end-0 m-2 d-flex align-items-center gap-1 px-2 py-1 bg-dark bg-opacity-75 backdrop-blur rounded-3 border border-white border-opacity-10">
                                        <span className="material-symbols-outlined text-primary-custom" style={{ fontSize: '14px' }}>star</span>
                                        <span className="small fw-bold text-white">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
                                    </div>
                                    <div className="position-absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 transition-opacity hover-overlay"></div>
                                </div>
                                <div>
                                    <h3 className="h5 fw-bold text-white mb-1 text-truncate hover-text-primary transition-colors">{movie.title}</h3>
                                    <p className="text-muted-gray small fw-medium mb-0">
                                        {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                    </p>
                                </div>
                                
                            </div>
                                </Link>          
                        </div>
                       
                    ))}
                    
                    {/* Placeholder for when movies are loading or if we want to show static examples like in the prompt if API fails, 
                        but effectively we map the API response. */}
                </div>

                {/* Pagination Section */}
                <div className="mt-5 d-flex flex-column align-items-center gap-4">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-outline-primary-custom rounded-pill px-4 py-2 d-flex align-items-center gap-2 small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                            Previous
                        </button>
                        
                        <div className="d-flex align-items-center gap-1 px-3">
                            <button className="btn btn-primary-custom rounded-circle d-flex align-items-center justify-content-center p-0 shadow fw-bold text-dark" style={{ width: '40px', height: '40px' }}>1</button>
                            <button className="btn btn-link text-white text-decoration-none rounded-circle d-flex align-items-center justify-content-center p-0 hover-bg-white-10" style={{ width: '40px', height: '40px' }}>2</button>
                            <button className="btn btn-link text-white text-decoration-none rounded-circle d-flex align-items-center justify-content-center p-0 hover-bg-white-10" style={{ width: '40px', height: '40px' }}>3</button>
                            <button className="btn btn-link text-white text-decoration-none rounded-circle d-flex align-items-center justify-content-center p-0 hover-bg-white-10" style={{ width: '40px', height: '40px' }}>4</button>
                            <span className="text-muted-gray d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>...</span>
                            <button className="btn btn-link text-white text-decoration-none rounded-circle d-flex align-items-center justify-content-center p-0 hover-bg-white-10" style={{ width: '40px', height: '40px' }}>10</button>
                        </div>

                        <button className="btn btn-outline-primary-custom rounded-pill px-4 py-2 d-flex align-items-center gap-2 small fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
                            Next
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                        </button>
                    </div>
                    <p className="text-muted-gray small fw-medium">Showing 1-20 of movies available</p>
                </div>

            </main>

            <Footer />
        </div>
    );
}

// Add simple CSS for hover effects that might not be in standard bootstrap
const styles = `
.hover-bg-white-5:hover { background-color: rgba(255,255,255,0.05); }
.hover-bg-white-10:hover { background-color: rgba(255,255,255,0.1); }
.btn-outline-primary-custom {
    border: 1px solid var(--cine-primary);
    color: var(--cine-primary);
}
.btn-outline-primary-custom:hover {
    background-color: rgba(238, 220, 129, 0.1);
    color: var(--cine-primary);
}
.movie-poster-hover:hover {
    transform: scale(1.05);
}
.hover-text-primary:hover {
    color: var(--cine-primary) !important;
}
`;
