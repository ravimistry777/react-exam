import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchReservations, 
  cancelReservation,
  updateReservation 
} from '../redux/thunks/reservationThunks';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Badge, 
  Button, 
  Form, 
  Spinner, 
  Alert 
} from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSortAmountDown } from 'react-icons/fa';

const ReservationList = () => {
  const dispatch = useDispatch();
  const { reservations, loading, error } = useSelector((state) => state.reservations);
  const { user } = useSelector((state) => state.auth);
  
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (user) {
      dispatch(fetchReservations());
    }
  }, [dispatch, user]);

  const handleCancel = async (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      await dispatch(cancelReservation(reservationId));
    }
  };

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setEditData({
      guestName: reservation.guestName,
      guestPhone: reservation.guestPhone,
      specialRequests: reservation.specialRequests
    });
  };

  const handleUpdate = async (reservationId) => {
    const result = await dispatch(updateReservation({ id: reservationId, ...editData }));
    if (result.type.endsWith('fulfilled')) {
      setEditingId(null);
    }
  };

  const filteredReservations = reservations.filter(res => {
    if (filter === 'all') return true;
    if (filter === 'active') return res.status === 'confirmed';
    if (filter === 'cancelled') return res.status === 'cancelled';
    if (filter === 'completed') {
      const checkout = new Date(res.checkOut);
      const today = new Date();
      return checkout < today;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed': return <span className="badge bg-success bg-opacity-10 text-success rounded-0 px-3 fw-normal letter-spacing-1">CONFIRMED</span>;
      case 'cancelled': return <span className="badge bg-danger bg-opacity-10 text-danger rounded-0 px-3 fw-normal letter-spacing-1">CANCELLED</span>;
      default: return <span className="badge bg-secondary bg-opacity-10 text-secondary rounded-0 px-3 fw-normal letter-spacing-1">{status}</span>;
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-body">
        <Spinner animation="border" role="status" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center rounded-0 border-0 bg-danger bg-opacity-10 text-danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div className="bg-body min-vh-100 py-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-end mb-5 animate-fade-in">
          <div>
            <span className="text-muted small text-uppercase letter-spacing-2 fw-bold">Dashboard</span>
            <h2 className="display-6 fw-bold mt-2 text-main">My Bookings</h2>
            <p className="text-muted mb-0 small text-uppercase letter-spacing-1">Manage your upcoming and past reservations</p>
          </div>
          
          <div className="mt-4 mt-md-0">
            <Form.Select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-0 border-0 border-bottom bg-transparent shadow-none"
              style={{ minWidth: '200px', borderRadius: 0 }}
            >
              <option value="all">All Bookings</option>
              <option value="active">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Past</option>
            </Form.Select>
          </div>
        </div>

        {filteredReservations.length === 0 ? (
          <div className="text-center py-5 bg-surface border border-dashed rounded-0 animate-fade-in">
            <h4 className="text-muted h6 text-uppercase letter-spacing-2">No reservations found</h4>
            <p className="text-muted mb-0 small">You haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="bg-surface border-0 shadow-sm rounded-0 animate-fade-in overflow-hidden">
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead className="bg-light border-bottom">
                  <tr>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1">Room Info</th>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1">Guest Details</th>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1">Dates</th>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1">Amount</th>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1">Status</th>
                    <th className="py-3 px-4 border-0 text-muted small text-uppercase fw-bold letter-spacing-1 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map((res) => (
                    <tr key={res.id} className="border-bottom">
                      <td className="px-4 py-4">
                        <div className="fw-bold text-main">{res.roomType}</div>
                        <div className="small text-muted">Room {res.roomNumber}</div>
                      </td>
                      <td className="px-4 py-4">
                        {editingId === res.id ? (
                          <div className="d-flex flex-column gap-2">
                            <Form.Control 
                              size="sm"
                              value={editData.guestName}
                              onChange={(e) => setEditData({...editData, guestName: e.target.value})}
                              placeholder="Name"
                              className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none py-1"
                            />
                            <Form.Control 
                              size="sm"
                              value={editData.guestPhone}
                              onChange={(e) => setEditData({...editData, guestPhone: e.target.value})}
                              placeholder="Phone"
                              className="rounded-0 border-0 border-bottom px-0 bg-transparent shadow-none py-1"
                            />
                          </div>
                        ) : (
                          <>
                            <div className="fw-medium text-main">{res.guestName}</div>
                            <div className="small text-muted">{res.guestPhone}</div>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="small text-muted">
                          <div className="mb-1"><span className="fw-bold text-main">In:</span> {new Date(res.checkIn).toLocaleDateString()}</div>
                          <div><span className="fw-bold text-main">Out:</span> {new Date(res.checkOut).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="fw-bold text-main">₹{res.totalAmount}</div>
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(res.status)}
                      </td>
                      <td className="px-4 py-4 text-end">
                        {res.status === 'confirmed' && (
                          <div className="d-flex gap-2 justify-content-end">
                            {editingId === res.id ? (
                              <>
                                <Button 
                                  variant="success" 
                                  size="sm" 
                                  className="btn-icon rounded-0 p-2"
                                  onClick={() => handleUpdate(res.id)}
                                >
                                  <FaCheck />
                                </Button>
                                <Button 
                                  variant="secondary" 
                                  size="sm" 
                                  className="btn-icon rounded-0 p-2"
                                  onClick={() => setEditingId(null)}
                                >
                                  <FaTimes />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="text-muted p-2"
                                  onClick={() => handleEdit(res)}
                                  title="Edit Guest Info"
                                >
                                  <FaEdit />
                                </Button>
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  className="text-danger p-2"
                                  onClick={() => handleCancel(res.id)}
                                  title="Cancel Reservation"
                                >
                                  <FaTrash />
                                </Button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ReservationList;
