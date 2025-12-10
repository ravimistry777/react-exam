import { fetchRoomsRequest,fetchRoomsSuccess,fetchRoomsFailure,addRoomSuccess,updateRoomSuccess,deleteRoomSuccess } from '../actions/roomActions';
import { db } from '../../firebase/config';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';

export const fetchRooms = () => async (dispatch) => {
  dispatch(fetchRoomsRequest());
  try {
    const roomsCollection = collection(db, 'rooms');
    const snapshot = await getDocs(roomsCollection);
    const rooms = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch(fetchRoomsSuccess(rooms));
  } catch (error) {
    dispatch(fetchRoomsFailure(error.message));
  }
};

export const addRoom = (roomData) => async (dispatch) => {
  try {
    const roomsCollection = collection(db, 'rooms');
    const docRef = await addDoc(roomsCollection, roomData);
    const newRoom = { id: docRef.id, ...roomData };
    dispatch(addRoomSuccess(newRoom));
    return { success: true, room: newRoom };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateRoom = (roomId, updatedData) => async (dispatch) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await updateDoc(roomRef, updatedData);
    dispatch(updateRoomSuccess({ id: roomId, ...updatedData }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteRoom = (roomId) => async (dispatch) => {
  try {
    const roomRef = doc(db, 'rooms', roomId);
    await deleteDoc(roomRef);
    dispatch(deleteRoomSuccess(roomId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};