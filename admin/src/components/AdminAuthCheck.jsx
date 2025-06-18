import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAdminProfile } from '../store/slices/adminAuthSlice';

const AdminAuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if we have a token and try to fetch the admin profile
    const token = localStorage.getItem('adminToken');
    if (token) {
      dispatch(getAdminProfile());
    }
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default AdminAuthCheck;