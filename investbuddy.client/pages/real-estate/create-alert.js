import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import NotLoggedIn from '../NotLoggedIn';

const AddAlertPage = () => {
  const router = useRouter();
  const [user, loadingUser] = useAuthState(auth);
  const [stocks, setStocks] = useState([]); // Liste des stocks de l'utilisateur
  const [alertType, setAlertType] = useState("price");
  const [stockName, setStockName] = useState(""); // Variable pour le nom du stock
  const [operator, setOperator] = useState("<");
  const [threshold, setThreshold] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmShow, setConfirmShow] = useState(false);

  // Rediriger ou afficher NotLoggedIn si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loadingUser && !user) {
      router.push('/NotLoggedIn');
    }
  }, [user, loadingUser, router]);

  // Si l'utilisateur est en cours de chargement, afficher un loader
  if (loadingUser) {
    return (
      <Container className="mt-5">
        <p>Loading...</p>
      </Container>
    );
  }
  // Si l'utilisateur n'est pas connecté, afficher NotLoggedIn
  if (!user) {
    return <NotLoggedIn />;
  }

  // Récupérer les stocks de l'utilisateur connecté
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5252/api/userstock?userId=${user.uid}`)
        .then(response => response.json())
        .then(data => {
          console.log("Stocks récupérés :", data);
          setStocks(data);
          if (data.length > 0) {
            setStockName(data[0].stockName); // Sélection par défaut du premier stock
          }
        })
        .catch(err => console.error("Erreur lors de la récupération des stocks :", err));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Vous devez être connecté pour créer une alerte.");
      return;
    }

    if (!alertType || !stockName || !operator || !threshold) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newAlert = {
      userId: user.uid,
      alertType: alertType,
      stockName: stockName,
      operator: operator,
      threshold: parseFloat(threshold),
      status: "active"
    };

    console.log("Envoi des données :", JSON.stringify({ alert: newAlert }));

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5252/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alert: newAlert })
      });

      const responseText = await response.text();
      console.log("Réponse brute du serveur :", responseText);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}, ${responseText}`);
      }

      const data = JSON.parse(responseText);
      setMessage(data.message);
      setConfirmShow(true);
      setThreshold(""); // Reset du champ après soumission
    } catch (error) {
      console.error("Erreur lors de la création de l'alerte :", error);
      setMessage("Erreur lors de la création de l'alerte");
      setConfirmShow(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RealEstatePageLayout pageTitle="Create Alert" activeNav="Vendor" userLoggedIn>
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
              <h1 className="h2 mb-0">Create alert</h1>
              <ProgressBar variant="warning" now={10} style={{ height: '.25rem' }} className="d-lg-none mb-4" />
            </div>

            <Form onSubmit={handleSubmit}>
              {/* Type d'alerte */}
              <Form.Group controlId="alertType" className="mb-3">
                <Form.Label>Type d'alerte <span className="text-danger">*</span></Form.Label>
                <Form.Select value={alertType} onChange={(e) => setAlertType(e.target.value)}>
                  <option value="price">Price</option>
                  <option value="sentiment">Sentiment</option>
                </Form.Select>
              </Form.Group>

              {/* Sélection du stock */}
              <Form.Group controlId="stockName" className="mb-3">
                <Form.Label>Stock <span className="text-danger">*</span></Form.Label>
                <Form.Select value={stockName} onChange={(e) => setStockName(e.target.value)}>
                  {stocks.map((stock, index) => (
                    <option key={index} value={stock.stockName}>{stock.stockName}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Sélection de l'opérateur */}
              <Form.Group controlId="operator" className="mb-3">
                <Form.Label>Condition <span className="text-danger">*</span></Form.Label>
                <Form.Select value={operator} onChange={(e) => setOperator(e.target.value)}>
                  <option value="<">{"<"}</option>
                  <option value=">">{">"}</option>
                  <option value="==">{"="}</option>
                </Form.Select>
              </Form.Group>

              {/* Champ du seuil */}
              <Form.Group controlId="threshold" className="mb-3">
                <Form.Label>Seuil <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  placeholder={alertType === "sentiment" ? "Score entre 0 et 10" : "Valeur numérique"}
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  min={alertType === "sentiment" ? "0" : undefined}
                  max={alertType === "sentiment" ? "10" : undefined}
                  step="0.1"
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "En cours..." : "Créer l'alerte"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </RealEstatePageLayout>
  );
};

export default AddAlertPage;
