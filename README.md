<div align="center">
  <img src="src/assets/logo.svg" width="80" />
  <h1>MoviView</h1>
  <p><i>Platform Review Film Interaktif</i></p>
</div>


<br />

MoviView adalah aplikasi web berbasis React yang memungkinkan pengguna untuk menjelajahi daftar film populer dan rating tertinggi, memberikan ulasan pribadi, serta mengelola ulasan mereka sendiri melalui dashboard profil yang interaktif.

## 🚀 Fitur Utama

- **Landing Page Dinamis**: Menampilkan film terpopuler dan rating tertinggi dengan desain premium.
- **Pencarian Film**: Memudahkan pengguna mencari film favorit mereka secara real-time.
- **Sistem Autentikasi**: Registrasi dan login pengguna untuk fitur interaktif.
- **Detail Film Lengkap**: Informasi mendalam tentang film termasuk sinopsis, rating, dan ulasan komunitas.
- **Manajemen Ulasan (CRUD)**:
  - Membuat ulasan baru dengan rating bintang.
  - Melihat daftar ulasan pribadi di halaman profil.
  - Mengedit ulasan yang sudah dibuat melalui modal interaktif.
  - Menghapus ulasan.
- **Dashboard Admin**: Panel khusus untuk mengelola seluruh ekosistem ulasan dalam satu tampilan.


## 🛠️ Teknologi yang Digunakan

- **Frontend Core**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/) & Custom CSS (Vibrant Dark Theme)
- **Routing**: [React Router](https://reactrouter.com/)
- **Notifikasi**: [React Hot Toast](https://react-hot-toast.com/)
- **Iconography**: [Material Symbols Outlined](https://fonts.google.com/icons)
- **API**: Fetch API dengan integrasi backend Laravel (Localhost:8000)

## 📦 Instalasi dan Penggunaan

1. **Clone repositori ini**:

   ```bash
   git clone <repository-url>
   cd MoviView-Frontend
   ```

2. **Instal dependensi**:

   ```bash
   npm install
   ```

3. **Jalankan aplikasi dalam mode pengembangan**:

   ```bash
   npm run dev
   ```

4. **Pastikan Backend berjalan**:
   Aplikasi ini memerlukan backend API yang berjalan di `http://127.0.0.1:8000`. Pastikan server database dan API Anda sudah aktif.

## 📁 Struktur Proyek

```text
src/
├── assets/          # File CSS dan aset statis
├── components/      # Komponen Modular (Navbar, Footer, Landing Page, dll)
├── pages/           # Halaman Utama (Login, Profile, MovieGrid, Admin)
├── api.js           # Konfigurasi dan fungsi Fetch API
└── App.jsx          # Routing dan struktur utama aplikasi
```

## ✍️ Developer

**Ginda Azahra**

- NIM: 23552011281
- Kelas: TIF RP 23 CNS B
- Proyek: UAS PEMROGRAMAN WEB 1

---
