import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function NotFoundPage() {
  const animationContainer = useRef(null);
  const [lottie, setLottie] = useState(null);

  // Importer lottie-web côté client et le stocker dans le state
  useEffect(() => {
    import('lottie-web')
      .then((mod) => {
        // mod est l'objet exporté par lottie-web (généralement il a la méthode loadAnimation)
        setLottie(mod);
      })
      .catch((error) => console.error("Erreur lors de l'importation de lottie-web :", error));
  }, []);

  // Une fois lottie chargé et le container disponible, initialiser l'animation
  useEffect(() => {
    if (animationContainer.current && lottie) {
      const animation = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animation/city-guide-404.json'
      });
      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <>
      <Head>
        <title>Finder | 404 Not Found</title>
      </Head>
      <main className="page-wrapper">
        <section className="d-flex align-items-center min-vh-100 py-5 bg-secondary">
          <Container className="d-flex justify-content-center text-center">
            <Col xs={12} md={10} lg={8} className="px-0">
              <div className="ratio ratio-16x9 mb-lg-5 mb-4">
                <div ref={animationContainer}></div>
              </div>
              <h1 className="h3 pt-lg-4">
                Sorry, the content you are looking for doesn't exist.
              </h1>
              <p className="lead mb-5 pb-lg-2">
                Either it was removed, or you mistyped the link.
              </p>
              <Link href="/">
                <Button variant="primary">Go Home</Button>
              </Link>
            </Col>
          </Container>
        </section>
      </main>
    </>
  );
}
