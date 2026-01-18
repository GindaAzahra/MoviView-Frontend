export default function Footer() {
    return (
        <footer className="pt-5 pb-4 film-strip-border" style={{ backgroundColor: 'rgba(92, 0, 0, 0.8)' }}>
            <div className="container-xl">
                <div className="row gy-5 mb-5">
                    <div className="col-md-3">
                        <div className="d-flex align-items-center gap-3 text-primary-custom mb-4">
                            <div style={{ width: '24px', height: '24px' }}>
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                                </svg>
                            </div>
                            <h2 className="h5 mb-0 fw-black text-uppercase fw-bold" style={{ letterSpacing: '-1px' }}>MoviView</h2>
                        </div>
                        <p className="text-white-50 small mb-4">
                            Destinasi utama untuk penemuan film dan ulasan sinematik berbasis komunitas. Didirikan pada tahun 2024. 
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 text-white text-decoration-none transition" style={{ width: '40px', height: '40px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>public</span>
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 text-white text-decoration-none transition" style={{ width: '40px', height: '40px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>share</span>
                            </a>
                            <a href="#" className="d-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-10 text-white text-decoration-none transition" style={{ width: '40px', height: '40px' }}>
                                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>campaign</span>
                            </a>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <h4 className="text-primary-custom fw-bold text-uppercase small mb-4" style={{ letterSpacing: '0.2em' }}>Tautan Cepat</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3 text-white-50 small">
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Film Unggulan</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Kritikus Teratas</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Berita Terbaru</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Forum Komunitas</a></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="text-primary-custom fw-bold text-uppercase small mb-4" style={{ letterSpacing: '0.2em' }}>Dukungan</h4>
                        <ul className="list-unstyled d-flex flex-column gap-3 text-white-50 small">
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Pusat Bantuan</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Kebijakan Privasi</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Ketentuan Layanan</a></li>
                            <li><a href="#" className="text-reset text-decoration-none hover-primary">Hubungi Kami</a></li>
                        </ul>
                    </div>

                </div>

                <div className="border-top border-white border-opacity-10 pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 text-center text-md-start">
                    <p className="text-white-50 small fw-medium mb-0">&copy; 2026 MoviView Interactive. Hak cipta dilindungi undang-undang.</p>
                    <p className="text-primary-custom small fw-bold text-uppercase mb-0" style={{ letterSpacing: '0.1em' }}> &copy; Copyright by 23552011281_Ginda Azahra_TIF RP 23 CNS B_UASWEB1</p>
                </div>
            </div>
        </footer>
    );
}
