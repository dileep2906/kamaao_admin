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


function Add_Hot_Offer() {
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

  
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

  const submitOffer = (data, e) => {
    //console.log(data);

    const formData = new FormData();

    formData.append('offer_logo', data.offer_logo[0]);
    formData.append('offer_legal_name', data.offer_legal_name);
    formData.append('offer_popular_name', data.offer_popular_name);
    formData.append('offer_price', data.offer_price);
    formData.append('about_offer', data.about_offer);
    formData.append('actual_price', data.actual_price);
    // formData.append('call_action', data.call_action);

    axios.post('api/add_offer', formData).then(res => {
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
    <Breadcrums name='Add Hot Offer'/>
    <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL active'><a>Hot Offer Details</a></div>

        </div>

      </div>
    </div>
    <div className='row'>
      <div className='col-12 MainBoxC-details'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={handleSubmit(submitOffer)} encType="multipart/form-data" id="from_company">
              
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="Offer Name" className="labelStyle">Offer Legal Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox InputHeight">
                  <div className="input-group">
                    <input type="text"
                      {...register("offer_legal_name", { required: 'Offer Legal Name is required' })}
                      placeholder='Ex : Prognomic Business Solutions Private Limited'
                      className="form-control" id="comp_pn" />

                  </div>
                  {errors.offer_legal_name && <span className='text-danger'>{errors.offer_legal_name?.message}</span>}
                </div>
              </div>
              {/* Comapny Popular Name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="offer popular name" className="labelStyle">Offer Popular Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputHeight InputBox">
                  <input type="text"
                    {...register("offer_popular_name", { required: 'Offer Popular Name is required' })}
                    placeholder='Ex : Kamaao Jobs'
                    className="form-control" id="comp_pn" />
                     {errors.offer_popular_name && <span className='text-danger'> {errors.offer_popular_name?.message}</span>}

                </div>
               
              </div>

              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                  {/* Website URL  */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className="labelStyle">Actual Price</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        {...register("actual_price", { required: 'Actual Price required' })}
                        placeholder='Ex : 1000...'
                        className="form-control" id="url" />
                         {errors.actual_price && <span className='text-danger'>{errors.actual_price?.message} </span>}
                    </div>                 

                  </div>

                  {/* Offer Price */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className="labelStyle">Offer Price</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        {...register("offer_price", { required: 'Offer Price is required' })}
                        placeholder='Ex : 1000...'
                        className="form-control" id="url" />
                         {errors.offer_price && <span className='text-danger'>{errors.offer_price?.message} </span>}
                    </div>                 

                  </div>
                  {/* Company Logo */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Offer Logo" className="labelStyle">Offer Logo</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input {...register("offer_logo", { required: 'Offer logo is required' })} onChange={handeImage} type="file" className="form-control" name="offer_logo" />
                   
                      {errors.offer_logo && <span className='text-danger'> {errors.offer_logo?.message} </span>}
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
                  <label htmlFor="About Offer" className="labelStyle">About Offer Details</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox">
                  <textarea
                    {...register("about_offer", { required: 'About Offer details is required' })}

                    placeholder='Ex : Eleifend llicitudin curae vitae quam netuss viverra eleifend nt tristique lectus!'

                    className="form-control" id="about_comp" rows="5" cols="5" ></textarea>
                      {errors.about_offer && <span className='text-danger'>{errors.about_offer?.message}</span>}
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

export default Add_Hot_Offer;