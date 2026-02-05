import { FETCH_ROOMS_REQUEST,FETCH_ROOMS_SUCCESS,FETCH_ROOMS_FAILURE,ADD_ROOM_SUCCESS,UPDATE_ROOM_SUCCESS,DELETE_ROOM_SUCCESS } from '../actions/roomActions';

const initialState = {
  rooms: [],
  loading: false,
  error: null,
  filteredRooms: []
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
      return { ...state, loading: true, error: null };
    
    case FETCH_ROOMS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        rooms: action.payload,
        filteredRooms: action.payload 
      };
    
    case FETCH_ROOMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    case ADD_ROOM_SUCCESS:
      return { 
        ...state, 
        rooms: [...state.rooms, action.payload],
        filteredRooms: [...state.filteredRooms, action.payload]
      };
    
    case UPDATE_ROOM_SUCCESS:
      const updatedRooms = state.rooms.map(room => 
        room.id === action.payload.id ? { ...room, ...action.payload } : room
      );
      return {
        ...state,
        rooms: updatedRooms,
        filteredRooms: updatedRooms
      };

    case DELETE_ROOM_SUCCESS:
      const remainingRooms = state.rooms.filter(room => room.id !== action.payload);
      return {
        ...state,
        rooms: remainingRooms,
        filteredRooms: remainingRooms
      };
    
    default:
      return state;
  }
};

export default roomReducer;