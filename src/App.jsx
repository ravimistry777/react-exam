import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { loginSuccess, logoutUser } from './redux/actions/authActions';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomList from './components/RoomList';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(loginSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      } else {
        // User is signed out
        dispatch(logoutUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            !isAuthenticated ? <Login /> : <Navigate to="/" />
          } />
          <Route path="/register" element={
            !isAuthenticated ? <Register /> : <Navigate to="/" />
          } />
          <Route path="/rooms" element={<RoomList />} />
          
          {/* Protected Routes */}
          <Route path="/reserve" element={
            <PrivateRoute>
              <ReservationForm />
            </PrivateRoute>
          } />
          
          <Route path="/reservations" element={
            <PrivateRoute>
              <ReservationList />
            </PrivateRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>Luxury Hotel</h5>
                <p className="mb-0">
                  Experience world-class hospitality with premium amenities and exceptional service.
                </p>
              </div>
              <div className="col-md-4">
                <h5>Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="/rooms" className="text-white text-decoration-none">Rooms</a></li>
                  <li><a href="/reserve" className="text-white text-decoration-none">Book Now</a></li>
                  <li><a href="/reservations" className="text-white text-decoration-none">My Bookings</a></li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p className="mb-1">📞 +91 7069695001</p>
                <p className="mb-1">✉️ ravisiddhapura777@gmail.com</p>
                <p className="mb-0">📍 123 Mota varachha, surat, India</p>
              </div>
            </div>
            <hr className="text-white" />
            <div className="text-center">
              <p className="mb-0">© 2025 Luxury Hotel Management System. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;