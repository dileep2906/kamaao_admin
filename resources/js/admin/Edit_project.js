import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

import $ from 'jquery';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import axios from 'axios';
import { withRouter, useHistory } from "react-router-dom";

// import RichTextEditor from 'react-rte';



function Edit_project(props) {
  const history = useHistory();
  //state for steps
  const [step, setstep] = useState(1);
  const [skill, setSkill] = useState('');
  const [doc, setDoc] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectcompany, setselectCompany] = useState('');
  const [stateResponse, setstateResponse] = useState([]);
  const [cityResponse, setcityResponse] = useState([]);
  const [areaResponse, setareaResponse] = useState([]);
  const [companyResponse, setcompanyResponse] = useState([]);

  const handleSkill = val => {
    setSkill(val);
  }
  const handleDoc = val => {
    setDoc(val);
  }
  const handleState = val => {
    setState(val);
  }
  const handleCity = val => {
    setCity(val);
  }
  const handleArea = val => {
    setArea(val);
  }
  const handleselectcompany = val => {
    setselectCompany(val);
  }
  const skilloptions = [
    { label: 'Option 1', value: 'option_1' },
    { label: 'Option 2', value: 'option_2' },
    { label: 'Option 3', value: 'option_3' },
    { label: 'Option 4', value: 'option_4' },
  ];
  const docoptions = [
    { label: 'Option 1', value: 'option_1' },
    { label: 'Option 2', value: 'option_2' },
    { label: 'Option 3', value: 'option_3' },
    { label: 'Option 4', value: 'option_4' },
  ];
  //Fetching Company
  useEffect(() => {
    axios.get('api/view_company').then((res) => {
      setcompanyResponse(res.data.company);

    })
  }, [])
  const companyOption = companyResponse.map((response) => (
    { label: response.company_legal_name, value: response.id }
  ))

  // Fetching State
  useEffect(() => {
    axios.get('api/state').then((res) => {
      setstateResponse(res.data.state);

    })
  }, [])
  const states = stateResponse.map((response) => (
    { label: response.state_name, value: response.state_id }
  ))

  // Fetching City
  var state_id = state.value;
  useEffect(() => {
    if (state_id) {
      axios.get('api/city/' + state_id).then((res) => {

        setcityResponse(res.data.city);

      })
    }
  }, [state_id])
  const cities = cityResponse.map((response) => (
    { label: response.city_name, value: response.city_id }
  ))

  // Fetching Area
  var city_id = city.value;
  useEffect(() => {
    if (city_id) {
      axios.get('api/area/' + city_id).then((res) => {

        setareaResponse(res.data.area);

      })
    }
  }, [city_id])
  const areas = areaResponse.map((response) => (
    { label: response.area_name, value: response.area_id }
  ))


  const [projectInput, setCompany] = useState({

    "project_title": "",
    "sub_title": "",
    "project_type": "",
    "expiry_date": "",
    "total_openings": "",
    "amt": "",
    "task": "",
    "term_condition": "",
    "add_rewa": "",
    "mini_edu_req": "",
    "experience_req": "",

    "add_req": ""
  });
  const [picture, setPicture] = useState([]);
  const [video, setVideo] = useState([]);
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
    setCompany({ ...projectInput, [e.target.name]: e.target.value });

  }
  const selectcompanyname = (e) => {
    e.persist();
    fetchCompany({ ...getCompany, [e.target.name]: e.target.value });
    setCompany({ ...projectInput, [e.target.name]: e.target.value });
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
    const company_id = props.match.params.id;
    axios.get(`/api/edit_project/${company_id}`).then(res => {
      console.log(res.data.projects);
      if (res.data.status === 200) {
        setCompany(res.data.projects);

      } else if (res.data.status === 404) {
        swal('error', res.data.message, 'error');
        history.push('/admin/view_projects');
      }
    });

  }, [props.match.params.id])

  const handeImage = (e) => {
    setPicture(e.target.files[0]);
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
  }
  const handeVideo = (e) => {
    setVideo({ descri_video: e.target.files[0] });

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

    const formData = new FormData();
    if (picture == '') {
      formData.append('company_logo', getCompany.company_logo);

    } else {
      formData.append('company_logo', picture);

    }
    formData.append('descri_video', video.descri_video);
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

      formData.append('company_legal_name', projectInput.company_legal_name);
      formData.append('company_popular_name', projectInput.company_popular_name);
      formData.append('company_url', projectInput.company_url);
      formData.append('about_company', projectInput.about_company);
      formData.append('call_action', projectInput.call_action);
      formData.append('call_action1', projectInput.call_action1);
      if (picture == '') {
        formData.append('company_logo', projectInput.company_logo);

      } else {
        formData.append('company_logo', picture);

      }
    }


    formData.append('project_title', projectInput.project_title);
    formData.append('sub_title', projectInput.sub_title);
    formData.append('project_type', projectInput.project_type);
    formData.append('expiry_date', projectInput.expiry_date);
    formData.append('total_openings', projectInput.total_openings);

    formData.append('amt', projectInput.amt);
    if (state != '') {

      formData.append('state', state.label);
    } else {
      formData.append('state', projectInput.state);

    }
    if (city != '') {

      formData.append('city', city.label);
    } else {
      formData.append('city', projectInput.city);

    }
    if (area != '') {

      formData.append('area', area.label);
    } else {
      formData.append('area', projectInput.area);

    }
    formData.append('task', projectInput.task);
    formData.append('term_condition', projectInput.term_condition);

    formData.append('add_rewa', projectInput.add_rewa);
    formData.append('mini_edu_req', projectInput.mini_edu_req);
    formData.append('experience_req', projectInput.experience_req);
    if (skill != '') {
      formData.append('skill_req', skill);
    } else {
      formData.append('skill_req', projectInput.skill_req);

    }
    if (doc != '') {
      formData.append('doc_req', doc);

    } else {

      formData.append('doc_req', projectInput.doc_req);
    }
    formData.append('add_req', projectInput.add_req);



    const company_id = props.match.params.id;
    axios.post(`api/update_project/${company_id}`, formData).then(res => {
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
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL active'><a >Project Info</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor'><a>Company Details</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRR'><a>Requirements</a></div>
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
                        <label htmlFor="Company Name" className="labelStyle">Project Title</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                        <div className="input-group">
                          <input type="text" name="project_title"
                            placeholder='Ex :Project Title'
                            value={projectInput.project_title}
                            onChange={handeInput}
                            className="form-control"
                            id='job_title' />
                        </div>
                        <span className="text-danger" id='err_job_title'>{error_list.project_title}</span>
                      </div>
                    </div>
                    {/* Comapny Popular Name */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="company popular name" className="labelStyle">Sub Title</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputHeight InputBox">
                        <input type="text" name="sub_title"
                          placeholder='Ex :Sub Title'

                          value={projectInput.sub_title}
                          onChange={handeInput}
                          className="form-control" id="comp_pn" />
                        <span className="text-danger" id='err_sub_title'>{error_list.sub_title}</span>
                      </div>
                    </div>
                    {/* Project Type */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Project Type</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                        <div className="input-group">
                          <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                            value={projectInput.project_type}
                            onChange={handeInput} name='project_type'>
                            <option value=''>project_type</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Full Time">Full Time</option>
                          </select>
                        </div>
                        <span className="text-danger" id='err_project_type'>{error_list.project_type}</span>
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
                              value={projectInput.expiry_date}
                              onChange={handeInput}
                              className="form-control" id="comp_pn" />
                            <span className="text-danger" id='err_expiry_date'>{error_list.expiry_date}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                            <input type="number" name="total_openings"
                              placeholder='Total Openings'
                              value={projectInput.total_openings}
                              onChange={handeInput}
                              className="form-control" id="total_openings" />

                            <span className="text-danger" id='err_total_openings'>{error_list.total_openings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Amount */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Amount</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputHeight InputBox">
                        <input type="number" name="amt"
                          placeholder='Ex: 25,000'
                          value={projectInput.amt}
                          onChange={handeInput}
                          className="form-control" id="comp_pn" />
                        <span className="text-danger" id='err_salary_min'>{error_list.amt}</span>
                      </div>
                    </div>
                    {/* Location */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Location</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-md-2'>
                        <div className='row d-flex justify-content-between'>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              value={state}
                              defaultValue={projectInput.state}
                              options={states}
                              onChange={handleState}
                              placeholder={(projectInput.state != 'Null') ? projectInput.state : 'Select State'}
                              name="state"
                            >
                            </Select>

                            <span className="text-danger" id='err_state'>{error_list.state}</span>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleCity}
                              value={city}
                              name="city"
                              placeholder={(projectInput.city != 'Null') ? projectInput.city : 'Select First State'}

                              options={cities}
                            />

                            <span className="text-danger" id='err_city'>{error_list.city}</span>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleArea}
                              value={area}
                              name="area"
                              placeholder={(projectInput.area != 'Null') ? projectInput.area : 'Select First City'}

                              options={areas}
                            />

                            <span className="text-danger" id='err_area'>{error_list.area}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Description  Video */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Company Video" className="labelStyle">Description  Video</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                        <input type="file" name="descri_video"
                          placeholder='Ex : https//www.kamaao.app/home'
                          value={projectInput.descri_video}
                          onChange={handeVideo}
                          className="form-control" id="logo" />
                        <span className="text-danger" id='err_descri_video'>{error_list.descri_video}</span>
                      </div>
                    </div>

                    {/* Task */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Task" className="labelStyle"> Task </label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="task"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="about_comp" rows="5" cols="5" value={projectInput.task}>
                        </textarea>
                        <span className="text-danger" id='err_task'>{error_list.task}</span>
                      </div>
                    </div>
                    {/* Terms & Conditions */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Terms & Conditions" className="labelStyle">Terms & Conditions</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="term_condition"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="about_comp" rows="5" cols="5" value={projectInput.term_condition}>
                        </textarea>
                        <span className="text-danger" id='err_task'>{error_list.term_condition}</span>
                      </div>
                    </div>
                    {/*  Additional Rewards */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Task" className="labelStyle"> Additional Rewards </label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                        <textarea name="add_rewa"
                          placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                          onChange={handeInput}
                          className="form-control" id="about_comp" rows="5" cols="5" value={projectInput.add_rewa}>
                        </textarea>
                        <span className="text-danger" id='err_task'>{error_list.task}</span>
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
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL'><a>Project Info</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor active'><a>Company Details</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRR'><a>Requirements</a></div>
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
                            className="custom-select multipleSelectOption"
                            value={selectcompany}
                            onChange={handleselectcompany}
                            name="company_legal_name"
                            placeholder={(projectInput.company_legal_name != '') ? projectInput.company_legal_name : 'Select First City'}
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

                          value={(getCompany.company_popular_name) ? getCompany.company_popular_name : projectInput.company_popular_name}
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
                              value={(getCompany.company_url) ? getCompany.company_url : projectInput.company_url}
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
                            return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={`/company/${getCompany.company_logo}`} className='imageUploadBox  imageUploadBoxMargin-l' /></p></div>
                            )
                          }
                          else if (projectInput.company_logo) {
                            return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={`/company/${projectInput.company_logo}`} className='imageUploadBox  imageUploadBoxMargin-l' /></p></div>)
                          } else {
                            return (
                              <div className='col-xl-2 col-lg-2 col-md-2 col-sm-3 col-4 mb-3 imageUploadBox imageUploadBox1 mb-3'><p className='logoName'>Logo <br /> Preview </p></div>
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
                          className="form-control" id="about_comp" rows="5" cols="5" value={(getCompany.about_company) ? getCompany.about_company : projectInput.about_company}>
                        </textarea>
                        <span className="text-danger" id="#err_about_company">{error_list.about_company}</span>
                      </div>
                    </div>
                    {/* Call To Action */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="labelStyle">Call To Action</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        <div className='row d-flex justify-content-between'>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per text-center InputHeight InputBox ">

                            <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                              value={(getCompany.call_action1) ? getCompany.call_action1 : projectInput.call_action1}
                              onChange={selectcompanyname}
                              name="call_action1">
                              <option value=''>Download Now</option>
                              <option value="1" selected={(projectInput.call_action1 == '1') ? 'selected' : ''}>One</option>
                              <option value="2" selected={(projectInput.call_action1 == '2') ? 'selected' : ''}>Two</option>
                              <option value="3" selected={(projectInput.call_action1 == '3') ? 'selected' : ''}>Three</option>
                            </select>
                            <span className="text-danger" id="#err_call_action1">{error_list.call_action1}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per InputHeight text-center InputBox ">
                            <input type="text" name="call_action"
                              placeholder='CTA URL: https//asads'
                              value={(getCompany.call_action) ? getCompany.call_action : projectInput.call_action}
                              onChange={selectcompanyname}
                              className="form-control" id="cta" />
                            <span className="text-danger" id="#err_call_action">{error_list.call_action}</span>
                          </div>

                        </div>
                      </div>
                    </div>
                    {/* Button section */}
                    <div className='row'>
                      <div className='col-12 button-box'>

                        <button className='backgroung-gray marginRight10' onClick={prevStep}>Back</button>
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

    case 3:
      return (
        <div className='container-fluid paddingRight mt-4'>
          {/* <div className="card-header">    Company Details    </div> */}
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL'><a>Project Info</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor '><a>Company Details</a></div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRR active'><a>Requirements</a></div>
              </div>

            </div>
          </div>
          <div className='row'>
            <div className='col-12 MainBoxC-details'>
              <div className='row'>
                <div className='col-12'>
                  <form onSubmit={submitCompany} encType="multipart/form-data" id="from_company">
                    {/* Minimum Education Required */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Company Name" className="labelStyle">Minimum Education Required</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                        <div className="input-group">
                          <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                            name="mini_edu_req"
                            value={projectInput.mini_edu_req}
                            onChange={handeInput}>
                            <option >Ex : Prognomic Business Solutions Private Limited</option>
                            <option defaultValue="1">One</option>
                            <option defaultValue="2">Two</option>
                            <option defaultValue="3">Three</option>
                          </select>
                        </div>
                        <span className="text-danger" id="#err_mini_edu_req">{error_list.mini_edu_req}</span>
                      </div>
                    </div>
                    {/* Experience & Skill Required */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                        <label htmlFor="Call To Action" className="labelStyle">Experience & Skill Required</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                        <div className='row d-flex justify-content-between'>

                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per text-center InputHeight InputBox ">

                            <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                              name="experience_req"
                              value={projectInput.experience_req}
                              onChange={handeInput}>
                              <option >Select Experience</option>
                              <option defaultValue="1">One</option>
                              <option defaultValue="2">Two</option>
                              <option defaultValue="3">Three</option>
                            </select>

                            <span className="text-danger" id="#err_experience_req">{error_list.experience_req}</span>
                          </div>
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per text-center InputHeight InputBox ">

                            <MultiSelect
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleSkill}
                              defaultValue={(skill != '') ? skill : projectInput.skill_req}
                              name="skill_req"
                              options={skilloptions}
                            />

                            <span className="text-danger" id="#err_skill_req">{error_list.skill_req}</span>
                            <span style={{ color: 'red' }}> {skill}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Minimum Education Required */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Company Name" className="labelStyle">Documents Required</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox">
                        <div className="input-group">
                          <MultiSelect
                            className="custom-select custom-selectMultiSelect"
                            onChange={handleDoc}
                            defaultValue={(doc != '') ? doc : projectInput.doc_req}
                            name="doc_req"
                            options={docoptions}
                          />
                        </div>
                        <span className="text-danger" id="#err_doc_req">{error_list.doc_req}</span>
                        <span style={{ color: 'red' }}> {doc}</span>

                      </div>
                    </div>

                    {/* Additional Requirements */}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                        <label htmlFor="Company Name" className="labelStyle">Additional Requirements</label>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                        <div className="input-group">
                          <input type="text" name="add_req"
                            placeholder='Type the name of requirements'
                            value={projectInput.add_req}
                            onChange={handeInput}
                            className="form-control" id="cta" />

                        </div>
                        <span className="text-danger" id="#err_company_add_req">{error_list.add_req}</span>
                      </div>
                    </div>


                    {/* Button section */}

                    <div className='row'>
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

export default withRouter(Edit_project);