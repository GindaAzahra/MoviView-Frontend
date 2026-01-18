import { Link } from 'react-router-dom';

export default function LoginBanner() {
    return (
        <div className="d-none d-lg-flex col-lg-6 position-relative overflow-hidden bg-dark-accent p-0" style={{ minHeight: '100vh' }}>
            <div
                className="position-absolute w-100 h-100"
                style={{
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCTDOibT0qArC6H9uh-p2KYKWI_cZwdeJJk7uBRtqT5VYok3rkgj3m49F6mwe33TYQpxr97d09DJyM39FfQYGuSNgblNU05Gizfmd8_3biPb4uxQPCoQ_alfYQKQ44JXlG9fBGRlnk2QPZeyo84bZ5sq9TwhoZHRN45G42EcCSXEKC9UhIGx-u24aHB5J-abHZ2eMy38MtlXYISHFminA7Xq9-fnagHxdnVl1uPxd9zPJJse39BTyI9K3Ar-5GOs_O4cQk36f1Bst8")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4,
                    filter: 'grayscale(20%)'
                }}
            ></div>
            <div className="position-absolute inset-0 w-100 h-100 login-banner-overlay"></div>

            <div className="position-relative z-2 d-flex flex-column justify-content-between p-5 w-100">
                <Link to="/" className="d-flex align-items-center gap-3 text-decoration-none text-white">
                    <div className="text-primary-custom" style={{ width: '32px', height: '32px' }}>
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4" fillRule="evenodd" />
                        </svg>
                    </div>
                    <h1 className="h3 fw-bold mb-0">MoviView</h1>
                </Link>

                <div className="mb-5">
                    <h2 className="display-4 fw-black mb-4 text-white" style={{ lineHeight: 1.2, fontWeight: 900 }}>
                        Eksplorasi Dunia <span className="text-primary-custom">Sinematik</span> Menanti Anda.
                    </h2>
                    <p className="lead text-white-50">
                        Bergabunglah dengan komunitas pecinta film terbesar untuk berbagi ulasan, diskusi mendalam, dan berita terbaru dari industri film global.
                    </p>
                </div>

                <div className="text-white-50 small">
                    © 2026 MoviView Media Group. Hak cipta dilindungi undang-undang.
                </div>
            </div>
        </div>
    );
}
