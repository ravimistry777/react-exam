export const FETCH_RESERVATIONS_REQUEST = 'FETCH_RESERVATIONS_REQUEST';
export const FETCH_RESERVATIONS_SUCCESS = 'FETCH_RESERVATIONS_SUCCESS';
export const FETCH_RESERVATIONS_FAILURE = 'FETCH_RESERVATIONS_FAILURE';
export const ADD_RESERVATION_SUCCESS = 'ADD_RESERVATION_SUCCESS';
export const UPDATE_RESERVATION_SUCCESS = 'UPDATE_RESERVATION_SUCCESS';
export const DELETE_RESERVATION_SUCCESS = 'DELETE_RESERVATION_SUCCESS';

// Fetch Actions
export const fetchReservationsRequest = () => ({ 
  type: FETCH_RESERVATIONS_REQUEST 
});

export const fetchReservationsSuccess = (reservations) => ({ 
  type: FETCH_RESERVATIONS_SUCCESS, 
  payload: reservations 
});

export const fetchReservationsFailure = (error) => ({ 
  type: FETCH_RESERVATIONS_FAILURE, 
  payload: error 
});

// Add Reservation
export const addReservationSuccess = (reservation) => ({ 
  type: ADD_RESERVATION_SUCCESS, 
  payload: reservation 
});

// Update Reservation
export const updateReservationSuccess = (reservation) => ({ 
  type: UPDATE_RESERVATION_SUCCESS, 
  payload: reservation 
});

// Delete Reservation
export const deleteReservationSuccess = (reservationId) => ({ 
  type: DELETE_RESERVATION_SUCCESS, 
  payload: reservationId 
});