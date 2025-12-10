import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchReservations, 
  cancelReservation,
  updateReservation 
} from '../redux/thunks/reservationThunks';
import { FaEdit, FaTrash, FaEye, FaCalendarCheck, FaCalendarTimes } from 'react-icons/fa';

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
      const result = await dispatch(cancelReservation(reservationId));
      if (result.success) {
        alert('Reservation cancelled successfully');
      }
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
    const result = await dispatch(updateReservation(reservationId, editData));
    if (result.success) {
      setEditingId(null);
      alert('Reservation updated successfully');
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
      case 'confirmed': return <span className="badge bg-success">Confirmed</span>;
      case 'cancelled': return <span className="badge bg-danger">Cancelled</span>;
      default: return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Reservations</h2>
        <div className="d-flex gap-2">
          <select 
            className="form-select w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Reservations</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="text-center py-5">
          <FaCalendarCheck size={48} className="text-muted mb-3" />
          <h4>No reservations found</h4>
          <p className="text-muted">You haven't made any reservations yet.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Reservation ID</th>
                <th>Room Details</th>
                <th>Guest Info</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>
                    <small className="text-muted">#{reservation.id.substring(0, 8)}</small>
                  </td>
                  
                  <td>
                    <div>
                      <strong>{reservation.roomType}</strong>
                      <div className="small">Room #{reservation.roomNumber}</div>
                    </div>
                  </td>
                  
                  <td>
                    {editingId === reservation.id ? (
                      <div>
                        <input
                          type="text"
                          className="form-control form-control-sm mb-1"
                          value={editData.guestName}
                          onChange={(e) => setEditData({...editData, guestName: e.target.value})}
                        />
                        <input
                          type="tel"
                          className="form-control form-control-sm"
                          value={editData.guestPhone}
                          onChange={(e) => setEditData({...editData, guestPhone: e.target.value})}
                        />
                      </div>
                    ) : (
                      <div>
                        <div>{reservation.guestName}</div>
                        <div className="small">{reservation.guestPhone}</div>
                      </div>
                    )}
                  </td>
                  
                  <td>
                    <div className="small">
                      <div><strong>Check-in:</strong> {new Date(reservation.checkIn).toLocaleDateString()}</div>
                      <div><strong>Check-out:</strong> {new Date(reservation.checkOut).toLocaleDateString()}</div>
                    </div>
                  </td>
                  
                  <td>
                    <strong className="text-primary">₹{reservation.totalAmount}</strong>
                  </td>
                  
                  <td>
                    {getStatusBadge(reservation.status)}
                  </td>
                  
                  <td>
                    {editingId === reservation.id ? (
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => handleUpdate(reservation.id)}
                        >
                          Save
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleEdit(reservation)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        
                        {reservation.status === 'confirmed' && (
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancel(reservation.id)}
                            title="Cancel"
                          >
                            <FaTrash />
                          </button>
                        )}
                        
                        <button 
                          className="btn btn-outline-info btn-sm"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReservationList;