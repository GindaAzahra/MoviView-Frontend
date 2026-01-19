import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Landing from './components/landingPage/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetail from './pages/MovieDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import MovieGrid from './pages/grid/MovieGrid';
import Profile from './pages/Profile';
import './assets/App.css';
import ReviewsTable from "./pages/admin/ReviewsTable.jsx";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false}/>
            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/movie/:id" element={<MovieDetail/>}/>
                <Route path="/movies" element={<MovieGrid/>}/>
                <Route path="/profile" element={<Profile />} />

                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminDashboard title="Dashboard" />
                    </ProtectedRoute>
                } />
                <Route path="/movie-reviews" element={
                    <ProtectedRoute>
                        <AdminDashboard title="Movie Reviews"><ReviewsTable /></AdminDashboard>
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

export default App;
