import LoginBanner from '../components/login/LoginBanner';
import LoginForm from '../components/login/LoginForm';

export default function Login() {
    return (
        <div className="container-fluid p-0 overflow-hidden">
            <div className="row g-0">
                <LoginBanner />
                <LoginForm />
            </div>
        </div>
    );
}
