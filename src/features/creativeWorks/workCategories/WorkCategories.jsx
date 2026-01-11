import React from 'react'
import { useForm } from "react-hook-form";
import Input from "../../../componants/formCompo/Input.jsx"; 
import Button from "../../../componants/formCompo/Button.jsx"; 
import { SweetToast } from "../../../componants/toastAlert/TostAlert.jsx";
import { useState } from "react";
import DynamicTable from "../../../componants/tables/DynamicTable.jsx";
import { useEffect } from "react";
import WorkCategoryService from './WorkCategoriesService.js';
import { useSelector } from "react-redux";

function WorkCategories() {
  const {register, handleSubmit,reset} = useForm();
  const [loading, setLoading]  = useState (false);
  const [editId, setEditId] = useState(0);
  const [workCategorysInfo, setWorkCategoriesInfo] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  //Submit Handler
  const SubmitCategory = async (data) => {
    const payload = {
      ...data,
      id: editId,
      userId: userId || 0,   
    };

    setLoading(true);
    try { 
      const response = await WorkCategoryService.submitWorkCategory(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchWorkCategories();  
          clearForm();
          break;

        case 2:
          SweetToast.success(message);  
          fetchWorkCategories();  
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
  };

  //Edit Handler
  const handleEdit = (rowData) => {
    setEditId(rowData.id);
    reset(rowData);
  };

  //Delete Handler
  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await WorkCategoryService.deleteWorkCategory(id); 
      console.log("delete sAPI Response:", response);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchWorkCategories();  
          clearForm();
          break;

        case 0:
          SweetToast.success(message);  
          fetchWorkCategories(); 
          clearForm();
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchWorkCategories(); // ✅ refresh table
    } catch {
      SweetToast.error("Delete failed");
    }
  };

  //Fetch Work Categories
  const fetchWorkCategories = async () => {
    try {
      const response = await WorkCategoryService.getWorkCategoryInfo();
        
      setWorkCategoriesInfo(response || []);
    } catch (error) {
      SweetToast.error("Failed to load education details");
    }
  };
  useEffect(() => { 
    fetchWorkCategories();
  }, []);


  const clearForm = () => {
    reset({
      categoryName: "", 
      sequenceNo: ""
    }); 
    setEditId(0);
  };
  return (
    <>
      <div className="col-md-4 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Category</h4>
            <form className="forms-sample" onSubmit={handleSubmit(SubmitCategory)}>

              <div className="row">
                <div className="col-md-12">
                  <Input
                    label="Category Name"
                    name="categoryName" 
                    placeholder="Category Name"
                    required
                    {...register('categoryName',{
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
                title="Work Category Details"
                data={workCategorysInfo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hiddenColumns={["id", "userId"]}  
              />
          </div>
        </div>  
      </div>  
    </>
  )
}

export default WorkCategories
