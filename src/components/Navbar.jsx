import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/thunks/authThunks';
import { Navbar as BsNavbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setExpanded(false);
  };

  const handleNavClick = () => setExpanded(false);

  if (['/login', '/register'].includes(location.pathname)) {
    return null;
  }

  return (
    <BsNavbar 
      expand="lg" 
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`navbar-modern ${scrolled || expanded ? 'scrolled' : ''} ${expanded ? 'bg-white shadow-sm' : ''}`}
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={handleNavClick}>
          <span className="fw-bold h4 mb-0" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }}>
            LUXURY<span className="text-muted fw-light">STAY</span>
          </span>
        </BsNavbar.Brand>
        
        <BsNavbar.Toggle aria-controls="navbar-nav" className="border-0 shadow-none" onClick={() => setExpanded(expanded ? false : "expanded")} />
        
        <BsNavbar.Collapse id="navbar-nav">
          <Nav className="mx-auto gap-4 py-3 py-lg-0">
            <Nav.Link as={Link} to="/" className="nav-link-modern" active={location.pathname === '/'} onClick={handleNavClick}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/rooms" className="nav-link-modern" active={location.pathname === '/rooms'} onClick={handleNavClick}>SUITES</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/reservations" className="nav-link-modern" active={location.pathname === '/reservations'} onClick={handleNavClick}>MY BOOKINGS</Nav.Link>
                <Nav.Link as={Link} to="/reserve" className="nav-link-modern" active={location.pathname === '/reserve'} onClick={handleNavClick}>RESERVE</Nav.Link>
              </>
            )}
          </Nav>
          
          <div className="d-flex align-items-center mt-3 mt-lg-0 pb-3 pb-lg-0">
            {isAuthenticated ? (
              <>
                <div className="d-lg-none w-100">
                  <div className="px-3 py-2 bg-light mb-2">
                    <div className="small text-muted text-uppercase letter-spacing-1" style={{ fontSize: '0.7rem' }}>Signed in as</div>
                    <div className="fw-medium text-truncate">{user?.email}</div>
                  </div>
                  <Link to="/reservations" className="d-block py-2 text-decoration-none text-dark small text-uppercase letter-spacing-1" onClick={handleNavClick}>Dashboard</Link>
                  <div onClick={handleLogout} className="d-block py-2 text-danger small text-uppercase letter-spacing-1 cursor-pointer" role="button">Logout</div>
                </div>

                <Dropdown align="end" className="d-none d-lg-block">
                  <Dropdown.Toggle variant="transparent" className="d-flex align-items-center gap-2 border-0 p-0 shadow-none text-dark">
                    <span className="fw-medium small text-uppercase letter-spacing-1">{user?.email?.split('@')[0]}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-lg border-0 mt-3 rounded-0 p-0" style={{ minWidth: '200px' }}>
                    <div className="px-4 py-3 border-bottom bg-light">
                      <div className="small text-muted text-uppercase letter-spacing-1" style={{ fontSize: '0.7rem' }}>Signed in as</div>
                      <div className="fw-medium text-truncate">{user?.email}</div>
                    </div>
                    <Dropdown.Item as={Link} to="/reservations" className="py-2 px-4 small text-uppercase letter-spacing-1" onClick={handleNavClick}>Dashboard</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="text-danger py-2 px-4 small text-uppercase letter-spacing-1">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="d-flex gap-3">
                <Link 
                  to="/login" 
                  className="text-decoration-none text-dark small fw-bold text-uppercase letter-spacing-1 py-2"
                  onClick={handleNavClick}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary-custom px-4 py-2 rounded-0 small"
                  onClick={handleNavClick}
                >
                  Book Your Stay
                </Link>
              </div>
            )}
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
