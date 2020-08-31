const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        user: action.payload,
      };
    case 'LOGIN_USER':
      return {
        user: action.payload,
      };
    case 'LOGOUT_USER':
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const registerUser = (userData) => {
  return {
    type: 'REGISTER_USER',
    payload: userData,
  };
};

export const loginUser = (userData) => {
  return {
    type: 'LOGIN_USER',
    payload: userData,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export default authReducer;
