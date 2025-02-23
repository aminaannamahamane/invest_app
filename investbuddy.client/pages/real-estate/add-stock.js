import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { useRouter } from 'next/router'
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout'
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

const AddStockPage = () => {
  const router = useRouter()
  const [user, loadingUser] = useAuthState(auth)
  const [stockName, setStockName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [confirmShow, setConfirmShow] = useState(false)

  // Redirect non-authenticated users
  useEffect(() => {
    if (!loadingUser && !user) {
      router.push("/signin-light") // or your sign-in route
    }
  }, [user, loadingUser, router])

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
      // Get JWT token from Firebase Auth and include it in the request
      const token = await user.getIdToken()
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
              <h1 className="h2 mb-0">Add stock</h1>
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
