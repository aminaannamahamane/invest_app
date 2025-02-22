import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase' // Assurez-vous que ce chemin pointe vers votre config Firebase
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
import 'leaflet/dist/leaflet.css'

const MapContainer = dynamic(() =>
  import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(() =>
  import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
)
const Popup = dynamic(() =>
  import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
)
const CustomMarker = dynamic(() =>
  import('../../components/partials/CustomMarker'),
  { ssr: false }
)

const AddStockPage = () => {
  // Utilisation de Firebase Auth pour obtenir l'utilisateur connecté
  const [user] = useAuthState(auth)

  // États pour le formulaire de UserStock
  const [stockName, setStockName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  // État pour afficher la popup de confirmation
  const [confirmShow, setConfirmShow] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stockName.trim()) {
      alert("Veuillez entrer le nom du stock")
      return
    }
    if (!user) {
      alert("Vous devez être connecté pour ajouter un stock.")
      return
    }
    setLoading(true)
    try {
      // Appel à l'endpoint UserStockController via l'API route (POST)
      const response = await fetch("http://localhost:5252/api/userstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.uid,        // Utilisation de l'UID de Firebase Auth
          StockName: stockName       // Notez la majuscule pour correspondre au modèle
        })
      })
      const data = await response.json()
      if (response.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.message || "Erreur lors de l'ajout du stock")
      }
      setStockName("")
      setConfirmShow(true)
    } catch (error) {
      console.error("Erreur lors de l'ajout du stock :", error)
      setMessage("Erreur lors de l'ajout du stock")
      setConfirmShow(true)
    } finally {
      setLoading(false)
    }
  }

  // Modal de prévisualisation (inchangé)
  const [previewShow, setPreviewShow] = useState(false)
  const handlePreviewClose = () => setPreviewShow(false)
  const handlePreviewShow = () => setPreviewShow(true)

  return (
    <RealEstatePageLayout pageTitle="Add Stock" activeNav="Vendor" userLoggedIn>
      {/* Modal de prévisualisation */}
      <Modal fullscreen show={previewShow} onHide={handlePreviewClose}>
        <Modal.Header closeButton>
          <h3 className="h5 text-muted fw-normal modal-title d-none d-sm-block text-nowrap">
            Stock preview
          </h3>
          <div className="d-flex align-items-center justify-content-sm-end w-100 ms-sm-auto">
            <Button as={Link} href="/real-estate/stock-promotion" size="sm" className="me-4">
              Save and continue
            </Button>
            <span className="fs-xs text-muted ms-auto ms-sm-0 me-2">[ESC]</span>
          </div>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Container className="mt-2 mt-sm-0 py-4 py-sm-5">
            <h1 className="h2 mb-2">Stock Preview</h1>
            <p>Preview details here...</p>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Modal de confirmation centré */}
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

      {/* Contenu principal */}
      <Container className="mt-5 mb-md-4 py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Breadcrumb className="mb-3 pt-2 pt-lg-3">
              <Link href="/real-estate/account-info" passHref legacyBehavior>
              <Breadcrumb.Item> Dashboard </Breadcrumb.Item>
              </Link>
            </Breadcrumb>

            <div className="mb-4 text-center">
              <h1 className="h2 mb-0">Add stock</h1>
              <ProgressBar variant="warning" now={10} style={{ height: '.25rem' }} className="d-lg-none mb-4" />
            </div>

            {/* Formulaire simplifié pour ajouter un UserStock */}
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
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "En cours..." : "Ajouter le Stock"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </RealEstatePageLayout>
  )
}

export default AddStockPage
