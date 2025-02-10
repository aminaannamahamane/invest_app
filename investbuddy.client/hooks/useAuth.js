// hooks/useAuth.js
import { useAuthContext } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google'; // Utilisation du hook Google OAuth

export const useAuth = () => {
  const { login } = useAuthContext(); // Utiliser le contexte pour récupérer la fonction login

  const loginWithGoogle = async (response) => {
    if (response.credential) {
      // Récupérer les données de l'utilisateur via le token OAuth
      const userData = await fetchUserData(response.credential);
      login(userData); // Mettre à jour l'utilisateur dans le contexte
    }
  };

  const fetchUserData = async (token) => {
    // Récupérer les informations de l'utilisateur via Google API
    const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
    const data = await res.json();
    return data;
  };

  return {
    loginWithGoogle,
  };
};
