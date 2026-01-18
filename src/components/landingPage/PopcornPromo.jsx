export default function PopcornPromo() {
    return (
        <section className="w-100 bg-crimson py-5 position-relative overflow-hidden">
            <div className="position-absolute top-0 start-0 w-100" style={{ height: '8px', backgroundColor: 'rgba(0,0,0,0.2)' }}></div>

            <div className="container-xl d-flex flex-column align-items-center text-center position-relative z-2">
                <div className="rounded-circle d-flex align-items-center justify-content-center mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(238, 220, 129, 0.2)', border: '1px solid rgba(238, 220, 129, 0.3)' }}>
                    <span className="material-symbols-outlined text-primary-custom" style={{ fontSize: '40px' }}>restaurant</span>
                </div>

                <h2 className="display-4 fw-black text-white mb-4 text-uppercase fw-bold" style={{ letterSpacing: '-2px' }}>
                    Ulasan Segar, <br /><span className="text-primary-custom fst-italic">Lebih Hangat dari Popcorn.</span>
                </h2>

                <p className="text-white-50 lead mb-5 fw-light" style={{ maxWidth: '600px' }}>
                    Kenapa puas dengan ulasan biasa? Dapatkan akses ke ulasan waktu nyata dari para penggemar film terbesar di planet ini. Mulai keanggotaan gratis Anda hari ini.
                </p>

                <button className="btn btn-primary-custom btn-lg rounded-pill px-5 py-3 fw-black shadow-lg">
                    Bergabung Sekarang
                </button>
            </div>

            <div className="position-absolute bottom-0 end-0 opacity-25 pe-none">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '300px', transform: 'rotate(12deg)', opacity: '0.1' }}>bubbles</span>
            </div>
        </section>
    );
}
