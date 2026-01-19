import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DashboardTable from '../../components/admin/DashboardTable';

export default function AdminDashboard({ children, title }) {
    const content = children ?? '';

    return (
        <div className="d-flex bg-admin-dark min-vh-100 font-sans text-white">
            <AdminSidebar />
            <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: '280px' }}>
                <AdminNavbar title={title} />
                <main className="p-4">
                    {content}

                    {/* Footer */}
                    <div className="mt-5 text-center text-white-50 small">
                         <p className="mb-0">&copy; Copyright by 23552011281_Ginda Azahra_TIF RP 23 CNS B_UASWEB1</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
