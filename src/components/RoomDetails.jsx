import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import { FaBed, FaUsers, FaWifi, FaTv, FaSnowflake, FaWineBottle, FaArrowRight } from 'react-icons/fa';

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
    <div className="card-hover h-100 border border-light rounded-0 bg-white d-flex flex-column transition-all">
      <div className="position-relative overflow-hidden">
        <div className="ratio ratio-4x3">
          <img 
            src={room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            className="w-100 h-100 object-fit-cover transition-transform hover-scale"
            alt={`Room ${room.roomNumber}`}
          />
        </div>
        <div className="position-absolute top-0 end-0 m-3">
          <span className={`badge rounded-0 fw-normal letter-spacing-1 py-2 px-3 ${room.available ? 'bg-white text-dark' : 'bg-secondary text-white'}`}>
            {room.available ? 'AVAILABLE' : 'BOOKED'}
          </span>
        </div>
        <div className="position-absolute bottom-0 start-0 m-3">
           <span className="badge rounded-0 bg-white text-dark fw-normal letter-spacing-1 py-2 px-3">
             {room.type}
           </span>
        </div>
      </div>
      
      <div className="p-4 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="font-serif fs-4 mb-0 text-dark">Room {room.roomNumber}</h5>
          <div className="text-dark font-serif h5 mb-0">
            ₹{room.price}<span className="text-muted ms-1 small font-sans fw-light">/ night</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="d-flex gap-4 text-secondary small mb-3 letter-spacing-1">
            <div className="d-flex align-items-center">
              <FaUsers className="me-2 opacity-75" size={14} />
              <span>Up to {room.capacity} Guests</span>
            </div>
            <div className="d-flex align-items-center">
              <FaBed className="me-2 opacity-75" size={14} />
              <span>King Size Bed</span>
            </div>
          </div>
          
          <div className="d-flex flex-wrap gap-2">
            {room.amenities?.slice(0, 3).map((amenity, index) => (
              <span key={index} className="badge bg-light text-secondary fw-normal border border-light px-3 py-2 rounded-0 letter-spacing-1">
                {getAmenityIcon(amenity)} {amenity}
              </span>
            ))}
            {room.amenities?.length > 3 && (
              <span className="badge bg-light text-secondary fw-normal border border-light px-3 py-2 rounded-0 letter-spacing-1">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-auto pt-3 border-top border-light">
          <Link 
            to={`/reserve?roomId=${room.id}`}
            className={`btn w-100 rounded-0 py-2 letter-spacing-1 transition-all ${room.available ? 'btn-dark' : 'btn-secondary disabled'}`}
            style={{ pointerEvents: room.available ? 'auto' : 'none' }}
          >
            {room.available ? (
              <>BOOK NOW <FaArrowRight className="ms-2" size={10} /></>
            ) : 'UNAVAILABLE'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
