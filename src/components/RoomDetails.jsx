import React from 'react';
import { Link } from 'react-router-dom';
import { FaBed, FaUsers, FaWifi, FaTv, FaSnowflake, FaWineBottle } from 'react-icons/fa';

const RoomDetails = ({ room }) => {
  const getAmenityIcon = (amenity) => {
    switch(amenity.toLowerCase()) {
      case 'wifi': return <FaWifi className="me-1" />;
      case 'tv': return <FaTv className="me-1" />;
      case 'ac': return <FaSnowflake className="me-1" />;
      case 'mini bar': return <FaWineBottle className="me-1" />;
      default: return null;
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={room.image || 'https://via.placeholder.com/300x200'} 
        className="card-img-top" 
        alt={room.type}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">{room.type} Room</h5>
          <span className={`badge ${room.available ? 'bg-success' : 'bg-danger'}`}>
            {room.available ? 'Available' : 'Booked'}
          </span>
        </div>
        
        <p className="card-text">
          <small className="text-muted">Room #{room.roomNumber}</small>
        </p>
        
        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <FaBed className="text-primary me-2" />
            <span>Sleeps: {room.capacity} people</span>
          </div>
          
          <div className="d-flex align-items-center mb-2">
            <FaUsers className="text-primary me-2" />
            <span>Type: {room.type}</span>
          </div>
          
          <div className="mb-2">
            <strong className="text-primary">₹{room.price}</strong> / night
          </div>
        </div>
        
        <div className="mb-3">
          <h6 className="mb-2">Amenities:</h6>
          <div className="d-flex flex-wrap gap-2">
            {room.amenities?.map((amenity, index) => (
              <span key={index} className="badge bg-light text-dark border">
                {getAmenityIcon(amenity)}
                {amenity}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto">
          <Link 
            to={`/reserve?roomId=${room.id}`}
            className={`btn btn-primary w-100 ${!room.available ? 'disabled' : ''}`}
            disabled={!room.available}
          >
            {room.available ? 'Book Now' : 'Not Available'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;