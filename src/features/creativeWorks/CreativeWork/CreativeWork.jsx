import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../../componants/formCompo/Input';
import Button from '../../../componants/formCompo/Button';
import TextArea from '../../../componants/formCompo/TextArea';
import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import creativeWorkService from './CreativeWorkService';

function CreativeWork() {

  const [loading, setLoading]  = useState(false);
  const [editId, setEditId] = useState(0);
  const userId = useSelector((state) => state.auth.userId);
  const {register, handleSubmit,reset, setValue,watch} = useForm({
    defaultValues: {
      description: '',
      tags: ''  
    }
  });

  const SubmitSkills = async (data) => {

    const payload = {
      ...data,
      id: editId,
      userId: userId || 0,   
    };

    setLoading(true);
    try { 
       console.log("payload data",payload); 
    }catch (error) {
      SweetToast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }finally {
      setLoading(false);
    }

  } 

  // 🔹 Generate AI Content
  const imageFile = watch("imageFile");
  const handleGenerateAI = async () => {
    if (!imageFile || imageFile.length === 0) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile[0]);
    console.log("Image file:", imageFile?.[0]);

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
  };
  
  return (
    <> 
      <div className="col-md-10 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Work Detail</h4>
            <form className="forms-sample" onSubmit={handleSubmit(SubmitSkills)}>

              <div className="row">
                <div className="col-md-9">
                  <Input
                    label="Image"
                    type="file"
                    name="imageFile" 
                    placeholder="Image"
                    required
                    {...register('imageFile',{
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
            <div className="col-md-12">
              <Input
                label="Tags"
                type="text"
                name="tags" 
                placeholder="Tags"
                {...register('tags')}

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
    </>
  )
}

export default CreativeWork
