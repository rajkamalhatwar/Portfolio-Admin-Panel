import React from "react";
import DynamicTable from "../../componants/tables/DynamicTable.jsx";
import { useForm } from "react-hook-form";
import Input from "../../componants/formCompo/Input.jsx";
import TextArea from "../../componants/formCompo/TextArea.jsx";
import Button from "../../componants/formCompo/Button.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SweetToast } from "../../componants/toastAlert/TostAlert.jsx";
import educationService from "./EducationService.js";

function Education() {
  const {register, handleSubmit,reset} = useForm(); 
  const [loading, setLoading]  = useState (false);
  const userId = useSelector((state) => state.auth.userId);
  const [educationInfo, setEducationInfo] = useState([]);
  const [editId, setEditId] = useState(0); 
  

  const SubmitEducation = async (data) => {
    const payload = {
      ...data,
      id: editId,
      userId: userId || 0,   
    };

    setLoading(true);
    try{
      const response = await educationService.submitEducation(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchEducation();  
          reset();
          setEditId(0);
          break;

        case 2:
          SweetToast.success(message);  
          fetchEducation(); 
          reset();
          setEditId(0);
          break;

        case 3:
          SweetToast.warning(message);  
          break;

        case 4:
          SweetToast.error(message); 
          break;

        default:
          SweetToast.error("Something went wrong.");
          break;
      }
    }catch (error) {
      SweetToast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }finally {
      setLoading(false);
    }

    console.log(payload);     
 
  };

  const handleEdit = (rowData) => {
    console.log("Edit clicked:", rowData);
    setEditId(rowData.id);
    reset(rowData); // ✅ prefills form
     
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await educationService.deleteEducation(id);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchEducation();  
          reset();
          setEditId(0);
          break;

        case 0:
          SweetToast.success(message);  
          fetchEducation();  
          reset();
          setEditId(0);
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchEducation();  
    } catch {
      SweetToast.error("Delete failed");
    }
  };
 
  const fetchEducation = async () => {
      try {
        const response = await educationService.getEductionInfo();
        console.log("Fetched Education Info:", response);
        setEducationInfo(response || []);
      } catch (error) {
        SweetToast.error("Failed to load education details");
      }
  };
  useEffect(() => { 
    fetchEducation();
  }, []);
  
 

  return (
    <>
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Education Information</h4>
          <form className="forms-sample" onSubmit={handleSubmit(SubmitEducation)}>

            <div className="row">
              <div className="col-md-4">
                <Input
                  label="Degree Name"
                  name="degreeName" 
                  placeholder="Degree Name eg : B.Tech, M.Tech, HSC, SSC"
                  required
                  {...register('degreeName',{
                    required:true,
                  })}
                />
              </div>
              <div className="col-md-4">
                <Input
                  label="Branch Name"
                  type="text"
                  name="branchName" 
                  placeholder="Branch Name eg : Computer Science, 12th, 10th"
                  required
                  {...register('branchName',{
                    required:true,
                  })}
                />
              </div> 
              <div className="col-md-4">
                <Input
                  label="College Name"
                  type="text"
                  name="collegeName" 
                  placeholder="College Name / School Name"
                  required
                  {...register('collegeName',{
                    required:true,
                  })}
                />
              </div>               
            </div> 
 

            <div className="row">
              <div className="col-md-6">
                <Input
                  label="Mark Type"
                  type="text"
                  name="markType"  
                  placeholder="Mark Type eg : CGPA, Percentage"
                  {...register('markType')}
                />
              </div>
              <div className="col-md-6">
                <Input
                  label="Marks"
                  type="text"
                  name="marks" 
                  placeholder="Marks"
                  {...register('marks')}

                />
              </div>
            </div>  
 
            <div className="row">
              <div className="col-md-3">
                <Input
                  label="Admission Month"
                  name="admissionMonth"  
                  placeholder="Admission Month"
                  {...register('admissionMonth')}
                />
              </div>
              <div className="col-md-3">
                <Input
                  label="Admission Year"
                  name="admissionYear" 
                  type="number"
                  placeholder="Admission Year"
                  {...register('admissionYear')}

                />
              </div>
              <div className="col-md-3">
                <Input
                  label="Passing Month" 
                  name="passingMonth" 
                  placeholder="Passing Month"
                  {...register('passingMonth')}

                />
              </div>       
              <div className="col-md-3">
                <Input
                  label="Passing Year"
                  type="number"
                  name="passingYear" 
                  placeholder="Passing Year"
                  {...register('passingYear')}

                />
              </div>                      
            </div>
            
            <div className="row">
            <div className="col-md-2">
              <Input
                label="Sequence No"
                type="number"
                name="sequenceNo" 
                placeholder="Sequence No"
                {...register('sequenceNo')}

              />
            </div>   
            <div className="col-md-10">
                <TextArea
                    label="College Address"
                    name="collegeAddress" 
                    rows={2}
                    placeholder="College Address"
                    {...register('collegeAddress')}

                  /> 
            </div>
          </div>

 
 

            <Button type="submit" label="Submit" className="btn-primary me-2" loading={loading} />
            <Button type="reset" label="Cancel" className="btn-light" onClick={() => setEditId(0)}/>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-12 grid-margin stretch-card">
      <div className="card">
        <div className="card-body"> 
            <DynamicTable
              title="Education Details"
              data={educationInfo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              hiddenColumns={["id", "userId", "createdDate", "skills", "isActive"]}
            />
        </div>
      </div>  
    </div>  

    </>
  );
}

export default Education;
