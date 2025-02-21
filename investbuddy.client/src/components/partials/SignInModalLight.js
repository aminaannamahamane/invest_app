import React, { useEffect } from 'react'; // Ensure React is imported
import { useRouter } from 'next/router';
import Head from 'next/head';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../../context/AuthContext";

import GoogleLoginButton from '../Auth/GoogleLoginButton'; // Ensure this path is correct


const  SignInModalLight = () => {
  const { user } = useAuth(); // Get user authentication state
  const router = useRouter(); // For navigation

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  // Add class to body to enable gray background
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.classList.add('bg-secondary');
      return () => body.classList.remove('bg-secondary');
    }
  }, []);

  return (
    <>
      {/* Custom page title attribute */}
      <Head>
        <title>Finder | Sign In</title>
      </Head>

      {/* Page wrapper */}
      <main className='page-wrapper'>
        <div className='container-fluid d-flex h-100 align-items-center justify-content-center py-4 py-sm-5'>
          {/* Sign in card */}
          <div className='card card-body' style={{ maxWidth: '940px' }}>
          <div
              className='position-absolute top-0 end-0 nav-link fs-sm py-1 px-2 mt-3 me-3'
           onClick={() => router.push('/')} // Redirection vers la page principale
>
         <i className='fi-arrow-long-left fs-base me-2'></i>
              Go back
</div>
            <div className='row mx-0 align-items-center'>
              <div className='col-md-6 border-end-md p-2 p-sm-5'>
                <h2 className='h3 mb-4 mb-sm-5'>
                  Hey there!
                  <br />
                  Welcome back.
                </h2>
                <div className='d-flex justify-content-center'>
                  {/* Illustration */}
                  <img
                    src='/images/signin-modal/signin.svg'
                    width={344}
                    height={292}
                    alt='Illustration'
                  />
                </div>
                
              </div>
              <div className='col-md-6 px-2 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5'>
                {/* Bouton de connexion Google uniquement */}
                <GoogleLoginButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default  SignInModalLight;