import React, { useState } from 'react';
import Input from '../../componants/formCompo/Input.jsx';
import TextArea from '../../componants/formCompo/TextArea.jsx';
import Button from '../../componants/formCompo/Button.jsx';

function UserReg() {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // TODO: API call
  };

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">User Registration</h4>
          <form className="forms-sample" onSubmit={handleSubmit}>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Full Name"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Hero Line"
                  name="heroLine"
                  value={formData.heroLine}
                  onChange={handleChange}
                  placeholder="Hero Line"
                />
              </div>
            </div>

            <TextArea
              label="Short About"
              name="shortAbout"
              value={formData.shortAbout}
              onChange={handleChange}
              rows={2}
              placeholder="Brief introduction"
            />

            <TextArea
              label="Long About"
              name="longAbout"
              value={formData.longAbout}
              onChange={handleChange}
              rows={4}
              placeholder="Detailed description"
            />

            <TextArea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="Full address"
            />

            <hr />
            <h5>Social Links</h5>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Twitter"
                  name="twitterLink"
                  value={formData.twitterLink}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="LinkedIn"
                  name="linkedinLink"
                  value={formData.linkedinLink}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="GitHub"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  placeholder="GitHub URL"
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Instagram"
                  name="instagramLink"
                  value={formData.instagramLink}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                />
              </div>
            </div>

            <Input
              label="Behance"
              name="behanceLink"
              value={formData.behanceLink}
              onChange={handleChange}
              placeholder="Behance URL"
            />

            <Button type="submit" label="Submit" className="btn-primary me-2" />
            <Button type="reset" label="Cancel" className="btn-light" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserReg;
