import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieById } from '../api';
import Navbar from '../components/landingPage/Navbar';
import Footer from '../components/landingPage/Footer';
import MovieHero from '../components/movieDetail/MovieHero';
import ReviewSection from '../components/movieDetail/ReviewSection';
import MovieDetailSkeleton from '../components/movieDetail/MovieDetailSkeleton';

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getMovieById(id).then((response) => {
            if (!response.error) {
                setMovie(response.data);
            }
        });
    }, [id]);

    if (!movie) {
        return (
            <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--cine-bg-dark)' }}>
                <Navbar />
                <MovieDetailSkeleton />
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: 'var(--cine-bg-dark)' }}>
            <Navbar />
            <main className="flex-grow-1">
                <MovieHero movie={movie} />
                <ReviewSection movieId={id} />
            </main>
            <Footer />
        </div>
    );
}
