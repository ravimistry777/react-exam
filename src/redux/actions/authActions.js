
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

// Login Actions
export const loginRequest = () => ({ 
  type: LOGIN_REQUEST 
});

export const loginSuccess = (user) => ({ 
  type: LOGIN_SUCCESS, 
  payload: user 
});

export const loginFailure = (error) => ({ 
  type: LOGIN_FAILURE, 
  payload: error 
});

// Register Actions
export const registerRequest = () => ({ 
  type: REGISTER_REQUEST 
});

export const registerSuccess = (user) => ({ 
  type: REGISTER_SUCCESS, 
  payload: user 
});

export const registerFailure = (error) => ({ 
  type: REGISTER_FAILURE, 
  payload: error 
});

// Logout Action
export const logoutUser = () => ({ 
  type: LOGOUT 
});