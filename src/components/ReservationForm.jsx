import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeReservation } from '../redux/thunks/reservationThunks';
import { fetchRooms } from '../redux/thunks/roomThunks';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ReservationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { rooms } = useSelector((state) => state.rooms);
  
  const queryParams = new URLSearchParams(location.search);
  const roomIdFromUrl = queryParams.get('roomId');
  
  const [formData, setFormData] = useState({
    roomId: roomIdFromUrl || '',
    guestName: '',
    guestEmail: user?.email || '',
    guestPhone: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 1)),
    numberOfGuests: 1,
    specialRequests: ''
  });
  
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  useEffect(() => {
    if (roomIdFromUrl && rooms.length > 0) {
      const room = rooms.find(r => r.id === roomIdFromUrl);
      if (room) {
        setSelectedRoom(room);
        setFormData(prev => ({ 
          ...prev, 
          roomId: roomIdFromUrl,
          numberOfGuests: Math.min(prev.numberOfGuests, room.capacity)
        }));
      }
    }
  }, [roomIdFromUrl, rooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'roomId') {
      const room = rooms.find(r => r.id === value);
      setSelectedRoom(room);
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * nights;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (!user) {
      setError('Please login to make a reservation');
      setSubmitting(false);
      return;
    }

    if (formData.numberOfGuests > selectedRoom.capacity) {
      setError(`Maximum capacity for this room is ${selectedRoom.capacity} guests`);
      setSubmitting(false);
      return;
    }

    const reservationData = {
      ...formData,
      userId: user.uid,
      roomId: selectedRoom.id,
      roomNumber: selectedRoom.roomNumber,
      roomType: selectedRoom.type,
      totalAmount: calculateTotal(),
      status: 'confirmed',
      checkIn: formData.checkIn.toISOString(),
      checkOut: formData.checkOut.toISOString()
    };

    const result = await dispatch(makeReservation(reservationData));
    
    if (result.success) {
      alert('Reservation successful!');
      navigate('/reservations');
    } else {
      setError(result.error || 'Failed to make reservation');
    }
    
    setSubmitting(false);
  };

  const availableRooms = rooms.filter(room => room.available);

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Make Reservation</h4>
            </div>
            
            <div className="card-body">
              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Room Selection */}
                <div className="mb-4">
                  <label className="form-label">Select Room *</label>
                  <select
                    className="form-select"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a room...</option>
                    {availableRooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.type} Room #{room.roomNumber} - ₹{room.price}/night
                      </option>
                    ))}
                  </select>
                  
                  {selectedRoom && (
                    <div className="mt-3 p-3 bg-light rounded">
                      <h6>Selected Room Details:</h6>
                      <p className="mb-1">Type: {selectedRoom.type}</p>
                      <p className="mb-1">Capacity: {selectedRoom.capacity} guests</p>
                      <p className="mb-1">Price: ₹{selectedRoom.price} per night</p>
                      <p className="mb-0">Amenities: {selectedRoom.amenities?.join(', ')}</p>
                    </div>
                  )}
                </div>

                {/* Guest Information */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Guest Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="guestEmail"
                      value={formData.guestEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="guestPhone"
                      value={formData.guestPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Number of Guests *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="numberOfGuests"
                      value={formData.numberOfGuests}
                      onChange={handleChange}
                      min="1"
                      max={selectedRoom?.capacity || 10}
                      required
                    />
                    {selectedRoom && (
                      <small className="text-muted">
                        Maximum: {selectedRoom.capacity} guests
                      </small>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Check-in Date *</label>
                    <DatePicker
                      selected={formData.checkIn}
                      onChange={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
                      className="form-control"
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label">Check-out Date *</label>
                    <DatePicker
                      selected={formData.checkOut}
                      onChange={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
                      className="form-control"
                      minDate={formData.checkIn}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className="mb-4">
                  <label className="form-label">Special Requests</label>
                  <textarea
                    className="form-control"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                {/* Price Summary */}
                {selectedRoom && (
                  <div className="card mb-4">
                    <div className="card-body">
                      <h6>Price Summary</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Room Price (per night):</span>
                        <span>₹{selectedRoom.price}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Number of Nights:</span>
                        <span>
                          {Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24))}
                        </span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <strong>Total Amount:</strong>
                        <strong className="text-primary">₹{calculateTotal()}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={submitting || !selectedRoom}
                  >
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      'Confirm Reservation'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;