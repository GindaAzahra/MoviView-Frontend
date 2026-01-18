import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/landingPage/Navbar";
import Footer from "../../components/landingPage/Footer";
import { getAllMovies, searchMovies } from "../../api";
import { Link } from "react-router-dom";

export default function MovieGrid() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialType = queryParams.get("type") || "popular";

    const [movies, setMovies] = useState([]);
    const [type, setType] = useState(initialType);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const newType = queryParams.get("type") || "popular";
        setType(newType);
        setCurrentPage(1); // Reset page when type changes from URL
    }, [location.search]);

    useEffect(() => {
        if (!searchQuery) {
            fetchMovies();
        }
    }, [type, currentPage]);

    const fetchMovies = async () => {
        setLoading(true);
        const response = await getAllMovies(type, currentPage);
        if (!response.error) {
            setMovies(response.data);
            if (response.total_pages) {
                setTotalPages(response.total_pages);
                setCurrentPage(response.current_page);
            } else {
                setTotalPages(1);
            }
        }
        setLoading(false);
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 2) {
            setLoading(true);
            const { error, data } = await searchMovies(query);
            if (!error) {
                setMovies(data);
            }
            setLoading(false);
        } else if (query.length === 0) {
            fetchMovies();
        }
    };

    const handleTypeChange = (newType) => {
        setType(newType);
        setSearchQuery(""); // Clear search when changing category
        setCurrentPage(1); // Reset to first page
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Helper to generate page numbers
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="bg-dark min-vh-100 font-sans text-white d-flex flex-column">
            <Navbar />
            
            <main className="container-xl py-5 flex-grow-1">
                {/* Section Title & Filter */}
                <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-5 gap-3">
                    <div>
                        <h2 className="h2 fw-bold text-white mb-2 text-uppercase">
                            {searchQuery ? `Search: ${searchQuery}` : type.replace('_', ' ')} Movies
                        </h2>
                        <p className="text-muted-gray small">Discover the latest blockbusters and trending hits.</p>
                    </div>

                    <div className="d-flex flex-column flex-md-row gap-3">
                         {/* Search bar inside Movie Grid */}
                        <div className="position-relative" style={{ width: '300px' }}>
                            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50" style={{ fontSize: '20px' }}>search</span>
                            <input 
                                type="text" 
                                className="form-control search-input ps-5 rounded-pill bg-card-dark text-white border-white border-opacity-10" 
                                placeholder="Search movies..." 
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>

                        <div className="d-flex gap-2">
                            <button 
                                onClick={() => handleTypeChange("popular")}
                                className={`btn rounded-pill px-4 py-2 small fw-bold ${type === 'popular' && !searchQuery ? 'btn-primary-custom text-dark' : 'btn-outline-light bg-card-dark border-opacity-10'}`}
                            >
                                Popular
                            </button>
                            <button 
                                onClick={() => handleTypeChange("top_rated")}
                                className={`btn rounded-pill px-4 py-2 small fw-bold ${type === 'top_rated' && !searchQuery ? 'btn-primary-custom text-dark' : 'btn-outline-light bg-card-dark border-opacity-10'}`}
                            >
                                Top Rated
                            </button>
                        </div>
                    </div>
                </div>

                {/* Movie Grid */}
                {loading ? (
                    <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border text-primary-custom" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                        {movies.length > 0 ? movies.map((movie) => (
                            <div key={movie.id} className="col">
                                <Link to={`/movie/${movie.id}`} className="text-decoration-none text-light">
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
                                        </div>
                                        <div>
                                            <h3 className="h5 fw-bold text-white mb-1 text-truncate hover-text-primary transition-colors">{movie.original_title}</h3>
                                            <p className="text-muted-gray small fw-medium mb-0">
                                                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </Link>          
                            </div>
                        )) : (
                            <div className="col-12 text-center py-5">
                                <p className="text-muted-gray">No movies found.</p>
                            </div>
                        )}
                    </div>
                )}
                {/* Pagination Section */}
                {!searchQuery && totalPages > 1 && (
                    <div className="mt-5 d-flex flex-column align-items-center gap-4">
                        <div className="d-flex align-items-center gap-3">
                            <button 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="btn btn-outline-primary-custom rounded-pill px-4 py-2 d-flex align-items-center gap-2 small fw-bold text-uppercase" 
                                style={{ letterSpacing: '1px' }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                                Previous
                            </button>
                            
                            <div className="d-flex align-items-center gap-1 px-3">
                                {getPageNumbers().map((pageNum) => (
                                    <button 
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`btn rounded-circle d-flex align-items-center justify-content-center p-0 fw-bold ${currentPage === pageNum ? 'btn-primary-custom text-dark shadow' : 'btn-link text-white text-decoration-none hover-bg-white-10'}`} 
                                        style={{ width: '40px', height: '40px' }}
                                    >
                                        {pageNum}
                                    </button>
                                ))}
                            </div>

                            <button 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="btn btn-outline-primary-custom rounded-pill px-4 py-2 d-flex align-items-center gap-2 small fw-bold text-uppercase" 
                                style={{ letterSpacing: '1px' }}
                            >
                                Next
                                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                            </button>
                        </div>
                        <p className="text-muted-gray small fw-medium">Page {currentPage} of {totalPages}</p>
                    </div>
                )}

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
