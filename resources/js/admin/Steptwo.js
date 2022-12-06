import React, { useState } from "react";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const Steptwo = ({ nextStep, handleFormData, prevStep, values }) => {
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
  <div className='col-4 buttoncolor active'><a>Company Details</a></div>
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
                  <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Company Legal Name</label>
                  <div className='col-7 InputBox'>
                    <div className="input-group">
                      <select className="custom-select" id="inputGroupSelect04" 
                       name="company_legal_name"
            value={values.company_legal_name}
            onChange={handleFormData}>
                        <option value='' >Ex : Prognomic Business Solutions Private Limited</option>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                      </select>
                    </div>
                    <span className="text-danger" id="#err_company_legal_name">{error_list.company_legal_name}</span>
                  </div>
                </div>
                {/* Comapny Popular Name */}
            

                
                <div className="row mb-3">
                  <label htmlFor="company popular name" className="col-sm-4 col-form-label labelStyle">Company Popular Name</label>
                  <div className="col-sm-7 InputBox">
                    <input type="text" name="company_popular_name"
                      placeholder='Ex : Kamaao Jobs'
                      value={values.company_popular_name}
                      onChange={handleFormData}
                      className="form-control" id="comp_pn" />
                    <span className="text-danger" id="#err_company_popular_name">{error_list.company_popular_name}</span>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-8'>
                    {/* Website URL  */}
                    <div className="row mb-3">
                      <label htmlFor="Website Url" className="col-sm-6 col-form-label labelStyle">Website Url</label>
                      <div className="col-sm-6 InputBox">
                        <input type="text" name="company_url"
                          placeholder='Ex : https//www.kamaao.app/home Url'
                          value={values.company_url}
                          onChange={handleFormData}
                          className="form-control" id="url" />
                        <span className="text-danger" id="#err_company_url">{error_list.company_url}</span>
                      </div>
                    </div>
                    {/* Company Logo */}
                    <div className="row mb-3">
                      <label htmlFor="Company Logo" className="col-sm-6 col-form-label labelStyle">Company Logo</label>
                      <div className="col-sm-6 InputBox">
                        <input type="file" name="company_logo"
                          placeholder='Ex : https//www.kamaao.app/home'
                          value={values.company_logo}
                          onChange={handeImage}
                          className="form-control" id="logo" />
                        <span className="text-danger" id="#err_company_logo">{error_list.company_logo}</span>
                      </div>
                    </div>
                  </div>
                  {/* image upload box */}
                  {(()=>{if(imageUrl!='') {
                return(<div className='col-2  mb-3'><p ><img src={imageUrl} className='imageUploadBox'/></p></div>)
                  }else {
                    return (
                      <div className='col-2 imageUploadBox mb-3'><p className='logoName'>Logo <br/> Preview </p></div>
                    )
                  }
      
                    })()}
                </div>
                {/* About Company */}
                <div className="row mb-3">
                  <label htmlFor="About Company" className="col-sm-4 col-form-label labelStyle">About Company</label>
                  <div className="col-sm-7 InputBox">
                    <textarea name="about_company"
                      placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                      onChange={handleFormData}
                      className="form-control" id="about_comp" rows="5" cols="5" value={values.about_company}>
                    </textarea>
                    <span className="text-danger" id="#err_about_company">{error_list.about_company}</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Call To Action</label>
                  <div className="col-sm-2 InputBox width20">

                    <select className="custom-select" id="inputGroupSelect04" 
                    value={values.call_action1}
                    onChange={handleFormData}
                    name="call_action1">
                      <option >Download Now</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <span className="text-danger" id="#err_call_action1">{error_list.call_action1}</span>
                  </div>
                  <div className="col-sm-4 InputBox margin-75">
                    <input type="text" name="call_action"
                      placeholder='CTA URL: https//asads'
                      value={values.call_action}
                      onChange={handleFormData}
                      className="form-control" id="cta" />
                    <span className="text-danger" id="#err_call_action">{error_list.call_action}</span>
                  </div>

                </div>
                
              </form>
            </div>
    
          </div>
          {/* Button section */}
          <div className='row'>
            <div className='col-12 button-box'>

              <div className='col-3'><button className='backgroung-gray' onClick={prevStep}>Back</button></div>
              <div className='col-3'><button className='backgroung-gray' onClick={nextStep}
              >Next</button></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Steptwo;
