import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; // ✅ Importation correcte

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const router = useRouter();

  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);

    // ✅ Décodage du token avec la bonne importation
    const decodedToken = jwtDecode(response.credential);
    console.log('Decoded Token:', decodedToken);

    const userData = {
      name: decodedToken.name,
      email: decodedToken.email,
      imageUrl: decodedToken.picture,
    };

    login(userData);
    router.push('/real-estate/account-info');
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="958787244838-j1g7k8dlnu63645olup2pdsiatc3r5ri.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
