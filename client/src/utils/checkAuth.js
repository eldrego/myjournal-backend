import decode from 'jwt-decode';

const checkAuth = () => {
  let isLoggedIn = true;
  const token = localStorage.getItem('token');
  if (!token) {
    isLoggedIn = false;
  }

  try {
    const payload = decode(token);
    if (payload.exp < new Date().getTime()) {
      isLoggedIn = false;
    }
  } catch (error) {
    isLoggedIn = false;
  }

  console.log(isLoggedIn);

  return isLoggedIn;
};

export default checkAuth;
