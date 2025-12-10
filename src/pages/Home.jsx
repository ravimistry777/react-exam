import React from 'react';
import { Link } from 'react-router-dom';
import { FaHotel, FaBed, FaWifi, FaSwimmingPool, FaUtensils, FaCar } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: <FaBed />, title: 'Luxurious Rooms', desc: 'Comfortable rooms with modern amenities' },
    { icon: <FaWifi />, title: 'Free WiFi', desc: 'High-speed internet throughout the hotel' },
    { icon: <FaSwimmingPool />, title: 'Swimming Pool', desc: 'Outdoor pool with lounge area' },
    { icon: <FaUtensils />, title: 'Restaurant', desc: 'Multi-cuisine dining experience' },
    { icon: <FaCar />, title: 'Parking', desc: 'Secure parking facilities available' },
    { icon: <FaHotel />, title: '24/7 Service', desc: 'Round the clock customer service' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">
                Welcome to Luxury Hotel Management
              </h1>
              <p className="lead mb-4">
                Experience world-class hospitality with our premium rooms and exceptional services.
                Book your stay now and enjoy exclusive benefits.
              </p>
              <div className="d-flex gap-3">
                <Link to="/rooms" className="btn btn-light btn-lg">
                  View Rooms
                </Link>
                <Link to="/reserve" className="btn btn-outline-light btn-lg">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="position-relative">
                <div className="rounded-circle bg-white p-4 d-inline-block">
                  <FaHotel size={120} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose Our Hotel?</h2>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm text-center p-4">
                  <div className="text-primary mb-3" style={{ fontSize: '2.5rem' }}>
                    {feature.icon}
                  </div>
                  <h5>{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Ready to Book Your Stay?</h2>
          <p className="lead mb-4">
            Join thousands of satisfied guests who have experienced our hospitality.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg px-5">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;