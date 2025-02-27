import { useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Assurez-vous que le chemin est correct
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import NotLoggedIn from '../NotLoggedIn'; // ou le chemin vers votre composant NotLoggedIn

const AddStockPage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stockName, setStockName] = useState("");
  const [loadingForm, setLoadingForm] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmShow, setConfirmShow] = useState(false);

  // Si l'état de chargement est en cours, affichez un loader
  if (loading) {
    return (
      <Container className="mt-5">
        <p>Loading...</p>
      </Container>
    );
  }

  // Si l'utilisateur n'est pas connecté, affichez NotLoggedIn
  if (!user) {
    return <NotLoggedIn />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stockName.trim()) {
      alert("Veuillez entrer le nom du stock");
      return;
    }

    setLoadingForm(true);
    try {
      const token = await user.getIdToken();
      const response = await fetch("http://localhost:5252/api/userstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.uid,
          StockName: stockName
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Erreur lors de l'ajout du stock");
      }
      setStockName("");
      setConfirmShow(true);
    } catch (error) {
      console.error("Erreur lors de l'ajout du stock :", error);
      setMessage("Erreur lors de l'ajout du stock");
      setConfirmShow(true);
    } finally {
      setLoadingForm(false);
    }
  };

  return (
    <RealEstatePageLayout pageTitle="Add Stock" activeNav="Vendor" userLoggedIn>
      <Modal show={confirmShow} onHide={() => setConfirmShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setConfirmShow(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mt-5 mb-md-4 py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Breadcrumb className="mb-3 pt-2 pt-lg-3">
              <Link href="/real-estate/account-info" passHref legacyBehavior>
                <Breadcrumb.Item> Dashboard </Breadcrumb.Item>
              </Link>
            </Breadcrumb>

            <div className="mb-4 text-center">
              <h1 className="h2 mb-0">Add Stock</h1>
              <ProgressBar variant="warning" now={10} style={{ height: '.25rem' }} className="d-lg-none mb-4" />
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="stockName" className="mb-3">
                <Form.Label>
                  Nom du Stock <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrez le nom du stock"
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  required
                  style={{ maxWidth: "300px" }}
                />
                <Form.Text>Ce champ est obligatoire</Form.Text>
              </Form.Group>
              <Button type="submit" variant="primary" disabled={loadingForm}>
                {loadingForm ? "En cours..." : "Ajouter le Stock"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </RealEstatePageLayout>
  );
};

export default AddStockPage;
