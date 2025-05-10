import { useState } from 'react';
import '../styles/AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminSigninStart, adminSigninSuccess, adminSigninFailure } from '../redux/admin/adminSlice';

export default function AdminLogin() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.admin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(adminSigninStart());
      const res = await fetch(`/api/adminAuth/admin-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      if (data.success === false) {
        dispatch(adminSigninFailure(data.message));
        return;
      }
      dispatch(adminSigninSuccess(data));
      navigate('/admin-profile');
    } catch (error) {
      dispatch(adminSigninFailure(error.message))
    }
  };

  return (
    <div className='Adminlogin-form'>Admin Login
      <form onSubmit={handleSubmit} >
        <div>
        <label htmlFor="adminUsername">Username</label>
          <input
            type="text"
            id="adminUsername"
            name="adminUsername"
            placeholder="Enter your username"
            required
            onChange={handleChange}
          />
          </div>
          <div>
          <label htmlFor="adminPassword">Password</label>
          <input
            type="password"
            id="adminPassword"
            name="adminPassword"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
            </div>
            
            <button disabled={loading} type="submit" className="submit-btn">
          {loading ? "Loading..." : "Sign In"}
        </button>
            
            </form>
      <div>
  {error && <p className="error-message">{error}</p>}
</div>
    </div>
    
  );
}
