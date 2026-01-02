import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from './authSlice';
import authService from './authService';
import { toast } from 'react-toastify';



function Login() {
 const navigate = useNavigate(); // For programmatic navigation
 const dispatch = useDispatch();
 const [username, setUsername] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();
  
  setError("");

    if (!username || !password) {
      toast.error("Username and password are required");
      return;
    }

    setLoading(true);
    try {
    const response = await authService.login({
          username,
          password,
    });

      if (response.success) {
          // 1. Save token
            localStorage.setItem("token", response.token);

          // 2. Update Redux state
            dispatch(
              loginAction({
                userId: response.userId,
                userData: {
                  response, // optional, add more if API sends
                },
              })
            );

            // 3. Navigate to dashboard
            navigate("/", { replace: true });
      } 
      else 
      { 
        setError(response.message || "Login failed");
      }
    } 
    catch (err) {
       toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }finally {
      setLoading(false);
    }
  };

  return (
     <>
        <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <img src="../../assets/images/logo.svg" alt="logo"/>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="fw-light">Sign in to continue.</h6>
                <form className="pt-3" 
                  onSubmit={handleLogin}>
                  <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="exampleInputEmail1" 
                    placeholder="Username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input type="text" 
                    className="form-control form-control-lg" 
                    id="exampleInputPassword1" 
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}/>
                  </div>
                  <div className="mt-3 d-grid gap-2">
                    <button type='submit' className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">
                      {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        "SIGN IN"
                      )}  
                    </button>    
                  </div>  
                </form>
              </div>
            </div>
          </div>
     </>
  )
}

export default Login
