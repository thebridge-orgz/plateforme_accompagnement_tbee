import { useAuth } from '../../auth/AuthContext';

function StudentDashboard() {
    const { user } = useAuth();
    console.log(JSON.stringify(user, null, 2));
    
    return (
        <p>StudentDashboard</p>
    );
}

export default StudentDashboard;