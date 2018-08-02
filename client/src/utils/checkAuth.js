import decode from 'jwt-decode';

const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  try {
    const payload = decode(token);
    if (payload.exp < new Date().getTime()) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
};

export default checkAuth;
