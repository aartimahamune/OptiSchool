import { useState } from 'react';
import '../styles/StudentLogin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { studentSigninFailure, studentSigninStart, studentSigninSuccess } from '../redux/student/studentSlice.js';

export default function StudentLogin() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.student);
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
      const payload = {
        prnNo: formData.prn, // Match backend's field name
        email: formData.studentEmail, // Match backend's field name
      };
      dispatch(studentSigninStart());
      const res = await fetch(`api/studentAuth/student-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send correctly formatted data
      });
      
      const data = await res.json();
      if (data.success === false) {
        dispatch(studentSigninFailure(data.message));
        return;
      }
      dispatch(studentSigninSuccess(data));
      navigate('/student-profile');
    } catch (error) {
      dispatch(studentSigninFailure(error.message));
    }
  };
  
  

  return (
    <div className='StudentLogin-form'>Student Login
      <form onSubmit={handleSubmit}>
        <div>
        <label htmlFor="prn">PRN No.</label>
          <input
            type="text"
            id="prn"
            name="prn"
            placeholder="Enter your PRN No."
            required
            onChange={handleChange}
          />
          </div>
          <div>
          <label htmlFor="studentEmail">email</label>
          <input
            type="email"
            id="studentEmail"
            name="studentEmail"
            placeholder="Enter your email"
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
