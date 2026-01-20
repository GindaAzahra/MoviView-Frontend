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
                
                {/* User Only Routes (Admin will be redirected to /movie-reviews) */}
                <Route path="/movie/:id" element={
                    <ProtectedRoute adminOnly={false}>
                        <MovieDetail/>
                    </ProtectedRoute>
                }/>
                <Route path="/movies" element={
                    <ProtectedRoute adminOnly={false}>
                        <MovieGrid/>
                    </ProtectedRoute>
                }/>
                <Route path="/profile" element={
                    <ProtectedRoute adminOnly={false}>
                        <Profile />
                    </ProtectedRoute>
                } />

                {/* Admin Only Routes (User will be redirected to /) */}
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminDashboard title="Dashboard" />
                    </ProtectedRoute>
                } />
                <Route path="/movie-reviews" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminDashboard title="Movie Reviews"><ReviewsTable /></AdminDashboard>
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    );
}

export default App;
