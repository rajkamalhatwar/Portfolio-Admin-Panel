import React from 'react'
import DynamicTable from "../../componants/tables/DynamicTable.jsx";
import { useForm } from "react-hook-form";
import Input from "../../componants/formCompo/Input.jsx"; 
import Button from "../../componants/formCompo/Button.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SweetToast } from "../../componants/toastAlert/TostAlert.jsx";
import skillService from './SkillService.js';
 

export default function Skills() {
  const {register, handleSubmit,reset} = useForm({
    defaultValues: {
      skillName: '',
      outOf100: '',
      sequenceNo: ''

    }
  });
  const [loading, setLoading]  = useState (false);
  const userId = useSelector((state) => state.auth.userId);
  const [skillsInfo, setSkillsInfo] = useState([]);
  const [editId, setEditId] = useState(0);

  //Submit Handler
  const SubmitSkills = async (data) => {

    const payload = {
      ...data,
      id: editId,
      userId: userId || 0,   
    };

    setLoading(true);
    try {

      const response = await skillService.submitSkill(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchSkills();  
          clearForm();
          break;

        case 2:
          SweetToast.success(message);  
          fetchSkills();  
          clearForm(); 
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

  }

  //Table Handlers
  const handleEdit = (row) => {
    setEditId(row.id);
    reset(row);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await skillService.deleteSkill(id);
      console.log(id);
      console.log("delete sAPI Response:", response);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchSkills();  
          clearForm();
          break;

        case 0:
          SweetToast.success(message);  
          fetchSkills(); 
          clearForm();
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchSkills(); // ✅ refresh table
    } catch {
      SweetToast.error("Delete failed");
    }
  };

  const fetchSkills = async () => {
      try {
        const response = await skillService.getSkillInfo();
         
        setSkillsInfo(response || []);
      } catch (error) {
        SweetToast.error("Failed to load education details");
      }
  };
  useEffect(() => { 
    fetchSkills();
  }, []);

  const clearForm = () => {
    reset({
      skillName: "",
      outOf100: "",
      sequenceNo: ""
    }); 
    setEditId(0);
  };

  return (
    <>
    <div className="col-md-4 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Skills</h4>
          <form className="forms-sample" onSubmit={handleSubmit(SubmitSkills)}>

            <div className="row">
              <div className="col-md-12">
                <Input
                  label="Skill Name"
                  name="skillName" 
                  placeholder="Skill Name"
                  required
                  {...register('skillName',{
                    required:true,
                  })}
                />
              </div>
              <div className="col-md-12">
                <Input
                  label="Proficiency Level"
                  type="text"
                  name="outOf100" 
                  placeholder="Proficiency Level (out of 100)"
                  required
                  {...register('outOf100',{
                    required:true,
                  })}
                />
              </div> 
              <div className="col-md-12">
                 <Input
                  label="Sequence No"
                  type="text"
                  name="sequenceNo" 
                  placeholder="Sequence No"
                  required
                  {...register('sequenceNo',{
                    required:true,
                  })}
                />
              </div>               
            </div>   
 

            <Button type="submit" 
              label={editId > 0 ? "Update" : "Submit"} 
              className={editId > 0 ? "btn-warning me-2" : "btn-primary me-2"}
              loading={loading} />
            <Button type="reset" label="Cancel" className="btn-light" onClick={clearForm}/>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-8 grid-margin stretch-card">
      <div className="card">
        <div className="card-body"> 
            <DynamicTable
              title="Skills Details"
              data={skillsInfo}
              onEdit={handleEdit}
              onDelete={handleDelete}
              hiddenColumns={["id", "userId", "educationId"]}
            />
        </div>
      </div>  
    </div>  
    </>
  )
}
