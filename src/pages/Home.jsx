import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaWifi, FaSwimmingPool, FaUtensils, FaConciergeBell, FaSpa, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: <FaUtensils />, title: 'Fine Dining', desc: 'Curated culinary experiences.' },
    { icon: <FaSpa />, title: 'Wellness Spa', desc: 'Holistic treatments for body and mind.' },
    { icon: <FaSwimmingPool />, title: 'Infinity Pool', desc: 'Panoramic views of the city skyline.' },
  ];

  return (
    <div className="home-page overflow-hidden">
      {/* Hero Section */}
      <div className="hero-modern min-vh-100 d-flex align-items-center bg-white">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={5} className="order-2 order-lg-1 animate-fade-in">
              <span className="d-block text-uppercase letter-spacing-2 small fw-bold text-muted mb-3 mb-md-4">
                Est. 2024
              </span>
              <h1 className="display-2 fw-bold mb-4 text-dark lh-1" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.03em' }}>
                A Sanctuary <br />
                <span className="fst-italic fw-light text-muted">of Calm</span>
              </h1>
              <p className="lead mb-5 text-secondary fw-light" style={{ maxWidth: '400px', lineHeight: '1.8' }}>
                Experience the art of slow living in the heart of the bustling city.
                Where minimalist design meets exceptional service. ( user - hotel@test.in , pass - 123456)
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 gap-md-4">
                <Link to="/rooms" className="btn btn-dark rounded-0 px-5 py-3 text-uppercase letter-spacing-1 small">
                  Explore Suites
                </Link>
                <Link to="/reserve" className="text-dark text-decoration-none d-flex align-items-center justify-content-center justify-content-sm-start text-uppercase letter-spacing-1 small fw-bold hover-opacity py-2">
                  Check Availability <FaArrowRight className="ms-2" size={12} />
                </Link>
              </div>
            </Col>
            <Col lg={7} className="order-1 order-lg-2 position-relative">
              <div className="position-relative overflow-hidden" style={{ borderRadius: '4px' }}>
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Minimalist Hotel Interior"
                  className="img-fluid w-100"
                  style={{ filter: 'grayscale(20%) contrast(90%)' }}
                />
                <div className="position-absolute bottom-0 start-0 bg-white p-4 d-none d-lg-block" style={{ maxWidth: '200px' }}>
                  <p className="mb-0 small text-muted font-monospace">
                    "Design is not just what it looks like and feels like. Design is how it works."
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Intro Section */}
      <div className="py-6 bg-light">
        <Container className="py-lg-5">
          <Row className="justify-content-center text-center">
            <Col md={10} lg={8}>
              <h2 className="mb-4 display-5" style={{ fontFamily: '"Playfair Display", serif' }}>Unpretentious Luxury</h2>
              <p className="text-muted fw-light lead mb-0">
                We believe in the beauty of simplicity. Our spaces are designed to be a canvas for your experiences,
                free from distraction and clutter. Every detail is intentional, every amenity curated.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Grid */}
      <div className="py-6 bg-white">
        <Container>
          <Row className="g-0 border-top border-light">
            {features.map((feature, index) => (
              <Col key={index} md={4} className="text-center p-4 p-lg-5 border-bottom border-lg-bottom-0 border-md-end border-light">
                <div className="mb-4 text-dark opacity-75">
                  <span style={{ fontSize: '1.5rem' }}>{feature.icon}</span>
                </div>
                <h4 className="fw-medium mb-3 text-uppercase letter-spacing-1 fs-6">{feature.title}</h4>
                <p className="text-muted small mb-0 px-lg-4">
                  {feature.desc}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Image Strip */}
      <div className="row g-0 w-100">
        <div className="col-12 col-md-4" style={{ height: '350px' }}>
          <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-100 h-100 object-fit-cover" alt="Room" />
        </div>
        <div className="col-12 col-md-4 bg-dark text-white d-flex align-items-center justify-content-center p-5 text-center" style={{ height: '350px' }}>
          <div>
            <h3 className="mb-3" style={{ fontFamily: '"Playfair Display", serif', color: "white" }}>Stay With Us</h3>
            <p className="mb-4 text-white-50 small">Experience the difference.</p>
            <Link to="/reserve" className="btn btn-outline-light rounded-0 px-4 text-uppercase letter-spacing-1 small">
              Book Now
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4" style={{ height: '350px' }}>
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="w-100 h-100 object-fit-cover" alt="Detail" />
        </div>
      </div>
    </div>
  );
};

export default Home;
