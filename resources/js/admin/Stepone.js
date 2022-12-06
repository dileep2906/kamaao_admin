import React,{useState } from "react";
import validator from "validator";
const Stepone = ({ nextStep, handleFormData, values }) => {
    //creating error state for validation
    const [error, setError] = useState(false);
  
    // after form submit validating the form data using validator
    const submitFormData = (e) => {
      e.preventDefault();
  
      // checking if value of first name and last name is empty show error else take to step 2
      if (
        validator.isEmpty(values.firstName) ||
        validator.isEmpty(values.lastName)
      ) {
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
  <div className='col-4 buttoncolor buttonRL active'><a >Job Details</a></div>
  <div className='col-4 buttoncolor'><a>Company Details</a></div>
  <div className='col-4 buttoncolor buttonRR'><a>Requirements</a></div>
</div>

        </div>
      </div>
      <div className='row'>
        <div className='col-12 MainBoxC-details'>
          <div className='row'>
            <div className='col-12'>
              <form onSubmit={submitFormData} encType="multipart/form-data" id="from_company">
                {/* Company legal name */}
                <div className="row mb-3">
                  <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Job Title</label>
                  <div className='col-7 InputBox'>
                    <div className="input-group">
                    <input type="text" name="job_title"
                      placeholder='Ex :Jobs Title'
                      defaultValue={values.job_title}
                      onChange={handleFormData}
                      className="form-control"
                      id='job_title'/>
                  </div>
                  </div>
                </div>
                {/* Comapny Popular Name */}
                <div className="row mb-3">
                  <label htmlFor="company popular name" className="col-sm-4 col-form-label labelStyle">Sub Title</label>
                  <div className="col-sm-7 InputBox">
                    <input type="text" name="sub_title"
                      placeholder='Ex :Sub Title'
                      value={values.sub_title}
                      onChange={handleFormData}
                      className="form-control" id="comp_pn" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Job Type and Category</label>
                  <div className="col-sm-2 InputBox width20">

                    <select className="custom-select" id="inputGroupSelect04"
                       value={values.job_type}
                      onChange={handleFormData} name='job_type'>
                      <option >Job Type</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Full Time">Full Time</option>
                    </select>
                  </div>
                  <div className="col-sm-4 InputBox margin-75">
                  <select className="custom-select" id="inputGroupSelect04"
                  defaultValue={values.job_category}
                  onChange={handleFormData} 
                  name='job_category'>
                      <option >Select Category</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Expiry Date and Total Openings</label>
                  <div className="col-sm-2 InputBox width20">
                  <input type="date" name="expiry_date"
                      placeholder='Select Date'
                      value={values.expiry_date}
                      onChange={handleFormData}
                      className="form-control" id="comp_pn" />
                  
                    
                  </div>
                  <div className="col-sm-4 InputBox margin-75">
                  <input type="number" name="total_openings"
                      placeholder='Total Openings'
                      value={values.total_openings}
                      onChange={handleFormData}
                      className="form-control" id="total_openings" />
                  
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Salary Range</label>
                  <div className="col-sm-2 InputBox width20">
                  <input type="number" name="salary_min"
                      placeholder='Minimum'
                      value={values.salary_min}
                      onChange={handleFormData}
                      className="form-control" id="comp_pn" />
                  
                    
                  </div>
                  <div className="col-sm-4 InputBox margin-75">
                  <input type="number" name="salary_max"
                      placeholder='Maximum'
                      value={values.salary_max}
                      onChange={handleFormData}
                      className="form-control" id="salary_max" />
                  
                  </div>

                </div>
                <div className="row mb-3">
                  <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Location</label>
                  <div className="col-sm-2 InputBox width20">
                  <select className="custom-select" id="inputGroupSelect04"
                       value={values.state}
                      onChange={handleFormData} name='state'>
                      <option >State</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>   
                  </div>
                  <div className="col-sm-2 InputBox margin-75">
                  <select className="custom-select" id="inputGroupSelect04"
                       value={values.city}
                      onChange={handleFormData} name='city'>
                      <option >City</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <div className="col-sm-2 InputBox margin-75">
                  <select className="custom-select" id="inputGroupSelect04"
                       value={values.area}
                      onChange={handleFormData} name='area'>
                      <option >Area</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                      <label htmlFor="Company Video" className="col-sm-4 col-form-label labelStyle">Description  Video</label>
                      <div className="col-sm-7 InputBox">
                        <input type="file" name="descri_video"
                          placeholder='Ex : https//www.kamaao.app/home'
                          value={values.descri_video}
                           onChange={handeVideo}
                          className="form-control" id="logo" />
                      </div>
                  </div>

                {/* About Company */}
                <div className="row mb-3">
                  <label htmlFor="About Company" className="col-sm-4 col-form-label labelStyle">Roles & Responsibilities</label>
                  <div className="col-sm-7 InputBox">
                    <textarea name="roles_responsibilities"
                      placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                      onChange={handleFormData}
                      className="form-control" id="about_comp" rows="5" cols="5" value={values.roles_responsibilities}>
                    </textarea>
                  </div>
                </div>
               
                
          {/* Button section */}
          <div className='row'>
            <div className='col-12 button-box'>
{/* 
              <div className='col-3'><button className='backgroung-gray' onClick={nextStep}
              >Next</button></div> */}
              <Button variant="primary" type="submit">
              Continue
            </Button>
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

  export default Stepone;
  