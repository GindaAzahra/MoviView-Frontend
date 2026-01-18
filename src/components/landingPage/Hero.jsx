export default function Hero() {
    return (
        <section className="w-100 overflow-hidden">
            <div className="container-xl py-5">
                <div className="position-relative overflow-hidden hero-bg d-flex align-items-center justify-content-center text-center p-4">
                    <div className="position-relative z-2" style={{ maxWidth: '768px' }}>
                        <h1 className="display-3 fw-bold mb-4 text-primary-custom text-shadow-gold" style={{ lineHeight: '1.1', fontWeight: 900 }}>
                            Experience Cinema <br />Like Never Before
                        </h1>
                        <p className="lead text-white-50 mb-5 fw-light">
                            Join the world's most passionate community of film enthusiasts.
                            Discover hidden gems, read expert critiques, and share your cinematic journey.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <button className="btn btn-primary-custom btn-lg px-5 h-14 rounded-3 fw-bold">Join Community</button>
                            <button className="btn btn-outline-custom btn-lg px-5 h-14 rounded-3 fw-bold">Explore Reviews</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
