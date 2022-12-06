import axios from 'axios';
import  React, { useState ,useEffect} from 'react';
import swal from 'sweetalert';
import $ from 'jquery';
import { useForm } from 'react-hook-form';

function Demo(){
    const [picture ,setPicture]= useState([]);
    const [error_list ,setError]= useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

    const submitCompany =(e)=>{
        e.preventDefault();
          const formData = new FormData();
          formData.append('company_logo',picture.company_logo);
          formData.append('company_legal_name',companyInput.company_legal_name);
          formData.append('company_popular_name',companyInput.company_popular_name);
          formData.append('company_url',companyInput.company_url);
          formData.append('about_company',companyInput.about_company);
          formData.append('call_action1',companyInput.call_action1);
          formData.append('call_action',companyInput.call_action);
          if(companyInput.company_legal_name==''){
            $("#err_company_legal_name").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Company Legal Name is required</div>");
          }else if(companyInput.company_popular_name==''){
            $("#err_company_popular_name").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Company Popular l Name is required</div>");
    
          }
          else{
        axios.post('api/add_company',formData ).then(res=>{
          if(res.data.status ===200){
               
            swal("Success",res.data.message,"success");
    
              setError([]);
                
            // window.location.href="/admin/company_details";
    
             }else{
              console.log(res.data.validation_errors);
              setError(res.data.validation_errors);
             }
    
        });
      }
    }
    return( <div className='container paddingRight '>
    {/* <div className="card-header">    Company Details    </div> */}
    <div className='row'>
      <div className='col-6 detailsbutton'>
<div className='row'>
<div className='col-4 buttoncolor buttonRL active'><a>Company Details</a></div>

</div>

      </div>
    </div>
    <div className='row'>
      <div className='col-12 MainBoxC-details'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" id="from_company">
              {/* Company legal name */}
              <div className="row mb-3">
                <label htmlFor="Company Name" className="col-sm-4 col-form-label labelStyle">Company Legal Name</label>
                <div className='col-7 '>
                  <div className="input-group InputBox">
                    <select className="custom-select" id="inputGroupSelect04"
                    {...register("company_legal_name", { required: true })}  
                    //  name="company_legal_name"
                    >  <option value="">Ex : Prognomic Business Solutions Private Limited</option>
                      <option defaultValue="1">One</option>
                      <option defaultValue="2">Two</option>
                      <option defaultValue="3">Three</option>
                    </select>
                  </div>
                    {errors.company_legal_name && <span>This field is required</span>}
                </div>
              </div>
              {/* Comapny Popular Name */}
              <div className="row mb-3">
                <label htmlFor="company popular name" className="col-sm-4 col-form-label labelStyle">Company Popular Name</label>
                <div className="col-sm-7 InputBox">
                  <input type="text" 
                  {...register("company_popular_name", { required: true})}
                    placeholder='Ex : Kamaao Jobs'
                    className="form-control" id="comp_pn" />
                </div>
                {errors.company_popular_name && <span>This field is required</span>}

              </div>

              <div className='row'>
                <div className='col-8'>
                  {/* Website URL  */}
                  <div className="row mb-3">
                    <label htmlFor="Website Url" className="col-sm-6 col-form-label labelStyle">Website Url</label>
                    <div className="col-sm-6 InputBox">
                      <input type="text" name="company_url"
                        placeholder='Ex : https//www.kamaao.app/home Url'
                        className="form-control" id="url" />
                    </div>
                  </div>
                  {/* Company Logo */}
                  <div className="row mb-3">
                    <label htmlFor="Company Logo" className="col-sm-6 col-form-label labelStyle">Company Logo</label>
                    <div className="col-sm-6 InputBox">
                      <input type="file" name="company_logo"
                        placeholder='Ex : https//www.kamaao.app/home'
                         className="form-control" id="logo" />
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
                   
                    className="form-control" id="about_comp" rows="5" cols="5" ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="Call To Action" className="col-sm-4 col-form-label labelStyle">Call To Action</label>
                <div className="col-sm-2 InputBox width20">

                  <select className="custom-select" id="inputGroupSelect04" 
                 
                  name="call_action1">
                    <option >Download Now</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-sm-4 InputBox margin-75">
                  <input type="text" name="call_action"
                    placeholder='CTA URL: https//asads'
                    className="form-control" id="cta" />
                </div>

              </div>
              {/* Button section */}
              <div className='row'>
                  <div className='col-12 button-box'>
      
                    <div className='col-3'><button type="submit" className='backgroung-gray'>Submit</button></div>
                  </div>
      
                </div>
            </form>

          </div>
        </div>
        
      </div>
    </div>
  </div>);
}

export default Demo;