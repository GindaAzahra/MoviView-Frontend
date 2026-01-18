import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <section className="w-100 overflow-hidden">
            <div className="container-xl py-5">
                <div className="position-relative overflow-hidden hero-bg d-flex align-items-center justify-content-center text-center p-4">
                    <div className="position-relative z-2" style={{ maxWidth: '768px' }}>
                        <h1 className="display-3 fw-bold mb-4 text-primary-custom text-shadow-gold" style={{ lineHeight: '1.1', fontWeight: 900 }}>
                            Rasakan Pengalaman Sinema <br />Terbaik
                        </h1>
                        <p className="lead text-white-50 mb-5 fw-light">
                            Bergabunglah dengan komunitas penggemar film paling bersemangat di dunia.
                            Temukan film populer, baca ulasan ahli, dan bagikan perjalanan sinematik Anda.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                            <button className="btn btn-primary-custom btn-lg px-5 h-14 rounded-3 fw-bold"><Link to="/movies" className="text-decoration-none text-dark">Jelajahi Film</Link></button>
                         
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
