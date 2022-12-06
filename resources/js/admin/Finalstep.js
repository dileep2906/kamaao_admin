import React, { useState } from "react";
import validator from "validator";

import MultiSelect from  'react-multiple-select-dropdown-lite';
import  'react-multiple-select-dropdown-lite/dist/index.css';

// creating functional component ans getting props from app.js and destucturing them
const Finalstep = ({ nextStep, handleFormData, prevStep, values }) => {
   
  const  skilloptions   = [
    { label:  'Option 1', value:  'option_1'  },
    { label:  'Option 2', value:  'option_2'  },
    { label:  'Option 3', value:  'option_3'  },
    { label:  'Option 4', value:  'option_4'  },
  ];
  const  docoptions   = [
    { label:  'Option 1', value:  'option_1'  },
    { label:  'Option 2', value:  'option_2'  },
    { label:  'Option 3', value:  'option_3'  },
    { label:  'Option 4', value:  'option_4'  },
  ];
   //creating error state for validation
  const [error, setError] = useState(false);

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (validator.isEmpty(values.age) || validator.isEmpty(values.email)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <div className='container paddingRight'>
              {/* <div className="card-header">    Company Details    </div> */}
              <div className='row'>
                <div className='col-6 detailsbutton'>
        <div className='row'>
          <div className='col-4 buttoncolor buttonRL'><a>Job Details</a></div>
          <div className='col-4 buttoncolor '><a>Company Details</a></div>
          <div className='col-4 buttoncolor buttonRR active'><a>Requirements</a></div>
        </div>
        
                </div>
              </div>
              <div className='row'>
                <div className='col-12 MainBoxC-details'>
                  <div className='row'>
                    <div className='col-12'>
                      <form onSubmit={submitFormData} encType="multipart/form-data" id="from_company">
                        {/* Minimum Education Required */}
                        <div className="row mb-3">
                          <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Minimum Education Required</label>
                          <div className='col-7 InputBox'>
                            <div className="input-group">
          
                              <select className="custom-select" id="inputGroupSelect04" 
                               name="mini_edu_req"
                                value={values.mini_edu_req}
                               onChange={handleFormData}>
                                <option >Ex : Prognomic Business Solutions Private Limited</option>
                                <option defaultValue="1">One</option>
                                <option defaultValue="2">Two</option>
                                <option defaultValue="3">Three</option>
                              </select>
                            </div>
                            <span className="text-danger" id="#err_mini_edu_req">{error_list.mini_edu_req}</span>
                          </div>
                        </div>
                       
                        <div className="row mb-3">
                          <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Experience & Skill Required</label>
                          <div className="col-sm-4 InputBox width20">
                          
                            <select className="custom-select" id="inputGroupSelect04" 
                               name="experience_req"
                                value={values.experience_req}
                               onChange={handleFormData}>
                                <option >Select Experience</option>
                                <option defaultValue="1">One</option>
                                <option defaultValue="2">Two</option>
                                <option defaultValue="3">Three</option>
                              </select>
                            
                            <span className="text-danger" id="#err_experience_req">{error_list.experience_req}</span>
                          </div>
                          <div className="col-sm-4 InputBox margin-75">
                          
                            <MultiSelect
                            className="custom-select"
                            onChange={handleFormData}
                            value={values.skill}
                            name="skill_req"
                            options={skilloptions}
                          />

                          <span style={{color:'red'}}> {values.skill}</span>
                          </div>
                         
                        </div>
                        {/* Minimum Education Required */}
                        <div className="row mb-3">
                          <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Documents Required</label>
                          <div className='col-7 InputBox'>
                            <div className="input-group">
                              <MultiSelect
                            className="custom-select"
                            onChange={handleFormData}
                            value={values.doc}
                            name="doc_req"
                            options={docoptions}
                          />
                            </div>
                          <span style={{color:'red'}}> {values.doc}</span>

                          </div>
                        </div>
                       
                       {/* Minimum Education Required */}
                       <div className="row mb-3">
                          <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Additional Requirements</label>
                          <div className='col-7 InputBox'>
                            <div className="input-group">
                            <input type="text" name="add_req"
                      placeholder='Type the name of requirements'
                      value={values.add_req}
                      onChange={handleFormData}
                      className="form-control" id="cta" />
                   
                            </div>
                            <span className="text-danger" id="#err_company_add_req">{error_list.add_req}</span>
                          </div>
                        </div>
                       
                        
                  {/* Button section */}

          <div className='row'>
                    <div className='col-12 button-box'>
        
                      <div className='col-3'><button className='backgroung-gray' onClick={prevStep}>Back</button></div>
                      <div className='col-3'><button type="submit" className='backgroung-gray'>Submit</button></div>
                    </div>
        
                  </div>

                      </form>
        
                    </div>
                  </div>
                 </div>
              </div>
            </div>
  );
};

export default Finalstep;
