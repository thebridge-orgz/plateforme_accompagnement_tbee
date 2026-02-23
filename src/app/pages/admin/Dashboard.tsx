import { useAuth } from '../../auth/AuthContext';

function AdminDashboard() {
    const { user } = useAuth();
    console.log(JSON.stringify(user, null, 2));

    return (
        <p>AdminDashboard</p>
    );
}

export default AdminDashboard;