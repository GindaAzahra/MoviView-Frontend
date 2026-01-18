import { submitReview, getAccessToken, getReviewsByMovieId, getUserLogged, deleteReview, updateReview } from '../../api';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

export default function ReviewSection({ movieId }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [isLoadingReviews, setIsLoadingReviews] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editRating, setEditRating] = useState(0);
    const [editReviewText, setEditReviewText] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch reviews when component mounts or movieId changes
    // Fetch reviews and user info when component mounts
    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingReviews(true);
            try {
                // Fetch reviews
                const reviewsResult = await getReviewsByMovieId(movieId);
                if (!reviewsResult.error) {
                    setReviews(reviewsResult.data);
                }

                // Fetch current user if token exists
                const token = getAccessToken();
                if (token) {
                    const userResult = await getUserLogged();
                    if (!userResult.error) {
                        setCurrentUser(userResult.data);
                      
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoadingReviews(false);
            }
        };

        fetchData();
    }, [movieId]);

    const refetchReviews = async () => {
        setIsLoadingReviews(true);
        try {
            const result = await getReviewsByMovieId(movieId);
            if (!result.error) {
                setReviews(result.data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoadingReviews(false);
        }
    };

    const handleStarClick = (star) => {
        setRating(star);
    };

    const handleStarHover = (star) => {
        setHoveredRating(star);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        const token = getAccessToken();
        if (!token) {
            toast.error('Anda harus login terlebih dahulu untuk memberikan review');
            return;
        }
        
        // Validation
        if (rating === 0) {
            toast.error('Silakan beri rating terlebih dahulu');
            return;
        }
        
        if (!reviewText.trim()) {
            toast.error('Silakan tulis ulasan Anda');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await submitReview({
                id_movie: movieId,
                rating: rating,
                review: reviewText
            });

            if (result.error) {
                toast.error(result.message || 'Gagal mengirim review');
            } else {
                toast.success('Review berhasil dikirim!');
                // Reset form
                setRating(0);
                setReviewText('');
                
                // Refresh reviews list
                refetchReviews();
            }
        } catch (error) {
            toast.error('Terjadi kesalahan saat mengirim review');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        if (editRating === 0 || !editReviewText.trim()) {
            return;
        }

        setIsUpdating(true);
        try {
            const result = await updateReview({
                id: editingReviewId,
                id_movie: movieId,
                rating: editRating,
                review: editReviewText
            });

            if (!result.error) {
                setEditingReviewId(null);
                refetchReviews();
                toast.success('Review berhasil diperbarui!');
            } else {
                toast.error(result.message || 'Gagal memperbarui review');
            }
        } catch (error) {
            console.error('Error updating review:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async (reviewId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus review ini?')) {
            try {
                const result = await deleteReview(reviewId);
                if (!result.error) {
                    refetchReviews();
                    toast.success('Review berhasil dihapus!');
                } else {
                    toast.error(result.message || 'Gagal menghapus review');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const startEditing = (review) => {
        setEditingReviewId(review.id_review);
        setEditRating(review.rating);
        setEditReviewText(review.review);
    };

    const cancelEditing = () => {
        setEditingReviewId(null);
        setEditRating(0);
        setEditReviewText('');
    };

    // Helper function to get user initials
    const getUserInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInHours < 1) {  
            return 'Baru saja';
        } else if (diffInHours < 24) {
            return `${diffInHours} jam yang lalu`;
        } else if (diffInDays === 1) {
            return 'Kemarin';
        } else if (diffInDays < 7) {
            return `${diffInDays} hari yang lalu`;
        } else {
            return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        }
    };

    const displayRating = hoveredRating || rating;

    return (
        <section className="container-xl py-5">
            <div className="row g-5">
                {/* Left Column: Post Review */}
                <div className="col-lg-4">
                    <div className="sticky-top" style={{ top: '2rem', zIndex: 1 }}>
                        <h2 className="h4 fw-bold text-white mb-4">Bagikan Pendapatmu</h2>
                        <div className="bg-surface p-4 rounded-3 border border-white border-opacity-10 shadow-lg">
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                                <div>
                                    <label className="text-white-50 small fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.1em' }}>Beri Rating</label>
                                    <div className="d-flex gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span 
                                                key={star} 
                                                className={`material-symbols-outlined fs-3 cursor-pointer hover-scale ${
                                                    star <= displayRating ? 'text-primary-custom filled-icon' : 'text-white-50'
                                                }`}
                                                onClick={() => handleStarClick(star)}
                                                onMouseEnter={() => handleStarHover(star)}
                                                onMouseLeave={handleStarLeave}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                star
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-white-50 small fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.1em' }}>Ulasan Anda</label>
                                    <textarea
                                        className="form-control bg-white bg-opacity-10 border-white border-opacity-10 text-white placeholder-white-50"
                                        rows="6"
                                        placeholder="Tulis ulasanmu di sini..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        disabled={isSubmitting}
                                    ></textarea>
                                </div>



                                <button 
                                    type="submit"
                                    className="btn btn-primary-custom w-100 py-3 fw-bold small text-uppercase" 
                                    style={{ letterSpacing: '0.1em' }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Mengirim...' : 'Posting Ulasan'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Column: Community Reviews */}
                <div className="col-lg-8">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h2 className="h3 fw-bold text-white mb-0">Review Komunitas</h2>
                    </div>

                    <div className="d-flex flex-column gap-4">
                        {isLoadingReviews ? (
                            <div className="text-center text-white-50 py-5">
                                <div className="spinner-border text-primary-custom" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p className="mt-3">Memuat review...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="text-center text-white-50 py-5">
                                <span className="material-symbols-outlined fs-1 mb-3 d-block">rate_review</span>
                                <p>Belum ada review untuk film ini. Jadilah yang pertama!</p>
                            </div>
                        ) : (
                            reviews.map((review) => (
                                <div key={review.id_review} className="bg-surface p-4 rounded-3 border border-white border-opacity-10 hover-border-primary transition">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div className="d-flex gap-3 align-items-center">
                                            <div className="rounded-circle bg-primary-custom bg-opacity-10 d-flex align-items-center justify-content-center border border-primary-custom border-opacity-25" style={{ width: '48px', height: '48px' }}>
                                                <span className="text-primary-custom fw-bold">
                                                    {getUserInitials(review.user?.name)}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="h6 fw-bold text-white mb-0">
                                                    {review.user?.name || 'Anonim'}
                                                </h4>
                                                <p className="text-white-50 small mb-0">
                                                    {formatDate(review.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column align-items-end gap-2">
                                            <div className="d-flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span 
                                                        key={star} 
                                                        className={`material-symbols-outlined fs-6 ${
                                                            star <= (editingReviewId === review.id_review ? editRating : review.rating) ? 'text-primary-custom filled-icon' : 'text-white-50'
                                                        }`}
                                                        onClick={() => editingReviewId === review.id_review && setEditRating(star)}
                                                        style={{ cursor: editingReviewId === review.id_review ? 'pointer' : 'default' }}
                                                    >
                                                        star
                                                    </span>
                                                ))}
                                            </div>
                                            {currentUser && currentUser.id_user === review.id_user && editingReviewId !== review.id_review && (
                                                <div className="d-flex gap-2">
                                                    <p>{review.id_user}</p>
                                                    <button 
                                                        onClick={() => startEditing(review)}
                                                        className="btn btn-sm btn-outline-info d-flex align-items-center gap-1 py-1 px-2 border-opacity-25"
                                                        style={{ fontSize: '0.75rem' }}
                                                    >
                                                        <span className="material-symbols-outlined fs-6">edit</span>
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(review.id_review)}
                                                        className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 py-1 px-2 border-opacity-25"
                                                        style={{ fontSize: '0.75rem' }}
                                                    >
                                                        <span className="material-symbols-outlined fs-6">delete</span>
                                                        Hapus
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {editingReviewId === review.id_review ? (
                                        <div className="mt-3">
                                            <textarea
                                                className="form-control bg-white bg-opacity-10 border-white border-opacity-10 text-white placeholder-white-50 mb-3"
                                                rows="3"
                                                value={editReviewText}
                                                onChange={(e) => setEditReviewText(e.target.value)}
                                            ></textarea>
                                            <div className="d-flex gap-2">
                                                <button 
                                                    onClick={handleUpdate}
                                                    className="btn btn-primary-custom btn-sm px-4 py-2"
                                                    disabled={isUpdating}
                                                >
                                                    {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                                                </button>
                                                <button 
                                                    onClick={cancelEditing}
                                                    className="btn btn-outline-light btn-sm px-4 py-2"
                                                    disabled={isUpdating}
                                                >
                                                    Batal
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-white-50 mb-0">
                                            {review.review}
                                        </p>
                                    )}
                                </div>
                            ))
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
}
