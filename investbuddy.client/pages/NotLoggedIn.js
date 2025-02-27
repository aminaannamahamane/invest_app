// components/NotLoggedIn.js
import Link from 'next/link';
import Container from 'react-bootstrap/Container';

const NotLoggedIn = () => {
  return (
    <Container className="mt-5 text-center">
      <h2>You are not logged in.</h2>
      <p>Please log in to access this page.</p>
      <Link href="/signin-light">Go to Login Page</Link>
    </Container>
  );
};

export default NotLoggedIn;
