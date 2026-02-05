import { fetchReservationsRequest,fetchReservationsSuccess,fetchReservationsFailure,addReservationSuccess,updateReservationSuccess,deleteReservationSuccess } from '../actions/reservationActions';
import { db } from '../../firebase/config';
import { collection,getDocs,addDoc,updateDoc,deleteDoc,doc,query,where } from 'firebase/firestore';

// Fetch
export const fetchReservations = () => async (dispatch) => {
  dispatch(fetchReservationsRequest());
  try {
    const reservationsCollection = collection(db, 'reservations');
    const snapshot = await getDocs(reservationsCollection);
    const reservations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch(fetchReservationsSuccess(reservations));
  } catch (error) {
    dispatch(fetchReservationsFailure(error.message));
  }
};

// Make reservation
export const makeReservation = (reservationData) => async (dispatch) => {
  try {
    const reservationsCollection = collection(db, 'reservations');
    const docRef = await addDoc(reservationsCollection, {
      ...reservationData,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    });
    const newReservation = { id: docRef.id, ...reservationData };
    dispatch(addReservationSuccess(newReservation));
    return { success: true, reservation: newReservation };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update
export const updateReservation = (reservationId, updatedData) => async (dispatch) => {
  try {
    const reservationRef = doc(db, 'reservations', reservationId);
    await updateDoc(reservationRef, updatedData);
    dispatch(updateReservationSuccess({ id: reservationId, ...updatedData }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Cancel
export const cancelReservation = (reservationId) => async (dispatch) => {
  try {
    const reservationRef = doc(db, 'reservations', reservationId);
    await updateDoc(reservationRef, { status: 'cancelled' });
    dispatch(updateReservationSuccess({ id: reservationId, status: 'cancelled' }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};