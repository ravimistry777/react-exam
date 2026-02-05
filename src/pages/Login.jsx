import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../redux/thunks/authThunks';
import { FaSignInAlt, FaEnvelope, FaLock, FaLeaf } from 'react-icons/fa';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData.email, formData.password));
    
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <div className="text-center mb-5 animate-fade-in">
               <h2 className="display-6 fw-bold text-main mb-2">Welcome Back</h2>
               <p className="text-muted small text-uppercase letter-spacing-2">Sign in to your account</p>
            </div>
            
            <div className="bg-surface p-4 p-md-5 border-0 shadow-sm rounded-0 animate-fade-in">
              {error && (
                <Alert variant="danger" className="border-0 bg-danger bg-opacity-10 text-danger rounded-0 mb-4">
                  {error}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="email">
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
                
                <Form.Group className="mb-5" controlId="password">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <Form.Check 
                    type="checkbox" 
                    label="Remember me" 
                    className="small text-muted"
                  />
                  <a href="#" className="small text-muted text-decoration-underline">Forgot Password?</a>
                </div>
                
                <div className="d-grid">
                  <Button 
                    variant="dark" 
                    type="submit" 
                    className="rounded-0 py-3 text-uppercase letter-spacing-2"
                    disabled={loading}
                  >
                    {loading ? <Spinner size="sm" animation="border" /> : 'Sign In'}
                  </Button>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="small text-muted mb-0">
                  Don't have an account? <Link to="/register" className="text-dark fw-bold text-decoration-underline">Sign up</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
