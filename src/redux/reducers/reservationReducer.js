import { FETCH_RESERVATIONS_REQUEST,FETCH_RESERVATIONS_SUCCESS,FETCH_RESERVATIONS_FAILURE,ADD_RESERVATION_SUCCESS,UPDATE_RESERVATION_SUCCESS,DELETE_RESERVATION_SUCCESS } from '../actions/reservationActions';

const initialState = {
  reservations: [],
  loading: false,
  error: null
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESERVATIONS_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_RESERVATIONS_SUCCESS:
      return { ...state, loading: false, reservations: action.payload };
    
    case FETCH_RESERVATIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    case ADD_RESERVATION_SUCCESS:
      return { ...state, reservations: [...state.reservations, action.payload] };

    case UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.map((reservation) =>
          reservation.id === action.payload.id ? { ...reservation, ...action.payload } : reservation
        ),
      };

    case DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: state.reservations.filter((reservation) => reservation.id !== action.payload),
      };
    
    default:
      return state;
  }
};

export default reservationReducer;