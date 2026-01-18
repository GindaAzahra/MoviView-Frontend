import Hero from './Hero';
import PopularReviews from './PopularReviews';
import ComingSoon from './ComingSoon';
import PopcornPromo from './PopcornPromo';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Landing() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            <Navbar />
            <main className="flex-grow-1">
                <Hero />
                <PopularReviews />
                <ComingSoon />
                <PopcornPromo />
            </main>
            <Footer />
        </div>
    );
}
