// components/Auth/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Get user authentication state
  const router = useRouter(); // Use Next.js's useRouter

  // Redirect to login if user is not logged in
  if (!user) {
    router.push('/login');
    return null; // Return null to prevent rendering the protected component
  }

  return children; // Render the protected component
};

export default ProtectedRoute;