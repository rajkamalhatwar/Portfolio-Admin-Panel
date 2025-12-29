import React from 'react'
import { useState } from 'react'

function UserReg() {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    mobileNo: "",
    password: "",
    designation: "",
    heroLine: "",
    shortAbout: "",
    longAbout: "",
    address: "",
    twitterLink: "",
    linkedinLink: "",
    githubLink: "",
    instagramLink: "",
    behanceLink: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: API call here
  };

  return (
    <>
      <div className="col-md-12 grid-margin stretch-card">
  <div className="card">
    <div className="card-body">
      <h4 className="card-title">User Registration</h4>

      <form className="forms-sample" onSubmit={handleSubmit}>

        {/* Username & Email */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Mobile & Password */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                className="form-control"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Mobile Number"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
        </div>

        {/* Designation & Hero Line */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Designation</label>
              <input
                type="text"
                className="form-control"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Designation"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Hero Line</label>
              <input
                type="text"
                className="form-control"
                name="heroLine"
                value={formData.heroLine}
                onChange={handleChange}
                placeholder="Hero Line"
              />
            </div>
          </div>
        </div>

        {/* Short About */}
          <div className="form-group">
            <label>Short About</label>
            <textarea
              className="form-control"
              name="shortAbout"
              rows="2"
              value={formData.shortAbout}
              onChange={handleChange}
              placeholder="Brief introduction"
            ></textarea>
          </div>


        {/* Long About */}
        <div className="form-group">
          <label>Long About</label>
          <textarea
            className="form-control"
            name="longAbout"
            rows="4"
            value={formData.longAbout}
            onChange={handleChange}
            placeholder="Detailed description"
          ></textarea>
        </div>


        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <textarea
            className="form-control"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full address"
          ></textarea>
        </div>

        <hr />

        {/* Social Links */}
        <h5>Social Links</h5>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Twitter</label>
              <input
                type="text"
                className="form-control"
                name="twitterLink"
                value={formData.twitterLink}
                onChange={handleChange}
                placeholder="Twitter URL"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="text"
                className="form-control"
                name="linkedinLink"
                value={formData.linkedinLink}
                onChange={handleChange}
                placeholder="LinkedIn URL"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>GitHub</label>
              <input
                type="text"
                className="form-control"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                placeholder="GitHub URL"
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="text"
                className="form-control"
                name="instagramLink"
                value={formData.instagramLink}
                onChange={handleChange}
                placeholder="Instagram URL"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Behance</label>
          <input
            type="text"
            className="form-control"
            name="behanceLink"
            value={formData.behanceLink}
            onChange={handleChange}
            placeholder="Behance URL"
          />
        </div>

 

        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button type="reset" className="btn btn-light">
          Cancel
        </button>

      </form>
    </div>
  </div>
</div>

    </>
  );

}
 

export default UserReg
