import React from 'react'
import { useForm, useFieldArray } from "react-hook-form";
import Input from '../../componants/formCompo/Input.jsx'; 
import Button from '../../componants/formCompo/Button.jsx'; 
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SweetToast } from '../../componants/toastAlert/TostAlert.jsx';
import projectService from './ProjectService.js';
import DynamicTable from '../../componants/tables/DynamicTable.jsx';
 

function Projects() {
  const {register, handleSubmit, reset,control, watch} = useForm({
    defaultValues: {
      features: [{ feature: "" }]
      
    }
  });
  const [loading, setLoading]  = useState (false);
  const [editId, setEditId] = useState(0);
  const [projectInfo, setProjectInfo] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features"
  });

    const normalizePayload = (data) => ({
    ...data, 
    features: data.features?.filter(a => a.feature?.trim()), // remove empty achievements
  });

  const SubmitProjects = async (data) => {
    const payload = normalizePayload({
      ...data,
      id: editId,
      userId: userId || 0,   
    });

    setLoading(true);
    try{
      const response = await projectService.submitProject(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchProjectInfo();  
          clearForm();
          setEditId(0);
          break;

        case 2:
          SweetToast.success(message);  
          fetchProjectInfo(); 
          clearForm();
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

    console.log("payload data",payload);  
  };

  const handleEdit = (rowData) => {
    console.log("Edit clicked:", rowData);
    setEditId(rowData.id); 

    reset({
      ...rowData,
      features: rowData.features?.length
        ? rowData.features
        : [{ feature: "" }]
    });
     
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await projectService.deleteProject(id);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchProjectInfo();  
          clearForm(); 
          break;

        case 0:
          SweetToast.success(message);  
          fetchProjectInfo();  
          clearForm(); 
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchProjectInfo();  
    } catch {
      SweetToast.error("Delete failed");
    }
  };

  const fetchProjectInfo = async () => {
    try {
      const data = await projectService.getProjectInfo();
      setProjectInfo(data);
    } catch (error) {
      SweetToast.error(error.response?.data?.message || "Failed to fetch project info.");
    } 
  };

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  const clearForm = () => {
    reset({
      projectName: "",
      shortDescription: "",
      gitHubLink: "",
      liveLink: "",
      demoLink: "",
      sequenceNo: "",
      techStack: "", 
      features: [{ feature: "" }] // 🔥 IMPORTANT
    });
    setEditId(0);
  }


  return (
    <>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Projects</h4>
            <form className="forms-sample" onSubmit={handleSubmit(SubmitProjects)}>

              <div className="row">
                <div className="col-md-6">
                  <Input
                    label="Project Name"
                    name="projectName" 
                    placeholder="Project Name"
                    required
                    {...register('projectName',{
                      required:true,
                    })}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Short Description"
                    type="text"
                    name="shortDescription" 
                    placeholder="Short Description"
                    required
                    {...register('shortDescription',{
                      required:true,
                    })}
                  />
                </div>  
              </div>  

              <div className="row">
                <div className="col-md-4">
                  <Input
                    label="GitHub"
                    name="gitHubLink" 
                    placeholder="GitHub URL"
                    {...register('gitHubLink')}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Live Link"
                    name="liveLink" 
                    placeholder="Live Link"
                    {...register('liveLink')}
                  />
                </div>
                <div className="col-md-4">
                  <Input
                    label="Demo Link"
                    name="demoLink" 
                    placeholder="Demo Link"
                    {...register('demoLink')}
                  />
                </div>              
              </div>  
  
              <div className="row">  
                <div className="col-md-3">
                  <Input
                    label="Sequence No" 
                    type="number"
                    name="sequenceNo" 
                    placeholder="Sequence No" 
                    {...register('sequenceNo')}

                  />
                </div>       
                <div className="col-md-9">
                  <Input
                    label="TechStack Used"
                    type="text"
                    name="techStack" 
                    placeholder="TechStack Used" 
                    {...register('techStack')}

                  />
                </div> 
                    
              </div>



              <div className='row'>
                <div className="col-md-12">
                  <label className="form-label">Description/Feature Points</label>

                  {fields.map((item, index) => (
                    <div className="row" key={item.id}>
                      <div className="col-md-10">
                        <Input
                          placeholder={`Feature ${index + 1}`}
                          {...register(`features.${index}.feature`, { required: true })}
                        />
                      </div>
                      <div className="col-md-2"> 
                          {/* ➕ Add button */}
                          <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={() => append({ feature: '' })}
                          >
                            +
                          </button>
        
                          {/* ➖ Remove button (hide for first row) */}
                          {fields.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger me-2"
                              onClick={() => remove(index)}
                            >
                              −
                            </button>
                          )}
                      </div>
                    </div>
                  ))}
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

      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body"> 
              <DynamicTable
                title="Project Details"
                data={projectInfo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hiddenColumns={["id", "userId", "gitHubLink", "liveLink", "demoLink", "features","techStack"]}
              />
          </div>
        </div>  
      </div>  
    </>
  )
}

export default Projects
