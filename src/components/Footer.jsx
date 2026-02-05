import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-dark py-5 mt-auto border-top">
      <Container>
        <Row className="gy-5 justify-content-between">
          <Col md={4} lg={3}>
            <h3 className="mb-4 fw-bold" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}>
              LUXURY<span className="text-muted fw-light">STAY</span>
            </h3>
            <p className="text-muted small mb-4" style={{ lineHeight: '1.8' }}>
              A sanctuary of calm in the heart of the city.
              We redefine luxury with understated elegance and personalized service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-dark hover-opacity"><FaInstagram size={18} /></a>
              <a href="#" className="text-dark hover-opacity"><FaFacebook size={18} /></a>
              <a href="#" className="text-dark hover-opacity"><FaTwitter size={18} /></a>
              <a href="#" className="text-dark hover-opacity"><FaLinkedin size={18} /></a>
            </div>
          </Col>

          <Col md={2}>
            <h6 className="mb-4 text-uppercase small fw-bold letter-spacing-2 text-muted">Explore</h6>
            <ul className="list-unstyled small">
              <li className="mb-3"><Link to="/" className="text-dark text-decoration-none hover-underline">Home</Link></li>
              <li className="mb-3"><Link to="/rooms" className="text-dark text-decoration-none hover-underline">Suites</Link></li>
              <li className="mb-3"><Link to="/reserve" className="text-dark text-decoration-none hover-underline">Reservations</Link></li>
              <li className="mb-3"><Link to="/dining" className="text-dark text-decoration-none hover-underline">Dining</Link></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="mb-4 text-uppercase small fw-bold letter-spacing-2 text-muted">Visit Us</h6>
            <ul className="list-unstyled small text-muted">
              <li className="mb-3">123 Mota Varachha<br />Surat, Gujarat, India</li>
              <li className="mb-3">+91 7069695001</li>
              <li className="mb-3">ravisiddhapura777@gmail.com</li>
            </ul>
          </Col>

          <Col md={3} lg={2}>
            <h6 className="mb-4 text-uppercase small fw-bold letter-spacing-2 text-muted">Newsletter</h6>
            <div className="d-flex flex-column gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="form-control form-control-sm border-0 border-bottom rounded-0 px-0 bg-transparent"
                style={{ boxShadow: 'none' }}
              />
              <button className="btn btn-sm btn-link text-dark text-decoration-none p-0 text-start fw-bold mt-2">
                SUBSCRIBE →
              </button>
            </div>
          </Col>
        </Row>

        <div className="border-top mt-5 pt-4 d-flex justify-content-center justify-content-md-between align-items-center flex-wrap gap-3 text-center text-md-start">
          <p className="mb-0 small text-muted">© {new Date().getFullYear()} Luxury Stay. All rights reserved.</p>
          <div className="d-flex gap-4 small text-muted">
            <a href="#" className="text-decoration-none text-muted">Privacy Policy</a>
            <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
