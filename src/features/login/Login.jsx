import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function Login() {
 const navigate = useNavigate(); // For programmatic navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Example API call
    //   const response = await fetch("https://your-api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ username, password }),
    //   });


      //const data = await response.json();
      let success = false;
      if (username === "admin" || password === "admin") {
        success = true;
      }

      if (success) {
        // Save token (or any auth info) in localStorage
        localStorage.setItem("token", "your-auth-token");

        // Redirect to dashboard (protected admin layout)
        navigate("/", { replace: true });
      } else {
         
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
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
                <form className="pt-3" onSubmit={handleLogin}>
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
                    <button type='submit' className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn">SIGN IN</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/> Keep me signed in </label>
                    </div>
                    <a href="#" className="auth-link text-black">Forgot password?</a>
                  </div>
 
                   
                </form>
              </div>
            </div>
          </div>
     </>
  )
}

export default Login
