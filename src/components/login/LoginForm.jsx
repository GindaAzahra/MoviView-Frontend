import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { login, putAccessToken } from '../../api';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const onLoginHandler = async (event) => {
        event.preventDefault();
        
        const result = await login({ email, password });
        
        if (!result.error) {
            if (result.data && result.data.token) {
                putAccessToken(result.data.token);
            }
            toast.success("Login berhasil!");
            if(result.data.is_admin === 0){
                navigate('/');
            }else{
                navigate('/admin');
            }
        } else {
            toast.error(result.message || "Login gagal. Periksa kembali email dan password Anda.");
        }
    }

    return (
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center p-4 p-sm-5 p-lg-5" style={{ minHeight: '100vh', backgroundColor: 'var(--cine-bg-dark)' }}>
            <div className="w-100 d-flex flex-column" style={{ maxWidth: '440px' }}>
                {/* Header */}
                <div className="mb-5 text-center text-lg-start">
                    <h1 className="h1 fw-black text-primary-custom mb-2" style={{ fontWeight: 900, letterSpacing: '-0.033em' }}>
                        Selamat Datang Kembali
                    </h1>
                    <p className="text-white-50 mb-0">
                        Masuk untuk melanjutkan ulasan dan diskusi Anda
                    </p>
                </div>

                {/* Form */}
                <form className="d-flex flex-column gap-4" onSubmit={onLoginHandler}>
                    {/* Email Field */}
                    <div className="d-flex flex-column gap-2">
                        <label className="text-white small fw-medium">Email</label>
                        <input
                            type="email"
                            className="form-control bg-input-custom rounded-3 h-14"
                            placeholder="Masukkan email Anda"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="d-flex flex-column gap-2">
                        <label className="text-white small fw-medium">Kata Sandi</label>
                        <div className="position-relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control bg-input-custom rounded-3 h-14 pe-5"
                                placeholder="Masukkan kata sandi"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="btn position-absolute top-50 end-0 translate-middle-y text-white-50 hover-primary pe-3 border-0"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <span className="material-symbols-outlined">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button type="submit" className="btn btn-primary-custom w-100 h-14 rounded-3 fw-black text-uppercase mt-2" style={{ letterSpacing: '0.05em' }}>
                        Masuk Sekarang
                    </button>
                </form>


                {/* Footer Link */}
                <div className="mt-5 text-center">
                    <p className="text-white-50 small">
                        Belum punya akun?
                        <Link to="/register" className="text-primary-custom fw-bold text-decoration-none ms-1">Daftar di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
