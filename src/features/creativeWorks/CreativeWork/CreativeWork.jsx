import "./CreativeWorkCSS.css";
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../componants/formCompo/Input';
import Button from '../../../componants/formCompo/Button';
import TextArea from '../../../componants/formCompo/TextArea';
import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import creativeWorkService from './CreativeWorkService';
import Dropdown from '../../../componants/formCompo/Dropdown';
import WorkCategoryService from '../workCategories/WorkCategoriesService'; 
import DynamicTable from '../../../componants/tables/DynamicTable';
import { SweetToast } from "../../../componants/toastAlert/TostAlert";
 
 

function CreativeWork() {

  const [loading, setLoading]  = useState(false); 
  const [workCategories, setWorkCategories] = useState([]);
  const [creativeWorks, setCreativeWorks] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(0);
  const [tagsList, setTagsList] = useState([]);
  const userId = useSelector((state) => state.auth.userId);
  const {register, handleSubmit,reset, setValue,watch} = useForm({
    defaultValues: {
      description: '',
      tags: ''  
    }
  });

  const SubmitCreativeWorks = async (data) => {

    const formData = new FormData();

    formData.append("Id", editId);
    formData.append("Title", data.title);
    formData.append("Description", data.description);
    formData.append("Tags", tagsList.join(", "));
    formData.append("WorkCategoryId", data.workCategoryId);
    formData.append("UserId", userId);

    // 🔥 IMPORTANT: name MUST match backend property
    if (data.formFile && data.formFile.length > 0) {
      formData.append("FormFile", data.formFile[0]);
    }

    console.log([...formData.entries()]); // debug

    // const payload = {
    //   ...data,
    //   id: editId,
    //   userId: userId || 0,   
    // };

    //console.log("Payload data :", payload);

    setLoading(true);
    try { 
      const response = await creativeWorkService.submitCreativeWork(formData);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchCreativeWork();  
          clearForm();
          break;

        case 2:
          SweetToast.success(message);  
          fetchCreativeWork();  
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

  // 🔹 Generate AI Content
  const formFile = watch("formFile");
  const handleGenerateAI = async () => {
    if (!formFile || formFile.length === 0) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", formFile[0]);
    console.log("Image file:", formFile?.[0]);

    try {
      setLoading(true); 
      const data = await creativeWorkService.getAIGeneratedData(formData); 
      console.log(data);
      setValue("title", data.title);
      setValue("description", data.description);
      setValue("tags", data.tags?.join(", "));

    } catch (error) {
      console.error(error);
      alert("Failed to generate AI content");
    } finally {
      setLoading(false);
    }
  }; 

  const clearForm = () => { 
    setEditId(0);
    setImagePreview(null);
    setTagsList([]);
    reset({
      title: "", 
      description: "",
      workCategoryId: "0",
      tags:"" 
    });
    setImagePreview(null);
  };

  //Edit Handler
  const handleEdit = (rowData) => {
    setEditId(rowData.id);
    reset(rowData);

      // 🔹 split comma-separated string → array
    if (rowData.tags) {
      setTagsList(
        rowData.tags.split(",").map(t => t.trim())
      );
    } else {
      setTagsList([]);
    }

      // 👇 show existing image from API
    if (rowData.imageURL) {
      setImagePreview(rowData.imageURL);
    } else {
      setImagePreview(null);
    }
  };

    //Delete Handler
  const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await creativeWorkService.deleteCreativeWork(id); 
      console.log("delete Response:", response);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchCreativeWork();  
          clearForm();
          break;

        case 0:
          SweetToast.success(message);  
          fetchCreativeWork(); 
          clearForm();
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchCreativeWork(); // ✅ refresh table
    } catch {
      SweetToast.error("Delete failed");
    }
  };

 // fetch Dropdown data
  const fetchWorkCategories = async () => {
    try {
      const response = await WorkCategoryService.getWorkCategoryInfo();
        
      setWorkCategories(response || []);
    } catch (error) {
      SweetToast.error("Failed to load details");
    }
  };

  //fetch table data
  const fetchCreativeWork = async () => {
    try {
      const response = await creativeWorkService.getCreativeWorkInfo();
      console.log("table data : ",response);
      setCreativeWorks(response || []);
    } catch (error) {
      SweetToast.error("Failed to load details");
    }
  };

  useEffect(() => { 
    if (formFile && formFile.length > 0) {
      const file = formFile[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } 
    fetchWorkCategories();
    fetchCreativeWork();
    //setValue("tags", tagsList.join(", "));
  }, [formFile]);



  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      const value = e.target.value.trim();
      if (!value) return;

      if (!tagsList.includes(value)) {
        setTagsList([...tagsList, value]);
      }

      e.target.value = "";
    }
  };

  const removeTag = (tag) => {
    setTagsList(tagsList.filter((t) => t !== tag));
  };

  
  return (
    <> 
      <div className="col-md-10 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Work Detail</h4>
            <form className="forms-sample" onSubmit={handleSubmit(SubmitCreativeWorks)}>
            <div className="col-md-12">
                <Dropdown
                  label="Select Work Category"
                  name="workCategoryId"
                  register={register}
                  options={workCategories}
                  required={true}
                  valueKey="id"
                  labelKey="categoryName"
                   
                /> 
            </div> 

              {/* <div className="row">
                <div className="col-md-9">
                  <Input
                    label="Image"
                    type="file"
                    name="formFile" 
                    placeholder="Image"
                    required
                    {...register('formFile',{
                      required:true,
                    })}
                  />
                </div>
                <div className="col-md-3"> 
                  <div className='form-group'>
                    <label>&nbsp;</label>
                    <Button
                      label="Generate Using AI"  
                      className='form-control btn btn-outline-secondary btn-fw' 
                      loading={loading}
                      onClick={handleGenerateAI}
                    />
                  </div> 
                </div>  
              </div>
              <div className='row'>
                {imagePreview && (
                  <div className="col-md-12 mt-2">
                    <label className="form-label">Image Preview</label>
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid #ddd"
                        }}
                      />
                    </div>
                  </div>
                )}  
              </div>  */}
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                <label className="form-label">Upload Image</label>

                <div className="image-upload-wrapper">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="d-none"
                    {...register("formFile", { required: editId === 0 })}
                  />

                  {!imagePreview ? (
                    <label htmlFor="imageUpload" className="upload-box">
                      <i className="mdi mdi-cloud-upload-outline upload-icon"></i>
                      <p className="mb-1">Click to upload image</p>
                      <small>PNG, JPG, JPEG</small>
                    </label>
                  ) : (
                    <div className="preview-box">
                      <img src={imagePreview} alt="Preview" />

                      <div className="preview-overlay">
                        <label htmlFor="imageUpload" className="btn btn-sm btn-light">
                          Change
                        </label>

                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            setImagePreview(null);
                            setValue("formFile", null);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <Input
                  label="Title"
                  type="text"
                  name="title" 
                  placeholder="Title"
                  {...register('title')}

                />
              </div>   
              <div className="col-md-12">
                  <TextArea
                      label="Description"
                      name="description" 
                      rows={2}
                      placeholder="Description"
                      {...register('description')}

                    /> 
              </div>
              {/* <div className="col-md-12">
                <Input
                  label="Tags"
                  type="text"
                  name="tags" 
                  placeholder="Tags"
                  {...register('tags')}

                />
              </div> */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                <label>Tags</label>

                <div className="tags-input-wrapper">
                  {tagsList.map((tag, index) => (
                    <span className="tag-pill" key={index}>
                      {tag}
                      <i
                        className="mdi mdi-close ms-1"
                        onClick={() => removeTag(tag)}
                      ></i>
                    </span>
                  ))}

                  <input
                    type="text"
                    className="tag-input form-control"
                    placeholder="Type tag & press Enter"
                    onKeyDown={handleTagKeyDown}
                  />
                </div> 
                </div>
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
                title="Creative Work Details"
                data={creativeWorks}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hiddenColumns={["id", "userId", "formFile", "relativeURL", "workCategoryId"]}
                imageColumns={["imageURL"]}  
                columnLabels={{
                  imageURL: "IMAGE" 
                }}
              />
          </div>
        </div>  
      </div> 
    </>
  )
}

export default CreativeWork
