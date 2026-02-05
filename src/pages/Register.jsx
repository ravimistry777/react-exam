import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../redux/thunks/authThunks';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaLeaf } from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      if (formData.password !== e.target.value && e.target.name === 'confirmPassword') {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      role: 'user'
    };

    const result = await dispatch(registerUser(
      formData.email,
      formData.password,
      userData
    ));

    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-5 animate-fade-in">
              <h2 className="display-6 fw-bold text-main mb-2">Join Us</h2>
              <p className="text-muted small text-uppercase letter-spacing-2">Create your account to start your journey</p>
            </div>

            <div className="bg-surface p-4 p-md-5 border-0 shadow-sm rounded-0 animate-fade-in mx-2 mx-md-0">
              {error && (
                <Alert variant="danger" className="border-0 bg-danger bg-opacity-10 text-danger rounded-0 mb-4">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                        style={{ borderRadius: 0 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                        style={{ borderRadius: 0 }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-4">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                  />
                </Form.Group>

                <Form.Group className="mt-4">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 (555) 000-0000"
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                  />
                </Form.Group>

                <Row className="g-4 mt-2">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className={`rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none ${passwordError ? 'is-invalid' : ''}`}
                        style={{ borderRadius: 0 }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className={`rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none ${passwordError ? 'is-invalid' : ''}`}
                        style={{ borderRadius: 0 }}
                      />
                      {passwordError && <Form.Text className="text-danger small">{passwordError}</Form.Text>}
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid mt-5">
                  <Button
                    variant="dark"
                    type="submit"
                    className="rounded-0 py-3 text-uppercase letter-spacing-2"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" animation="border" /> : 'Create Account'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="small text-muted mb-0">
                  Already have an account? <Link to="/login" className="text-dark fw-bold text-decoration-underline">Sign In</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
