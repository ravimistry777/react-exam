import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeReservation } from '../redux/thunks/reservationThunks';
import { fetchRooms } from '../redux/thunks/roomThunks';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaBed, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

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
    return selectedRoom.price * (nights > 0 ? nights : 0);
  };
  
  const nights = Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24));

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

    try {
      const result = await dispatch(makeReservation(reservationData));
      if (result.success) {
        navigate('/reservations');
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message || 'Failed to make reservation');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-body min-vh-100 py-5">
      <Container>
        <div className="text-center mb-5 animate-fade-in">
          <span className="text-muted small text-uppercase letter-spacing-2 fw-bold">Reservations</span>
          <h2 className="display-5 fw-bold mt-2 text-main">Book Your Stay</h2>
        </div>

        <Row className="g-5">
          <Col lg={7}>
            <div className="bg-surface p-4 p-md-5 border-0 shadow-sm rounded-0 animate-fade-in">
              <h4 className="fw-bold mb-4 d-flex align-items-center text-main">
                Guest Information
              </h4>
              
              {error && <Alert variant="danger" className="rounded-0 border-0 bg-danger bg-opacity-10 text-danger mb-4">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Room Selection if not passed via URL */}
                {!roomIdFromUrl && (
                  <Form.Group className="mb-4">
                    <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Select Room</Form.Label>
                    <Form.Select 
                      name="roomId" 
                      value={formData.roomId} 
                      onChange={handleChange}
                      className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                      style={{ borderRadius: 0 }}
                      required
                    >
                      <option value="">-- Choose a Room --</option>
                      {rooms.filter(r => r.available).map(room => (
                        <option key={room.id} value={room.id}>
                          {room.type} - Room {room.roomNumber} (₹{room.price}/night)
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                )}

                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Full Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="guestName" 
                        value={formData.guestName} 
                        onChange={handleChange} 
                        className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                        style={{ borderRadius: 0 }}
                        required 
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Phone Number</Form.Label>
                      <Form.Control 
                        type="tel" 
                        name="guestPhone" 
                        value={formData.guestPhone} 
                        onChange={handleChange} 
                        className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                        style={{ borderRadius: 0 }}
                        required 
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-5">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    name="guestEmail" 
                    value={formData.guestEmail} 
                    onChange={handleChange} 
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                    required 
                    readOnly
                  />
                </Form.Group>

                <h4 className="fw-bold mb-4 mt-5 d-flex align-items-center text-main">
                  Stay Details
                </h4>

                <Row className="g-4 mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Check-in Date</Form.Label>
                      <div className="custom-datepicker-wrapper">
                        <DatePicker
                          selected={formData.checkIn}
                          onChange={(date) => setFormData(prev => ({ ...prev, checkIn: date }))}
                          selectsStart
                          startDate={formData.checkIn}
                          endDate={formData.checkOut}
                          minDate={new Date()}
                          className="form-control rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none w-100"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Check-out Date</Form.Label>
                      <div className="custom-datepicker-wrapper">
                        <DatePicker
                          selected={formData.checkOut}
                          onChange={(date) => setFormData(prev => ({ ...prev, checkOut: date }))}
                          selectsEnd
                          startDate={formData.checkIn}
                          endDate={formData.checkOut}
                          minDate={formData.checkIn}
                          className="form-control rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none w-100"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Number of Guests</Form.Label>
                  <Form.Control 
                    type="number" 
                    name="numberOfGuests" 
                    min="1" 
                    max={selectedRoom ? selectedRoom.capacity : 5}
                    value={formData.numberOfGuests} 
                    onChange={handleChange} 
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                    required 
                  />
                  {selectedRoom && (
                    <Form.Text className="text-muted small">
                      Max capacity: {selectedRoom.capacity} guests
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-5">
                  <Form.Label className="small text-uppercase fw-bold letter-spacing-1 text-muted">Special Requests</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    name="specialRequests" 
                    value={formData.specialRequests} 
                    onChange={handleChange} 
                    className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none"
                    style={{ borderRadius: 0 }}
                    placeholder="Any specific preferences?"
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  variant="dark"
                  className="w-100 py-3 rounded-0 text-uppercase letter-spacing-2"
                  disabled={submitting || !selectedRoom}
                >
                  {submitting ? <Spinner size="sm" animation="border" /> : 'Confirm Reservation'}
                </Button>
              </Form>
            </div>
          </Col>

          <Col lg={5}>
            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
              <div className="bg-white border shadow-sm rounded-0 overflow-hidden">
                <div className="p-4 border-bottom bg-surface">
                  <h5 className="mb-0 fw-bold letter-spacing-2 text-center text-uppercase small">Your Stay Summary</h5>
                </div>
                
                {selectedRoom ? (
                  <>
                    <div className="position-relative">
                      <img 
                        src={selectedRoom.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                        style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                        alt="Room"
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-to-t from-black-50">
                         <h5 className="text-white fw-bold mb-0 text-shadow">{selectedRoom.type} Room</h5>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                         <span className="badge bg-light text-dark border rounded-0 px-3 py-2">Room {selectedRoom.roomNumber}</span>
                         <span className="text-muted small">{formData.numberOfGuests} Guests</span>
                      </div>
                      
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Price per night</span>
                        <span className="fw-bold">₹{selectedRoom.price}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">Duration</span>
                        <span className="fw-bold">{nights} nights</span>
                      </div>
                      
                      <hr className="my-4 opacity-10" />

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-main">Total Amount</span>
                        <span className="h4 fw-bold text-main mb-0">₹{calculateTotal()}</span>
                      </div>

                      <div className="mt-4 text-center">
                        <small className="text-muted d-flex align-items-center justify-content-center">
                          <FaCheckCircle className="text-muted me-2" /> Free Cancellation until 24h before
                        </small>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-5 text-center">
                    <FaBed size={32} className="text-muted mb-3 opacity-50" />
                    <h5 className="text-muted h6 text-uppercase letter-spacing-1">No Room Selected</h5>
                    <p className="small text-muted mb-0">Select a room to view details.</p>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ReservationForm;
