import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import $ from 'jquery';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFileUpload } from 'use-file-upload';
import { withRouter } from 'react-router-dom';



function Company_edit(props) {


  const [file, selectFile] = useFileUpload();
  const [company, setCompany] = useState([]);
  const [picture, setPicture] = useState([]);
  const [error_list, setError] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handeInput = (e) => {
    e.persist();
    setCompany({ ...company, [e.target.name]: e.target.value });

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
    //console.log(filename);
    //console.log(type);
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
  }

  const getCompany = () => {
    const company_id = props.match.params.id;
    axios.get(`/api/edit_company/${company_id}`).then(res => {
      //console.log(res.data.company);
      if (res.data.status === 200) {
        setCompany(res.data.company);

      } else if (res.data.status === 404) {
        swal('error', res.data.message, 'error');
        history.push('/admin/view_employee');

        // window.location.href='/admin/view_employee';
      }
    });

  }
  useEffect(() => {
    getCompany();
  }, [props.match.params.id])


  if (company.company_logo) {
    var defaultSrc = `/company/${company.company_logo}`;
  } else {
    var defaultSrc = "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

  }

  const submitCompany = (e) => {
    e.preventDefault();
    const company_id = props.match.params.id;
    const formData = new FormData();
    if (picture != '') {
      formData.append('company_logo', picture);
    }
    formData.append('company_legal_name', company.company_legal_name);
    formData.append('company_popular_name', company.company_popular_name);
    formData.append('company_url', company.company_url);
    formData.append('about_company', company.about_company);
    // formData.append('call_action1', company.call_action1);
    // formData.append('call_action', company.call_action);

    axios.post('api/update_company/' + company_id, formData).then(res => {
      if (res.data.status === 200) {


        swal("Success", res.data.message, "success");
        getCompany();
        setError([]);


      } else {
        console.log(res.data.validation_errors);
        setError(res.data.validation_errors);
      }

    });


  }

  return (<div className='container-fluid paddingRight mt-4'>
    <div className='row'>
      <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
        <div className='row'>
          <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL active'><a>Edit Company</a></div>

        </div>

      </div>
    </div>
    <div className='row'>
      <div className='col-12 MainBoxC-details'>
        <div className='row'>
          <div className='col-12'>
            <form onSubmit={submitCompany} encType="multipart/form-data" id="from_company">
              {/* Company legal name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="Company Name" className="labelStyle">Company Legal Name</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox InputHeight">
                  <div className="input-group InputBox">
                    <input type="text"
                      name="company_legal_name"
                      value={company.company_legal_name}
                      onChange={handeInput}
                      placeholder='Ex : Prognomic Business Solutions Private Limited'
                      className="form-control" id="comp_pn" />

                  </div>
                </div>
              </div>
              {/* Comapny Popular Name */}
              <div className="row mb-3">
                <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                  <label htmlFor="company popular name" className="labelStyle">Company Popular Name</label>

                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-center InputBox InputHeight">
                  <input type="text"
                    name="company_popular_name"
                    value={company.company_popular_name}
                    onChange={handeInput}
                    placeholder='Ex : Kamaao Jobs'
                    className="form-control" id="comp_pn" />
                </div>

              </div>

              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                  {/* Website URL  */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Website Url" className=" labelStyle">Website Url</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                        name="company_url"
                        value={company.company_url}
                        onChange={handeInput}
                        placeholder='Ex : https//www.kamaao.app/home Url'
                        className="form-control" id="url" />
                    </div>

                  </div>
                  {/* Company Logo */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="Company Logo" className="labelStyle">Company Logo</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight">
                      <input onChange={handeImage} type="file" className="form-control" name="company_logo" />

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
                  <label htmlFor="About Company" className="labelStyle">About Company</label>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 InputBox">
                  <textarea
                    name="about_company"
                    value={company.about_company}
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

export default withRouter(Company_edit);