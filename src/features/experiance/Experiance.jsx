import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Input from '../../componants/formCompo/Input.jsx'
import TextArea from '../../componants/formCompo/TextArea.jsx'
import Button from '../../componants/formCompo/Button.jsx'
import Checkbox from '../../componants/formCompo/Checkbox.jsx'
import { useState,useEffect } from 'react'
import experianceService from './ExperianceService.js'
import { useSelector } from 'react-redux'
import { SweetToast } from '../../componants/toastAlert/TostAlert.jsx'
import DynamicTable from '../../componants/tables/DynamicTable.jsx' 

function Experiance() {
  const {register, handleSubmit,reset,control,watch,setValue} = useForm({
    defaultValues: {
      achievements: [{ achievement: "" }],
      present: false
    }
  });
  const [loading, setLoading]  = useState (false);
  const [editId, setEditId] = useState(0);
  const [experianceInfo, setExperianceInfo] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements"
  });

  const normalizePayload = (data) => ({
    ...data,
    joiningYear: data.joiningYear === "" ? null : Number(data.joiningYear),
    releaseYear: data.releaseYear === "" ? null : Number(data.releaseYear),
    sequenceNo: data.sequenceNo === "" ? null : Number(data.sequenceNo),
    achievements: data.achievements?.filter(a => a.achievement?.trim()), // remove empty achievements
  });


  const SubmitExperiance = async (data) => {
    const payload = normalizePayload({
      ...data,
      id: editId,
      userId: userId || 0,   
    });

    setLoading(true);
    try{
      const response = await experianceService.submitExperiance(payload);
      console.log("API Response:", response);
      const { res, message } = response;

      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchExperiance();  
          clearForm();
          setEditId(0);
          break;

        case 2:
          SweetToast.success(message);  
          fetchExperiance(); 
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
  }

  const handleEdit = (rowData) => {
    console.log("Edit clicked:", rowData);
    setEditId(rowData.id); 

    reset({
      ...rowData,
      achievements: rowData.achievements?.length
        ? rowData.achievements
        : [{ achievement: "" }]
    });
     
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try { 
      const response = await experianceService.deleteExperiance(id);
      const { res, message } = response;
      switch (res) {
        case 1:
          SweetToast.success(message);  
          fetchExperiance();  
          clearForm(); 
          break;

        case 0:
          SweetToast.success(message);  
          fetchExperiance();  
          clearForm(); 
          break;  

        default:
          SweetToast.error("Something went wrong.");
          break;
      } 
      fetchExperiance();  
    } catch {
      SweetToast.error("Delete failed");
    }
  };
 

  const fetchExperiance = async () => {
      try {
        const response = await experianceService.getExperianceInfo(); 
        setExperianceInfo(response || []);
      } catch (error) {
        SweetToast.error("Failed to load details");
      }
  };
  const isPresent = watch("present");
  useEffect(() => {
    if (isPresent) {
      setValue("releaseMonth", null);
      setValue("releaseYear", null);
    }
    fetchExperiance();
  }, [isPresent, setValue]);

  const clearForm = () => {
    reset({
      companyName: "",
      designation: "",
      joiningMonth: "",
      joiningYear: "",
      releaseMonth: "",
      releaseYear: "",
      present: false,
      city: "",
      state: "",
      country: "",
      companyAddress: "",
      sequenceNo: "",
      achievements: [{ achievement: "" }] // 🔥 IMPORTANT
    });

    setEditId(0);
  };

  return (
    <>
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Professional Experiance</h4>
            <form className="forms-sample" onSubmit={handleSubmit(SubmitExperiance)}>

              <div className="row">
                <div className="col-md-6">
                  <Input
                    label="Company Name"
                    name="companyName" 
                    placeholder="Company Name"
                    required
                    {...register('companyName',{
                      required:true,
                    })}
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    label="Designation"
                    type="text"
                    name="designation" 
                    placeholder="Designation"
                    required
                    {...register('designation',{
                      required:true,
                    })}
                  />
                </div>  
              </div> 
  

 
  
              <div className="row">
                <div className="col-md-3">
                  <Input
                    label="Joining Month"
                    name="joiningMonth"  
                    placeholder="Joining Month"
                    {...register('joiningMonth')}
                  />
                </div>
                <div className="col-md-2">
                  <Input
                    label="Joining Year"
                    name="joiningYear" 
                    type="number"
                    placeholder="Joining Year"
                    {...register('joiningYear')}

                  />
                </div>
                <div className="col-md-3">
                  <Input
                    label="Release Month" 
                    name="releaseMonth" 
                    placeholder="Release Month"
                    disabled={isPresent}
                    {...register('releaseMonth')}

                  />
                </div>       
                <div className="col-md-2">
                  <Input
                    label="Release Year"
                    type="number"
                    name="releaseYear" 
                    placeholder="Release Year"
                    disabled={isPresent}
                    {...register('releaseYear')}

                  />
                </div> 
                <div className="col-md-2"> 
                  <div className='form-group'>
                    <Checkbox
                      label="Present"
                      name="present"
                      register={register}
                    />
                  </div>

                </div>                    
              </div>

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
                      label="Company Address"
                      name="companyAddress" 
                      rows={2}
                      placeholder="Company Address"
                      {...register('companyAddress')}

                    /> 
              </div>
            </div>



            <div className="col-md-12">
              <label className="form-label">Description/Achievement Points</label>

              {fields.map((item, index) => (
                <div className="row" key={item.id}>
                  <div className="col-md-10">
                    <Input
                      placeholder={`Achievement ${index + 1}`}
                      {...register(`achievements.${index}.achievement`, { required: true })}
                    />
                  </div>
                  <div className="col-md-2"> 
                      {/* ➕ Add button */}
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => append({ achievement: '' })}
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
                title="Experiance Details"
                data={experianceInfo}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hiddenColumns={["id", "userId", "companyAddress", "isActive", "joiningYear", "joiningMonth", "present", "achievements", "releaseMonth", "releaseYear", "createdDate"]}
              />
          </div>
        </div>  
      </div>  
    </>
  )
}

export default Experiance
