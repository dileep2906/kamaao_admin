import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import $ from 'jquery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFileUpload } from 'use-file-upload';
import { withRouter } from 'react-router-dom';



function Hotoffer_edit(props) {


  const [file, selectFile] = useFileUpload();
  const [hotoffer, setHotoffer] = useState([]);
  const [picture, setPicture] = useState([]);
  const [error_list, setError] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handeInput = (e) => {
    e.persist();
    setHotoffer({ ...hotoffer, [e.target.name]: e.target.value });

  }
  const handeImage = (e) => {
    const filename = e.target.files[0];
    setPicture(filename);
    const type = filename.name.split('.').pop();
    if (type != 'jpeg' && type != 'png' && type != 'jpg') {
      setError({ image_type: 'image must be jpeg & png type' });

    } else {
      setError([]);

    }
    console.log("filename ", filename);
    console.log("type ", type);
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
  }

  const getHotoffer = async () => {
    const hotoffer_id = await props.match.params.id;
    console.log("hot offer hotoffer_id", hotoffer_id);
    axios.get(`/api/edit_offer/${hotoffer_id}`).then(res => {
      console.log("hot offer", res.data.hot_offer);
      if (res.data.status === 200) {
        setHotoffer(res.data.hot_offer);

      } else if (res.data.status === 404) {
        swal('error', res.data.message, 'error');
        history.push('/admin/view_employee');

        // window.location.href='/admin/view_employee';
      }
    });

  }
  useEffect(() => {
    getHotoffer();
  }, [props.match.params.id])


  if (hotoffer.offer_logo) {
    var defaultSrc = `/offer/${hotoffer.offer_logo}`;
  } else {
    var defaultSrc = "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

  }

  
  const submitOffer = (e) => {
    e.preventDefault();
    const hotoffer_id = props.match.params.id;
    const formData = new FormData();
    if (picture != '') {
      formData.append('offer_logo', picture);
    }
    formData.append('offer_legal_name', hotoffer.offer_legal_name);
    formData.append('offer_popular_name', hotoffer.offer_popular_name);
    formData.append('offer_price', hotoffer.offer_price);
    formData.append('about_offer', hotoffer.about_offer);
    formData.append('actual_price', hotoffer.actual_price);
    // formData.append('call_action1', company.call_action1);
    // formData.append('call_action', company.call_action);

    axios.post('api/update_offer/' + hotoffer_id, formData).then(res => {
      if (res.data.status === 200) {


        swal("Success", res.data.message, "success");
        getCompany();
        setError([]);

      } else {
        console.log(res.data.validation_errors);
        setError(res.data.validation_errors);
      }

    });
    window.location.href='/admin/view_hot_offer';


  }


  return (<div className='container-fluid paddingRight mt-4'>
    <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL active'><a>Edit Hot Offer</a></div>

        </div>

      </div>
    </div>
    <div className='row'>
      <div className='col-12 MainBoxC-details'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={submitOffer} encType="multipart/form-data" id="from_company">
              {/* Company legal name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="Company Name" className="labelStyle">Hot Offer Legal Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox InputHeight">
                  <div className="input-group InputBox">
                    <input type="text"
                      name="offer_legal_name"
                      value={hotoffer.offer_legal_name}
                      onChange={handeInput}
                      placeholder='Ex : Prognomic Business Solutions Private Limited'
                      className="form-control" id="comp_pn" />

                  </div>
                </div>
              </div>
              {/* Comapny Popular Name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="company popular name" className="labelStyle">Hot Offer Popular Name</label>

                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-center InputBox InputHeight">
                  <input type="text"
                    name="offer_popular_name"
                    value={hotoffer.offer_popular_name}
                    onChange={handeInput}
                    placeholder='Ex : Kamaao Jobs'
                    className="form-control" id="comp_pn" />
                </div>

              </div>

              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                  {/* Actual Price  */}

                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className="labelStyle">Actual Price</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        name="actual_price"
                        value={hotoffer.actual_price}
                        onChange={handeInput}

                        placeholder='Ex : 1000...'
                        className="form-control" id="url" />

                    </div>

                  </div>

                  {/* Offer Price */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className="labelStyle">Offer Price</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        name="offer_price"
                        value={hotoffer.offer_price}
                        onChange={handeInput}

                        placeholder='Ex : 1000...'
                        className="form-control" id="url" />

                    </div>

                  </div>



                  {/* Company Logo */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Company Logo" className="labelStyle">Hot Offer Logo</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight">
                      <input onChange={handeImage} type="file" className="form-control" name="offer_logo" />

                    </div>

                    <span className='text-danger'>{error_list.image_type}</span>
                  </div>
                </div>
                {/* image upload box */}

                <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-3'><p ><img src={imageUrl || defaultSrc} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>
              </div>
              {/* About Company */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12'>
                  <label htmlFor="About Company" className="labelStyle">About Hot Offer</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox">
                  <textarea
                    name="about_offer"
                    value={hotoffer.about_offer}
                    onChange={handeInput}
                    placeholder='Ex : Eleifend llicitudin curae vitae quam netuss viverra eleifend nt tristique lectus!'

                    className="form-control" id="about_comp" rows="5" cols="5" ></textarea>
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
  </div>
  );

}

export default withRouter(Hotoffer_edit);