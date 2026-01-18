import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../../api';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setpassword_confirmation ] = useState('');
    const navigate = useNavigate();

    const onRegisterHandler = async (event) => {
        event.preventDefault();
        
        if (password !== password_confirmation) {
            toast.error("Password dan konfirmasi password tidak cocok!");
            return;
        }

        const result = await register({ name, email, password, password_confirmation });
        
        if (!result.error) {
            toast.success("Registrasi berhasil! Silakan login.");
            navigate('/login');
        } else {
            console.log(result);
            toast.error(result.message || "Registrasi gagal.");
        }
    }

    return (
        <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center p-4 p-md-5">
            <div className="w-100" style={{ maxWidth: '480px' }}>
                {/* Headline */}
                <div className="mb-5">
                    <h1 className="h2 fw-bold text-primary-custom mb-2">Gabung Komunitas MoviView</h1>
                    <p className="text-white-50 mb-0">
                        Mulai tulis ulasan, buat daftar tontonan, dan bagikan seleramu
                    </p>
                </div>

                {/* Form */}
                <form className="d-flex flex-column gap-3" onSubmit={onRegisterHandler}>
                    {/* Username */}
                    <div>
                        <label className="form-label text-white small fw-medium">Username</label>
                        <div className="position-relative">
                            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50">person</span>
                            <input
                                type="text"
                                className="form-control bg-input-custom ps-5 h-14 rounded-3"
                                placeholder="Masukkan username anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="form-label text-white small fw-medium">Email</label>
                        <div className="position-relative">
                            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50">mail</span>
                            <input
                                type="email"
                                className="form-control bg-input-custom ps-5 h-14 rounded-3"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="form-label text-white small fw-medium">Password</label>
                        <div className="position-relative">
                            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50">lock</span>
                            <input
                                type="password"
                                className="form-control bg-input-custom ps-5 h-14 rounded-3"
                                placeholder="Min. 8 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="form-label text-white small fw-medium">Konfirmasi Password</label>
                        <div className="position-relative">
                            <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-white-50">shield_lock</span>
                            <input
                                type="password"
                                className="form-control bg-input-custom ps-5 h-14 rounded-3"
                                placeholder="Ulangi password"
                                value={password_confirmation}
                                onChange={(e) => setpassword_confirmation(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary-custom w-100 h-14 d-flex align-items-center justify-content-center gap-2 rounded-3 fw-bold text-uppercase mt-2">
                        <span>Buat Akun</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-4 text-center">
                    <p className="text-white-50 small">
                        Sudah punya akun?
                        <Link to="/login" className="text-primary-custom fw-bold ms-1 text-decoration-none hover-underline">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
