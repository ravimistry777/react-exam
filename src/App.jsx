import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { loginSuccess, logoutUser } from './redux/actions/authActions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomList from './components/RoomList';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

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
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1" style={{ paddingTop: '80px' }}>
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
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
