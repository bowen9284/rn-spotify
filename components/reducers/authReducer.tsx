const AuthReducer = (prevState: any, action: any) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        accessToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignout: false,
        accessToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignout: true,
        accessToken: null,
      };
  }
};