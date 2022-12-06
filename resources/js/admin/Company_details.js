import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import $ from 'jquery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFileUpload } from 'use-file-upload';
import Breadcrums from "./Breadcrums";
import { Dashboard } from '@material-ui/icons';


function Company_details() {
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

  // const schema = yup.object().shape({
  //   company_legal_name: yup.string().required(),
  //   company_popular_name: yup.string().required(),

  //   company_url: yup.string().required(),

  //   about_company: yup.string().required(),
  //   call_action1: yup.string().required(),
  //   call_action: yup.string().required(),
  // }).required();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    // resolver: yupResolver(schema),

  });

  const [file, selectFile] = useFileUpload();
  const [error_list, setError] = useState([]);
  const [imageUrl, setImageUrl] = useState("");


  const handeImage = (e) => {
    const filename = e.target.files[0];
    const type = filename.name.split('.').pop();
    if (type != 'jpeg' && type != 'png' && type != 'jpg') {
      setError({ image_type: 'image must be jpeg & png type' });

    } else {
      setError([]);

    }
    //console.log(filename);
    //console.log(type);
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
  }

  const submitCompany = (data, e) => {
    //console.log(data);

    const formData = new FormData();

    formData.append('company_logo', data.company_logo[0]);
    formData.append('company_legal_name', data.company_legal_name);
    formData.append('company_popular_name', data.company_popular_name);
    formData.append('company_url', data.company_url);
    formData.append('about_company', data.about_company);
    // formData.append('call_action1', data.call_action1);
    // formData.append('call_action', data.call_action);

    axios.post('api/add_company', formData).then(res => {
      if (res.data.status === 200) {

        setImageUrl("");
        e.target.reset();
        swal("Success", res.data.message, "success");

        setError([]);


      } else {
        console.log(res.data.validation_errors);
        setError(res.data.validation_errors);
      }

    }, [reset]);


  }

  return (
  
  <div className='container-fluid paddingRight'>
    <Breadcrums name='Add Company'/>
    <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL active'><a>Company Details</a></div>

        </div>

      </div>
    </div>
    <div className='row'>
      <div className='col-12 MainBoxC-details'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={handleSubmit(submitCompany)} encType="multipart/form-data" id="from_company">
              {/* Company legal name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="Company Name" className="labelStyle">Company Legal Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox InputHeight">
                  <div className="input-group">
                    <input type="text"
                      {...register("company_legal_name", { required: 'Company Legal Name is required' })}
                      placeholder='Ex : Prognomic Business Solutions Private Limited'
                      className="form-control" id="comp_pn" />

                  </div>
                  {errors.company_legal_name && <span className='text-danger'>{errors.company_legal_name?.message}</span>}
                </div>
              </div>
              {/* Comapny Popular Name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="company popular name" className="labelStyle">Company Popular Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputHeight InputBox">
                  <input type="text"
                    {...register("company_popular_name", { required: 'Company Popular Name is required' })}
                    placeholder='Ex : Kamaao Jobs'
                    className="form-control" id="comp_pn" />
                     {errors.company_popular_name && <span className='text-danger'> {errors.company_popular_name?.message}</span>}

                </div>
               
              </div>

              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                  {/* Website URL  */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className="labelStyle">Website Url</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        {...register("company_url", { required: 'Website Url is required' })}
                        placeholder='Ex : https//www.kamaao.app/home Url'
                        className="form-control" id="url" />
                         {errors.company_url && <span className='text-danger'>{errors.company_url?.message} </span>}
                    </div>                 

                  </div>
                  {/* Company Logo */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Company Logo" className="labelStyle">Company Logo</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input {...register("company_logo", { required: 'company logo is required' })} onChange={handeImage} type="file" className="form-control" name="company_logo" />
                   
                      {errors.company_logo && <span className='text-danger'> {errors.company_logo?.message} </span>}
                    <span className='text-danger'>{error_list.image_type}</span>
                    </div>

                  </div>
                </div>
                {/* image upload box */}

                <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-3'><p ><img src={imageUrl || defaultSrc} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>
              </div>
              {/* About Company */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                  <label htmlFor="About Company" className="labelStyle">About Company</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox">
                  <textarea
                    {...register("about_company", { required: 'About Company details is required' })}

                    placeholder='Ex : Eleifend llicitudin curae vitae quam netuss viverra eleifend nt tristique lectus!'

                    className="form-control" id="about_comp" rows="5" cols="5" ></textarea>
                      {errors.about_company && <span className='text-danger'>{errors.about_company?.message}</span>}
                </div>              
              </div>
             

              {/* Button section */}
              <div className='row'>
                <div className='col-12 button-box'>

               <button type="submit" className='backgroung-orange'>Submit</button>
                </div>

              </div>
            </form>

          </div>
        </div>

      </div>
    </div>
  </div>);

}

export default Company_details;