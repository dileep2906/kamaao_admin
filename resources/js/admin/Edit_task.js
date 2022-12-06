import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

import $ from 'jquery';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// import RichTextEditor from 'react-rte';



function Edit_Task(props) {
  //state for steps
  const [step, setstep] = useState(1);

  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectcompany, setselectCompany] = useState('');

  const [companyResponse, setcompanyResponse] = useState([]);


  const handleselectcompany = val => {
    setselectCompany(val);
  }

  //Fetching Company
  useEffect(() => {
    axios.get('api/view_company').then((res) => {
      setcompanyResponse(res.data.company);

    })
  }, [])
  const companyOption = companyResponse.map((response) => (
    { label: response.company_legal_name, value: response.id }
  ))


  const [taskInput, setTask] = useState([]);
  const [picture, setPicture] = useState([]);
  const [error_list, setError] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [getCompany, fetchCompany] = useState({
    "company_legal_name": "",
    "company_popular_name": "",
    "company_url": "",
    "about_company": "",
    "call_action": "",
    "call_action1": "",
  });
  const handeInput = (e) => {
    e.persist();
    setTask({ ...taskInput, [e.target.name]: e.target.value });

  }
  console.log(taskInput);
  const selectcompanyname = (e) => {
    e.persist();
    fetchCompany({ ...getCompany, [e.target.name]: e.target.value });
    setTask({ ...taskInput, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (selectcompany.value > 0) {
      axios.get(`api/fetch_company/${selectcompany.value}`).then((res) => {
        console.log(res.data);
        fetchCompany(res.data);
        setLoading(false);

      })
    }
  }, [selectcompany])

  useEffect(() => {
    const task_id = props.match.params.id;
    axios.get(`/api/edit_task/${task_id}`).then(res => {
      console.log(res.data.task);
      if (res.data.status === 200) {
        setTask(res.data.task);

      } else if (res.data.status === 404) {
        swal('error', res.data.message, 'error');
        window.location.href = '/admin/company_view';
      }
    });

  }, [props.match.params.id])


  const handeImage = (e) => {
    setPicture(e.target.files[0]);
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
  }

  // function for going to next step by increasing step state by 1
  const nextStep = () => {

    setstep(step + 1);

  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  const submitCompany = (e) => {
    e.preventDefault();
    const task_id = props.match.params.id;
    const formData = new FormData();

    if (selectcompany != '') {
      formData.append('company_legal_name', selectcompany.label);
      formData.append('company_popular_name', getCompany.company_popular_name);
      formData.append('company_url', getCompany.company_url);
      formData.append('about_company', getCompany.about_company);
      formData.append('call_action', getCompany.call_action);
      formData.append('call_action1', getCompany.call_action1);

      if (picture == '') {
        formData.append('company_logo', getCompany.company_logo);

      } else {
        formData.append('company_logo', picture);

      }
    } else {
      formData.append('company_legal_name', taskInput.company_legal_name);
      formData.append('company_popular_name', taskInput.company_popular_name);
      formData.append('company_url', taskInput.company_url);
      formData.append('about_company', taskInput.about_company);
      formData.append('call_action', taskInput.call_action);
      formData.append('call_action1', taskInput.call_action1);
      if (picture == '') {
        formData.append('company_logo', taskInput.company_logo);

      } else {
        formData.append('company_logo', picture);

      }
    }
    formData.append('task_title', taskInput.task_title);
    formData.append('price', taskInput.price);
    formData.append('per_download', taskInput.per_download);
    formData.append('expiry_date', taskInput.expiry_date);
    formData.append('total_openings', taskInput.total_openings);
    formData.append('steps', taskInput.steps);
    formData.append('term_condition', taskInput.term_condition);
    formData.append('add_rew', taskInput.add_rew);
    formData.append('ref_link', taskInput.ref_link);
    formData.append('ref_code', taskInput.ref_code);




    axios.post(`api/update_task/${task_id}`, formData).then(res => {
      if (res.data.status === 200) {

        setError([]);

        // window.location.href="/admin/company_details";
        swal("Success", res.data.message, "success");

        location.reload();

      } else {
        console.log(res.data.validation_errors);
        setError(res.data.validation_errors);
      }

    });
  }
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (

        <div className='container-fluid paddingRight mt-4'>
          {/* <div className="card-header">    Company Details    </div> */}
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
              <div className='row'>
                <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL active'><a >Task Info</a></div>
                <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRR'><a>Company Details</a></div>
              </div>

            </div>
          </div>
          <div className='row'>
            <div className='col-12 MainBoxC-details'>
              <div className='row'>
                <div className='col-12'>
                  <form onSubmit={submitCompany} encType="multipart/form-data" id="from_company">
                    {/* Task name */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Task Name" className="labelStyle">Task Title</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                        <div className="input-group">
                          <input type="text" name="task_title"
                            placeholder='Ex :Task Title'
                            value={taskInput.task_title}
                            onChange={handeInput}
                            className="form-control"
                            id='job_title' />
                        </div>
                        <span className="text-danger" id='err_job_title'>{error_list.job_title}</span>
                      </div>
                    </div>
                    {/* Price */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="price" className="labelStyle">Price</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        <div className='row d-flex justify-content-between'>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                            <input type="text" name="price"
                              placeholder='Ex :800 Rs'
                              value={taskInput.price}
                              onChange={handeInput}
                              className="form-control"
                              id='job_title' />

                            <span className="text-danger" id='err_job_type'>{error_list.job_type}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                            <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                              defaultValue={taskInput.per_download}
                              onChange={handeInput}
                              name='per_download'>
                              <option value=''>Ex:Per Download</option>
                              <option value="1">Food Delivery Job</option>
                              <option value="2">Ecommerce Delivery Job</option>
                              <option value="3">Office Job</option>
                            </select>
                            <span className="text-danger" id='err_job_category'>{error_list.job_category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Expiry Date and Total Openings */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Expiry Date and Total Openings</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        <div className='row d-flex justify-content-between'>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                            <input type="date" name="expiry_date"
                              placeholder='Select Date'
                              value={taskInput.expiry_date}
                              onChange={handeInput}
                              className="form-control" id="comp_pn" />


                            <span className="text-danger" id='err_expiry_date'>{error_list.expiry_date}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                            <input type="number" name="total_openings"
                              placeholder='Total Openings'
                              value={taskInput.total_openings}
                              onChange={handeInput}
                              className="form-control" id="total_openings" />

                            <span className="text-danger" id='err_total_openings'>{error_list.total_openings}</span>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* Steps */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="steps" className="labelStyle">Steps</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="steps"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="steps" rows="5" cols="5" value={taskInput.steps}>
                        </textarea>
                        <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                      </div>
                    </div>
                    {/* Term & Conditions */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Term & Conditions" className="labelStyle">Term & Conditions</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="term_condition"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="term_condition" rows="5" cols="5" value={taskInput.term_condition}>
                        </textarea>
                        <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                      </div>
                    </div>
                    {/* Additional Rewards */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Additional Rewards" className="labelStyle">Additional Rewards</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="add_rew"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="add_rew" rows="5" cols="5" value={taskInput.add_rew}>
                        </textarea>
                        <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                      </div>
                    </div>
                    {/* Button section */}
                    <div className='row'>
                      <div className='col-12 button-box'>

                        <button className='backgroung-orange' onClick={nextStep}
                        >Next</button>
                      </div>

                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className='container-fluid paddingRight mt-4'>
          {/* <div className="card-header">    Company Details    </div> */}
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
              <div className='row'>
                <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL'><a>Task Info.</a></div>
                <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor active buttonRR'><a>Company Details</a></div>
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
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Company Name" className="labelStyle">Company Legal Name</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                        <div className="input-group">
                          <Select
                            className="custom-select  multipleSelectOption"
                            value={selectcompany}
                            onChange={handleselectcompany}
                            name="company_legal_name"
                            placeholder={(taskInput.company_legal_name != '') ? taskInput.company_legal_name : 'Select First City'}
                            options={companyOption}
                          />

                        </div>
                        <span className="text-danger" id="#err_company_legal_name">{error_list.company_legal_name}</span>
                      </div>
                    </div>
                    {/* Comapny Popular Name */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="company popular name" className="labelStyle">Company Popular Name</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                        <input type="text" name="company_popular_name"
                          placeholder='Ex : Kamaao Jobs'

                          value={(getCompany.company_popular_name) ? getCompany.company_popular_name : taskInput.company_popular_name}
                          onChange={selectcompanyname}
                          className="form-control" id="comp_pn" />
                        <span className="text-danger" id="#err_company_popular_name">{error_list.company_popular_name}</span>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        {/* Website URL  */}
                        <div className="row mb-3">
                          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                            <label htmlFor="Website Url" className="labelStyle">Website Url</label>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                            <input type="text" name="company_url"
                              placeholder='Ex : https//www.kamaao.app/home Url'
                              value={(getCompany.company_url) ? getCompany.company_url : taskInput.company_url}
                              onChange={selectcompanyname}
                              className="form-control" />
                            <span className="text-danger" id="#err_company_url">{error_list.company_url}</span>
                          </div>
                        </div>
                        {/* Company Logo */}
                        <div className="row mb-3">
                          <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                            <label htmlFor="Company Logo" className="labelStyle">Company Logo</label>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                            <input type="file" name="company_logo"
                              placeholder='Ex : https//www.kamaao.app/home'

                              onChange={handeImage}
                              className="form-control" id="logo" />
                            <span className="text-danger" id="#err_company_logo">{error_list.company_logo}</span>
                          </div>
                        </div>
                      </div>

                      {/* image upload box */}
                      {(() => {
                        if (imageUrl != '') {
                          return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={imageUrl} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>)
                        } else {
                          if (getCompany.company_logo) {
                            return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={`/company/${getCompany.company_logo}`} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>
                            )
                          }
                          else if (taskInput.company_logo) {
                            return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={`/company/${taskInput.company_logo}`} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>)
                          } else {
                            return (
                              <div className='col-2 imageUploadBox mb-3'><p className='logoName'>Logo <br /> Preview </p></div>
                            )
                          }
                        }

                      })()}
                    </div>
                    {/* About Company */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="About Company" className="labelStyle">About Company</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="about_company"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={selectcompanyname}
                          className="form-control" id="about_comp" rows="5" cols="5" value={(getCompany.about_company) ? getCompany.about_company : taskInput.about_company}>
                        </textarea>
                        <span className="text-danger" id="#err_about_company">{error_list.about_company}</span>
                      </div>
                    </div>
                    {/* Call to action */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Call To Action</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        <div className='row d-flex justify-content-between'>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per text-center InputHeight InputBox ">

                            <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                              value={(getCompany.call_action1) ? getCompany.call_action1 : taskInput.call_action1}
                              onChange={selectcompanyname}
                              name="call_action1">
                              <option value=''>Download Now</option>
                              <option value="1" selected={(taskInput.call_action1 == '1') ? 'selected' : ''}>One</option>
                              <option value="2" selected={(taskInput.call_action1 == '2') ? 'selected' : ''}>Two</option>
                              <option value="3" selected={(taskInput.call_action1 == '3') ? 'selected' : ''}>Three</option>
                            </select>
                            <span className="text-danger" id="#err_call_action1">{error_list.call_action1}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per InputHeight text-center InputBox ">
                            <input type="text" name="call_action"
                              placeholder='CTA URL: https//asads'
                              value={(getCompany.call_action) ? getCompany.call_action : taskInput.call_action}
                              onChange={selectcompanyname}
                              className="form-control" id="cta" />
                            <span className="text-danger" id="#err_call_action">{error_list.call_action}</span>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Referral link" className="labelStyle">Referral link</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <div className="input-group">
                          <input type="text" name="ref_link"
                            placeholder='Ex :Referral link'
                            value={taskInput.ref_link}
                            onChange={handeInput}
                            className="form-control"
                            id='job_title' />
                        </div>
                        <span className="text-danger" id='err_job_title'>{error_list.job_title}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Task Name" className="labelStyle">Referral code</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <div className="input-group">
                          <input type="text" name="ref_code"
                            placeholder='Ex :Referral code'
                            value={taskInput.ref_code}
                            onChange={handeInput}
                            className="form-control"
                            id='job_title' />
                        </div>
                        <span className="text-danger" id='err_job_title'>{error_list.job_title}</span>
                      </div>
                    </div>
                    <div className='row'>
                      {/* Button section */}
                      <div className='col-12 button-box'>

                        <button className='backgroung-gray marginRight10' onClick={prevStep}>Back</button>
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

}

export default withRouter(Edit_Task);