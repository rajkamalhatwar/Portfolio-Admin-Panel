import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Input from '../../componants/formCompo/Input.jsx'
import TextArea from '../../componants/formCompo/TextArea.jsx'
import Button from '../../componants/formCompo/Button.jsx'
import Checkbox from '../../componants/formCompo/Checkbox.jsx'
import { useState,useEffect } from 'react'

function Experiance() {
  const {register, handleSubmit,reset,control,watch,setValue} = useForm({
    defaultValues: {
      Achievements: [{ achievement: "" }],
      present: false
    }
  });
  const [loading, setLoading]  = useState (false);
  const [editId, setEditId] = useState(0);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Achievements"
  });

  const SubmitExperiance = (data) => {
    setLoading(true);
    try {
      
    } catch (error) {
      
    }finally {
      setLoading(false);
    }
    console.log(data);
  }
  const isPresent = watch("present");
  useEffect(() => {
  if (isPresent) {
    setValue("releaseMonth", "");
    setValue("releaseYear", "");
  }
}, [isPresent, setValue]);
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
              <label className="form-label">Experinace Achievements Points</label>

              {fields.map((item, index) => (
                <div className="row" key={item.id}>
                  <div className="col-md-10">
                    <Input
                      placeholder={`Achievements ${index + 1}`}
                      {...register(`Achievements.${index}.achievement`, { required: true })}
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


  
  

              <Button type="submit" label="Submit" className="btn-primary me-2" loading={loading} />
              <Button type="reset" label="Cancel" className="btn-light" onClick={() => setEditId(0)}/>
            </form>
          </div>
        </div>
      </div>    
    </>
  )
}

export default Experiance
