import React, { useEffect, useState } from 'react';
import { getAccessToken, getUserLogged, getMyReviews, updateReview, deleteReview } from '../api';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editReviewText, setEditReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        const token = getAccessToken();
        if (!token) {
            navigate('/login');
            return;
        }

        setIsLoading(true);
        try {
            const userResult = await getUserLogged();
            if (!userResult.error) {
                setUser(userResult.data);
            } else {
                navigate('/login');
                return;
            }

            const reviewsResult = await getMyReviews();
            if (!reviewsResult.error) {
                setReviews(reviewsResult.data);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    const handleOpenEdit = (review) => {
        setEditingReview(review);
        setEditRating(review.rating);
        setEditReviewText(review.review);
        setIsEditModalOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
        setEditingReview(null);
    };

    const handleUpdate = async () => {
        if (editRating === 0) {
            toast.error("Harap berikan rating!");
            return;
        }
        if (!editReviewText.trim()) {
            toast.error("Ulasan tidak boleh kosong!");
            return;
        }

        setIsSubmitting(true);
        const result = await updateReview({
            id: editingReview.id_review,
            id_movie: editingReview.id_movie,
            rating: editRating,
            review: editReviewText
        });

        setIsSubmitting(false);
        if (!result.error) {
            toast.success("Ulasan berhasil diperbarui!");
            handleCloseEdit();
            fetchData(); // Refresh list
        } else {
            toast.error(result.message || "Gagal memperbarui ulasan");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus ulasan ini?")) {
            const result = await deleteReview(id);
            if (!result.error) {
                toast.success("Ulasan berhasil dihapus!");
                if (isEditModalOpen) handleCloseEdit();
                fetchData(); // Refresh list
            } else {
                toast.error(result.message || "Gagal menghapus ulasan");
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--cine-bg-dark)', color: 'white' }}>
            <Navbar />
            
            <main className="container-xl py-5 flex-grow-1">
                <div className="row g-4 lg:g-5">
                    {/* Sidebar */}
                    <aside className="col-12 col-lg-3">
                        <div className="card border-0 bg-surface p-4 text-center sticky-top shadow-lg" style={{ top: '100px', borderRadius: '1.25rem' }}>
                            <div 
                                className="mx-auto mb-4 rounded-circle border border-primary-custom border-4" 
                                style={{ 
                                    width: '100px', 
                                    height: '100px', 
                                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqzGGtc4OeTRyWoxAjsBwCQngl6ZYPedEaRSNjO4aOJ3RBTexDtmNzc5Ehr7GK8cg2v06eSBW-g7lqakOsWJXJRfs2PEQ667yggh_hR80CC0M_DEBqmkVEgv2nFrC5C26vXmOoO1U79xLHcyKr9QUfSkv65e-Cu-GZ86gpH_dX_xqbir_Y-gjcgT55QCTG6Fmqec6Uysy5TxalZuT_KZPZ7200TvPXSXJ_6f3k40hwXZQKIyd-gKmtcuCJIFEsGwNramtv7ocSlCw')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <h2 className="h4 fw-bold mb-1 text-white">{user?.name || 'Memuat...'}</h2>
   
                            
                            <div className="nav flex-column gap-2 text-start mt-4">
                                <a className="nav-link active bg-white bg-opacity-10 rounded-3 text-primary-custom d-flex align-items-center gap-3 px-3 py-2 fw-medium" href="#">
                                    <span className="material-symbols-outlined fs-5">history_edu</span>
                                    Ulasan Saya
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <section className="col-12 col-lg-9">
                        <div className="mb-5">
                            <h1 className="display-6 fw-bold text-white mb-2">Pelacak Ulasan Film</h1>
                            <p className="text-white-50">Mengelola perjalanan sinematik pribadi dan kritik Anda.</p>
                        </div>

                        <div className="card border-0 bg-surface overflow-hidden shadow-lg" style={{ borderRadius: '1.25rem' }}>
                            <div className="table-responsive">
                                <table className="table table-dark table-hover align-middle mb-0 bg-transparent">
                                    <thead>
                                        <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0">Film</th>
                                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 text-center">Rating TMDB</th>
                                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0">Ulasan Saya</th>
                                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0">Tanggal</th>
                                            <th className="px-4 py-3 text-white-50 text-uppercase small fw-bold border-0 text-end">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0">
                                        {isLoading ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 border-0">
                                                    <div className="spinner-border text-primary-custom" role="status">
                                                        <span className="visually-hidden">Memuat...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : reviews.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5 border-0 text-white-50">
                                                    Belum ada ulasan yang dibuat.
                                                </td>
                                            </tr>
                                        ) : (
                                            reviews.map((review) => (
                                                <tr key={review.id_review} className="border-bottom border-white border-opacity-5">
                                                    <td className="px-4 py-4 border-0">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div 
                                                                className="rounded border border-white border-opacity-10" 
                                                                style={{ 
                                                                    width: '48px', 
                                                                    height: '68px', 
                                                                    backgroundImage: `url(${review.movie?.poster_path})`, 
                                                                    backgroundSize: 'cover', 
                                                                    backgroundPosition: 'center' 
                                                                }}
                                                            ></div>
                                                            <div className="d-flex flex-column">
                                                                <span className="fw-bold text-white">{review.movie?.original_title}</span>
                                                                <div className="d-flex align-items-center gap-1 mt-1">
                                                                    <span className="material-symbols-outlined text-primary-custom fs-6 filled-icon">star</span>
                                                                    <span className="text-primary-custom fw-bold small">{review.rating}<span className="text-white-50 fw-normal">/5</span></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 border-0 text-center">
                                                        <div className="d-inline-flex align-items-center gap-1 bg-white bg-opacity-5 px-2 py-1 rounded">
                                                            <span className="material-symbols-outlined text-warning fs-6 filled-icon">grade</span>
                                                            <span className="fw-bold text-black-50 small">{review.movie?.vote_average?.toFixed(1) || 'N/A'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 border-0">
                                                        <p className="text-white-50 small mb-0" style={{ maxWidth: '400px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden', whiteSpace: 'normal' }}>
                                                            {review.review}
                                                        </p>
                                                    </td>
                                                    <td className="px-4 py-4 border-0 text-white-50 small">
                                                        {formatDate(review.created_at)}
                                                    </td>
                                                    <td className="px-4 py-4 border-0 text-end">
                                                        <div className="d-flex justify-content-end gap-2">
                                                            <button 
                                                                className="btn btn-outline-light btn-sm p-1 d-flex align-items-center justify-content-center hover-primary"
                                                                onClick={() => handleOpenEdit(review)}
                                                                title="Edit Ulasan"
                                                                style={{ width: '32px', height: '32px', borderColor: 'rgba(255,255,255,0.1)' }}
                                                            >
                                                                <span className="material-symbols-outlined fs-5">edit</span>
                                                            </button>
                                                            <button 
                                                                className="btn btn-outline-danger btn-sm p-1 d-flex align-items-center justify-content-center"
                                                                onClick={() => handleDelete(review.id_review)}
                                                                title="Hapus Ulasan"
                                                                style={{ width: '32px', height: '32px', borderColor: 'rgba(220, 53, 69, 0.2)' }}
                                                            >
                                                                <span className="material-symbols-outlined fs-5">delete</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Edit Modal Overlay */}
            {isEditModalOpen && (
                <div className="edit-modal-overlay d-flex align-items-center justify-content-center px-3">
                    <div className="edit-modal-content bg-card-dark rounded-4 border border-white border-opacity-10 shadow-lg" style={{ maxWidth: '600px', width: '100%' }}>
                        <div className="px-4 py-3 border-bottom border-white border-opacity-5 d-flex justify-content-between align-items-center">
                            <div>
                                <h2 className="text-primary-custom small fw-bold text-uppercase tracking-widest mb-1" style={{ fontSize: '0.65rem' }}>Edit Review</h2>
                                <h1 className="h4 fw-bold text-white mb-0 tracking-tight">{editingReview?.movie?.original_title || 'THE BATMAN'}</h1>
                            </div>
                            <button className="btn btn-link text-white-50 p-0" onClick={handleCloseEdit}>
                                <span className="material-symbols-outlined fs-3">close</span>
                            </button>
                        </div>
                        
                        <div className="p-4 p-md-5">
                            <div className="mb-5">
                                <label className="text-white-50 small fw-bold text-uppercase tracking-widest d-block mb-3" style={{ fontSize: '0.65rem' }}>Rating Anda</label>
                                <div className="d-flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span 
                                            key={star}
                                            className={`material-symbols-outlined fs-2 cursor-pointer hover-scale transition-transform ${editRating >= star ? 'text-primary-custom filled-icon' : 'text-white-50 opacity-25'}`}
                                            onClick={() => setEditRating(star)}
                                        >
                                            star
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-white-50 small fw-bold text-uppercase tracking-widest d-block mb-3" style={{ fontSize: '0.65rem' }}>Ulasan Anda</label>
                                <textarea 
                                    className="form-control bg-card-dark border-white border-opacity-10 text-white p-4 custom-textarea" 
                                    rows="6"
                                    placeholder="Tulis ulasanmu di sini..."
                                    value={editReviewText}
                                    onChange={(e) => setEditReviewText(e.target.value)}
                                    style={{ borderRadius: '0.75rem', lineHeight: '1.6' }}
                                ></textarea>
                            </div>
                        </div>

                        <div className="px-4 px-md-5 py-4 bg-card-dark border-top border-white border-opacity-5 d-flex flex-column flex-sm-row gap-3 justify-content-between align-items-center">
                            <button 
                                className="btn btn-crimson text-white fw-bold px-4 py-3 rounded-3 d-flex align-items-center gap-2 w-100 w-sm-auto text-uppercase tracking-widest small"
                                onClick={() => handleDelete(editingReview.id_review)}
                            >
                                <span className="material-symbols-outlined fs-5">delete</span>
                                Hapus Review
                            </button>
                            <button 
                                className="btn btn-primary-custom fw-bold px-5 py-3 rounded-3 w-100 w-sm-auto text-uppercase tracking-widest small shadow-lg"
                                onClick={handleUpdate}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
            
            <style jsx>{`
                .bg-surface {
                    background-color: var(--cine-bg-surface, #252525) !important;
                }
                .bg-card-dark {
                    background-color: #2B2B2B !important;
                }
                .text-primary-custom {
                    color: var(--cine-primary, #EEDC82) !important;
                }
                .btn-crimson {
                    background-color: #5C0000;
                    border: none;
                }
                .btn-crimson:hover {
                    filter: brightness(1.2);
                }
                .hover-primary:hover {
                    color: var(--cine-primary, #EEDC82) !important;
                    border-color: var(--cine-primary, #EEDC82) !important;
                }
                .hover-scale:hover {
                    transform: scale(1.2);
                }
                .x-small {
                    font-size: 0.65rem;
                }
                .btn-primary-custom {
                    background-color: var(--cine-primary, #EEDC82);
                    color: #1A1A1A;
                    border: none;
                }
                .btn-primary-custom:hover {
                    filter: brightness(1.1);
                    color: #1A1A1A;
                }
                .btn-primary-custom:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }
                .filled-icon {
                    font-variation-settings: 'FILL' 1;
                }
                .edit-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.85);
                    z-index: 9999;
                    backdrop-filter: blur(8px);
                }
                .custom-textarea:focus {
                    background-color: rgba(255, 255, 255, 0.08) !important;
                    border-color: var(--cine-primary) !important;
                    box-shadow: none;
                }
                .custom-textarea::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-textarea::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-textarea::-webkit-scrollbar-thumb {
                    background: var(--cine-primary);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
