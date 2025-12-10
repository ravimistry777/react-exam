export const FETCH_ROOMS_REQUEST = 'FETCH_ROOMS_REQUEST';
export const FETCH_ROOMS_SUCCESS = 'FETCH_ROOMS_SUCCESS';
export const FETCH_ROOMS_FAILURE = 'FETCH_ROOMS_FAILURE';
export const ADD_ROOM_SUCCESS = 'ADD_ROOM_SUCCESS';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';

// Fetch Actions
export const fetchRoomsRequest = () => ({ 
  type: FETCH_ROOMS_REQUEST 
});

export const fetchRoomsSuccess = (rooms) => ({ 
  type: FETCH_ROOMS_SUCCESS, 
  payload: rooms 
});

export const fetchRoomsFailure = (error) => ({ 
  type: FETCH_ROOMS_FAILURE, 
  payload: error 
});

// Add Room
export const addRoomSuccess = (room) => ({ 
  type: ADD_ROOM_SUCCESS, 
  payload: room 
});

// Update Room
export const updateRoomSuccess = (room) => ({ 
  type: UPDATE_ROOM_SUCCESS, 
  payload: room 
});

// Delete Room
export const deleteRoomSuccess = (roomId) => ({ 
  type: DELETE_ROOM_SUCCESS, 
  payload: roomId 
});