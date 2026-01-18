import LoginBanner from '../components/login/LoginBanner';
import RegisterForm from '../components/register/RegisterForm';


export default function Register() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 container-fluid p-0">
                <div className="row g-0 h-100">
                    <LoginBanner />
                    <RegisterForm />
                </div>
            </main>
        </div>
    );
}
