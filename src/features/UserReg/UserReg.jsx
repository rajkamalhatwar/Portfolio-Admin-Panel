import React, { useState,useEffect, use } from 'react';
import Input from '../../componants/formCompo/Input.jsx';
import TextArea from '../../componants/formCompo/TextArea.jsx';
import Button from '../../componants/formCompo/Button.jsx';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SweetToast } from '../../componants/toastAlert/TostAlert.jsx';
import authService from '../login/authService.js';
import userRegService from './UserRegService.js';

function UserReg() {
  const {register, handleSubmit, reset} = useForm(); 
  const [loading, setLoading]  = useState (false);
  const userId = useSelector((state) => state.auth.userId);
   
  
  const SubmitUser = async (data) => {   
    const payload = {
      ...data,
      userId: userId || 0,   
    };
    setLoading(true);
    try{
      const response = await userRegService.submitUser(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message); // User registered
          break;

        case 2:
          SweetToast.success(message); // User updated
          break;

        case 3:
          SweetToast.warning(message); // Email exists
          break;

        case 4:
          SweetToast.error(message); // User not found
          break;

        default:
          SweetToast.error("Something went wrong.");
          break;
      }
    }catch (error) {
      SweetToast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    }finally {
      setLoading(false);
    }

    console.log(payload);
    
     
    // TODO: API call
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await authService.getUserById(userId);
      if (userData) { 
        reset({
          userName: userData.userName || "",
          email: userData.email || "",
          mobileNo: userData.mobileNo || "",
          heroLine: userData.heroLine || "",
          designations: userData.designations || "",
          shortAbout: userData.shortAbout || "",
          longAbout: userData.longAbout || "",
          address: userData.address || "",
          city: userData.city || "",
          state: userData.state || "",
          country: userData.country || "",
          twitterLink: userData.twitterLink || "",
          linkedInLink: userData.linkedInLink || "",
          gitHubLink: userData.gitHubLink || "",
          instagramLink : userData.instagramLink || "",
          behanceLink : userData.behanceLink || "",  
        });
      }
  };
    fetchUserData();
  }, [userId, reset]);  

  return (
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">User Registration</h4>
          <form className="forms-sample" onSubmit={handleSubmit(SubmitUser)}>

            <div className="row">
              <div className="col-md-4">
                <Input
                  label="Full Name"
                  name="userName" 
                  placeholder="Full Name"
                  required
                  {...register('userName',{
                    required:true,
                  })}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Email"
                  type="email"
                  name="email" 
                  placeholder="Email"
                  required
                  {...register('email',{
                    required:true,
                  })}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Mobile Number"
                  name="mobileNo" 
                  placeholder="Mobile Number"
                  required
                  {...register('mobileNo',{
                    required:true,
                  })}                  
                />
              </div>              
            </div>

            {/* <div className="row">

              <div className="col-md-6">
                <Input
                  label="Password"
                  type="password"
                  name="password" 
                  placeholder="Password"
                  {...register('password')}
                />
              </div>
            </div> */}

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Designation"
                  name="designations"  
                  placeholder="Designations eg.Software Engineer, Software Developer"
                  {...register('designations')}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Hero Line"
                  name="heroLine" 
                  placeholder="Hero Line"
                  {...register('heroLine')}

                />
              </div>
            </div>

            <TextArea
              label="Short About"
              name="shortAbout" 
              rows={2}
              placeholder="Brief introduction"
              {...register('shortAbout')}

            />

            <TextArea
              label="Long About"
              name="longAbout" 
              rows={4}
              placeholder="Detailed description"
              {...register('longAbout')}
            />

            <TextArea
              label="Address"
              name="address"  
              rows={3}
              placeholder="Full address"
              {...register('address')}
            />
            <div className="row">
              <div className="col-md-4">
                <Input
                  label="City"
                  name="city"  
                  placeholder="City"
                  {...register('city')}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="State"
                  name="state" 
                  placeholder="State"
                  {...register('state')}

                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Country"
                  name="country" 
                  placeholder="Country"
                  {...register('country')}

                />
              </div>              
            </div>
            <hr />
            <h5>Social Links</h5>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Twitter"
                  name="twitterLink" 
                  placeholder="Twitter URL"
                  {...register('twitterLink')}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="LinkedIn"
                  name="linkedInLink" 
                  placeholder="LinkedIn URL"
                  {...register('linkedInLink')}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="GitHub"
                  name="gitHubLink" 
                  placeholder="GitHub URL"
                  {...register('gitHubLink')}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Instagram"
                  name="instagramLink" 
                  placeholder="Instagram URL"
                  {...register('instagramLink')}
                />
              </div>
            </div>

            <Input
              label="Behance"
              name="behanceLink" 
              placeholder="Behance URL"
              {...register('behanceLink')}
            />

            <Button type="submit" label="Submit" className="btn-primary me-2" loading={loading} />
            <Button type="reset" label="Cancel" className="btn-light" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserReg;
