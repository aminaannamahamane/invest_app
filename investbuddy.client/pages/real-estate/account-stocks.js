import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import { useRouter } from 'next/router'
import RealEstatePageLayout from '../../components/partials/RealEstatePageLayout'
import RealEstateAccountLayout from '../../components/partials/RealEstateAccountLayout'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import PropertyCard from '../../components/PropertyCard'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

const AccountStocksPage = () => {
  const router = useRouter()
  const [user, loadingUser] = useAuthState(auth)
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Rediriger si non connecté
  useEffect(() => {
    if (!loadingUser && !user) {
      router.push('/signin-light')
    }
  }, [user, loadingUser, router])

  // Récupérer les stocks pour l'utilisateur connecté avec token
  useEffect(() => {
    const fetchStocks = async () => {
      if (user) {
        console.log("Utilisateur connecté :", user)
        setLoading(true)
        const token = await user.getIdToken()
        const url = `http://localhost:5252/api/UserStock?userId=${user.uid}`
        console.log("Fetching stocks depuis :", url)
        try {
          const response = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          })
          console.log("Réponse du serveur (status):", response.status)
          const responseText = await response.text()
          console.log("Réponse brute du serveur :", responseText)
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des stocks")
          }
          const data = JSON.parse(responseText)
          console.log("Stocks récupérés :", data)
          setStocks(data)
        } catch (err) {
          console.error("Erreur catch:", err)
          setError("Erreur lors de la récupération des stocks")
        } finally {
          setLoading(false)
        }
      } else {
        console.log("Aucun utilisateur connecté.")
      }
    }
  
    fetchStocks()
  }, [user])

  const deleteAll = (e) => {
    e.preventDefault()
    console.log("Suppression de tous les stocks")
    setStocks([])
  }

  return (
    <RealEstatePageLayout pageTitle="Account My Stocks" activeNav="Account" userLoggedIn>
      <RealEstateAccountLayout accountPageTitle="My Stocks">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h1 className="h2 mb-0">My Stocks</h1>
          <a href="#" className="fw-bold text-decoration-none" onClick={deleteAll}>
            <i className="fi-trash mt-n1 me-2"></i>
            Delete all
          </a>
        </div>
        <p className="pt-1 mb-4">Here you can see your stocks and edit them easily.</p>

        {loading && <p>Loading...</p>}
        {error && <Alert variant="danger">{error}</Alert>}
        {stocks.length ? (
          <Row>
            {stocks.map((stock, indx) => (
              <Col key={indx} md={4} className="mb-4">
                <PropertyCard
                  href="#"
                  images={["/images/placeholder-stock.jpg"]}
                  title={stock.stockName}
                  badges={[]}
                  footer={[]}
                  horizontal
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center pt-2 pt-md-4 pt-lg-5 pb-2 pb-md-0">
            <i className="fi-home display-6 text-muted mb-4"></i>
            <h2 className="h5 mb-4">You don't have any Stocks!</h2>
            <Button as={Link} href="/real-estate/add-stock" variant="primary">
              <i className="fi-plus fs-sm me-2"></i>
              Add Stock
            </Button>
          </div>
        )}
        <Button as={Link} href='/real-estate/create-alert' size='lg' className='w-100 mb-3'>
          <i className='fi-plus me-2'></i>
          Create Alert
        </Button>
      </RealEstateAccountLayout>
    </RealEstatePageLayout>
  )
}

export default AccountStocksPage
