import { loginRequest,loginSuccess,loginFailure,registerRequest,registerSuccess,registerFailure,logoutUser } from '../actions/authActions';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from 'firebase/auth';

// Register
export const registerUser = (email, password, userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      ...userData
    };
    dispatch(registerSuccess(user));
    return { success: true, user };
  } catch (error) {
    dispatch(registerFailure(error.message));
    return { success: false, error: error.message };
  }
};

// Login
export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email
    };
    dispatch(loginSuccess(user));
    return { success: true, user };
  } catch (error) {
    dispatch(loginFailure(error.message));
    return { success: false, error: error.message };
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logoutUser());
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};