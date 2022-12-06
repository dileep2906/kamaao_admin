import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';

import $ from 'jquery';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';

// import RichTextEditor from 'react-rte';



function TaskForm() {
    //state for steps
    const [step, setstep] = useState(1);
    const [skill, setSkill] = useState('');
    const [doc, setDoc] = useState('');

    const handleSkill = val => {
        setSkill(val);
    }
    const handleDoc = val => {
        setDoc(val);
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


    const [companyInput, setCompany] = useState({
        "company_legal_name": "",
        "company_popular_name": "",
        "company_url": "",
        "about_company": "",
        "call_action": "",
        "call_action1": "",
        "job_title": "",
        "sub_title": "",
        "job_type": "",
        "job_category": "",
        "expiry_date": "",
        "total_openings": "",
        "salary_min": "",
        "salary_max": "",
        "state": "",
        "city": "",
        "area": "",
        "roles_responsibilities": "",
        "mini_edu_req": "",
        "experience_req": "",
        // "skill_req":"",
        // "doc_req":"",
        "add_req": ""
    });
    const [picture, setPicture] = useState([]);
    const [video, setVideo] = useState([]);
    const [error_list, setError] = useState([]);
    const [imageUrl, setImageUrl] = useState("");




    const handeInput = (e) => {
        e.persist();
        setCompany({ ...companyInput, [e.target.name]: e.target.value });


    }
    const handeImage = (e) => {
        setPicture({ company_logo: e.target.files[0] });
        let value = URL.createObjectURL(e.target.files[0]);
        setImageUrl(value);
    }
    const handeVideo = (e) => {
        setVideo({ descri_video: e.target.files[0] });

    }
    // function for going to next step by increasing step state by 1
    const nextStep = () => {
        // if(companyInput.job_title==''){
        //   $("#err_job_title").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Job Title is required</div>");
        // }else if(companyInput.sub_title==''){
        //   $("#err_sub_title").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Sub Title is required</div>");
        // }else if(companyInput.job_type==''){
        //   $("#err_job_type").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Job Type is required</div>");
        // }else if(companyInput.job_category==''){
        //   $("#err_job_category").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Job Category is required</div>");
        // }else if(companyInput.expiry_date==''){
        //   $("#err_expiry_date").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Expiry Date is required</div>");
        // }else if(companyInput.total_openings==''){
        //   $("#err_total_openings").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Total Openings is required</div>");
        // }else if(companyInput.salary_min==''){
        //   $("#err_salary_min").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Minimum Salary is required</div>")
        // }else if(companyInput.salary_max==''){
        //   $("#err_salary_max").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Maximum Salary is required</div>");
        // }else if(companyInput.state==''){
        //   $("#err_state").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>State  is required</div>");
        // }else if(companyInput.city==''){
        //   $("#err_city").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>City is required</div>");
        // }else if(companyInput.area==''){
        //   $("#err_area").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Area is required</div>");
        // }else if(companyInput.descri_video==''){
        //   $("#err_area").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Description Video is required</div>");
        // }else if(companyInput.roles_responsibilities==''){
        //   $("#err_roles_responsibilities").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Roles & Responsibilities is required</div>");
        // }
        // else{
        //    setstep(step + 1);
        // }
        setstep(step + 1);
        if (step + 1) {
            if (companyInput.company_legal_name == '') {
                $("#err_company_legal_name").html("<div class='alert alert-danger alert-dismissible'><button type='button' class='btn-close' data-bs-dismiss='alert'></button>Company Legal Name is required</div>");
            } else {
                setstep(step + 1);
            }
        }
    };

    // function for going to previous step by decreasing step state by 1
    const prevStep = () => {
        setstep(step - 1);
    };

    const submitCompany = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company_logo', picture.company_logo);
        formData.append('descri_video', video.descri_video);
        formData.append('company_legal_name', companyInput.company_legal_name);
        formData.append('company_popular_name', companyInput.company_popular_name);
        formData.append('company_url', companyInput.company_url);
        formData.append('about_company', companyInput.about_company);
        formData.append('call_action', companyInput.call_action);
        formData.append('call_action1', companyInput.call_action1);

        formData.append('job_title', companyInput.job_title);
        formData.append('sub_title', companyInput.sub_title);
        formData.append('job_type', companyInput.job_type);
        formData.append('job_category', companyInput.job_category);
        formData.append('expiry_date', companyInput.expiry_date);
        formData.append('total_openings', companyInput.total_openings);

        formData.append('salary_min', companyInput.salary_min);
        formData.append('salary_max', companyInput.salary_max);
        formData.append('state', companyInput.state);
        formData.append('city', companyInput.city);
        formData.append('area', companyInput.area);
        formData.append('roles_responsibilities', companyInput.roles_responsibilities);
        formData.append('mini_edu_req', companyInput.mini_edu_req);
        formData.append('experience_req', companyInput.experience_req);
        formData.append('skill_req', skill);
        formData.append('doc_req', doc);
        formData.append('add_req', companyInput.add_req);





        axios.post('api/add_job', formData).then(res => {
            if (res.data.status === 200) {

                setError([]);

                // window.location.href="/admin/company_details";
                swal("Success", res.data.message, "success");

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

                <div className='container-fluid paddingRight'>
                    {/* <div className="card-header">    Company Details    </div> */}
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
                            <div className='row'>
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL active'><a >Task Info</a></div>
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRR'><a>Company Details</a></div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 MainBoxC-details'>
                            <div className='row'>
                                <div className='col-12'>
                                    <form id="#">
                                        {/* Task Title*/}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                                                <label htmlFor="Company Name" className="labelStyle">Task Title</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                                                <div className="input-group">
                                                    <input type="text" name="job_title"
                                                        placeholder='Ex : Food Delivery Partner'
                                                        className="form-control"
                                                        id='#' />
                                                </div>

                                                {/* <span className="text-danger" id='#'>Error</span> */}
                                            </div>
                                        </div>

                                        {/*Prize*/}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                                                <label htmlFor="Call To Action" className="labelStyle">Prize</label>
                                            </div>
                                            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                                                <div className='row d-flex justify-content-between'>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">

                                                        <input type="text"
                                                            placeholder='Ex : 25,000'
                                                            className="form-control" id="#" />
                                                        {/* <span className="text-danger" id='#'></span> */}
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                                                        <select className="custom-select custom-selectMT" id="#"
                                                        >
                                                            <option >Ex : Per Download</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>

                                                        {/* <span className="text-danger" id='#'></span> */}
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
                                                            className="form-control" id="#" />

                                                        <span className="text-danger" id='err_expiry_date'>{error_list.expiry_date}</span>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 width49per text-center InputHeight InputBox">
                                                        <input type="number" name="total_openings"
                                                            placeholder='Total Openings'
                                                            value={companyInput.total_openings}
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
                                                <label htmlFor="About Company" className="labelStyle">Steps</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                                                <textarea name="roles_responsibilities"
                                                    placeholder=' 1. Made a local food deliveries.
                                                    2. Maintain a neat, safe, and organized vehichle.
                                                    3. Provide Timely and accurate delivery service.'
                                                    className="form-control" id="#" rows="3" cols="3">
                                                </textarea>
                                                <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                                            </div>
                                        </div>
                                        {/* Terms & Conditions */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor="About Company" className="labelStyle">Terms & Conditions</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                                                <textarea name="roles_responsibilities"
                                                    placeholder=' 1. Made a local food deliveries.
                                                    2. Maintain a neat, safe, and organized vehichle.
                                                    3. Provide Timely and accurate delivery service.'
                                                    className="form-control" id="#" rows="3" cols="3">
                                                </textarea>
                                                <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                                            </div>
                                        </div>
                                        {/* Additional Rewardss */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor="About Company" className="labelStyle">Additional Rewards</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                                                <textarea name="roles_responsibilities"
                                                    placeholder=' 1. Made a local food deliveries.
                                                    2. Maintain a neat, safe, and organized vehichle.
                                                    3. Provide Timely and accurate delivery service.'
                                                    className="form-control" id="#" rows="3" cols="3">
                                                </textarea>
                                                <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                                            </div>
                                        </div>


                                    </form>

                                </div>
                            </div>
                            {/* Button section */}
                            <div className='row'>
                                <div className='col-12 button-box'>
                                    <button className='backgroung-orange marginLeft45per' onClick={nextStep}>Next</button>
                                </div>

                            </div>
                        </div>
                    </div >
                </div >
            );
        case 2:
            return (
                <div className='container paddingRight'>
                    {/* <div className="card-header">    Company Details    </div> */}
                    <div className='row'>
                        <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
                            <div className='row'>
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL'><a>Task Info</a></div>
                                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRR active'><a>Company Details</a></div>
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
                                                <label htmlFor="Company Name" className="labelStyle">Comapny Legal Name</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                                                <div className="input-group">
                                                    <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                                                        name="company_legal_name"
                                                        value={companyInput.company_legal_name}
                                                        onChange={handeInput}>
                                                        <option >Ex : Prognomic Business Solutions Private Limited</option>
                                                        <option defaultValue="1">One</option>
                                                        <option defaultValue="2">Two</option>
                                                        <option defaultValue="3">Three</option>
                                                    </select>
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
                                                    value={companyInput.company_popular_name}
                                                    onChange={handeInput}
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
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight InputWidth">
                                                        <input type="text" name="company_url"
                                                            placeholder='Ex : https//www.kamaao.app/home Url'
                                                            value={companyInput.company_url}
                                                            onChange={handeInput}
                                                            className="form-control" id="url" />
                                                        <span className="text-danger" id="#err_company_url">{error_list.company_url}</span>
                                                    </div>
                                                </div>
                                                {/* Company Logo */}
                                                <div className="row mb-3">
                                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                                                        <label htmlFor="Company Logo" className="labelStyle">Company Logo</label>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight InputWidth">
                                                        <input type="file" name="company_logo"
                                                            placeholder='Ex : https//www.kamaao.app/home'
                                                            value={companyInput.company_logo}
                                                            onChange={handeImage}
                                                            className="form-control" id="logo" />
                                                        <span className="text-danger" id="#err_company_logo">{error_list.company_logo}</span>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* image upload box */}
                                            {(() => {
                                                if (imageUrl != '') {
                                                    return (<div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 mb-3'><p ><img src={imageUrl} className='imageUploadBox imageUploadBox1' /></p></div>)
                                                } else {
                                                    return (
                                                        <div className='col-2 imageUploadBox imageUploadBox1 mb-3'><p className='logoName'>Logo <br /> Preview </p></div>
                                                    )
                                                }

                                            })()}
                                        </div>
                                        {/* About Company */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12'>
                                                <label htmlFor="About Company" className="labelStyle">About Company</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox">
                                                <textarea name="roles_responsibilities"
                                                    placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, semper lectus sagittis sodales ante fames, felis maecenas nisi amet consectetur rutrum, iaculis pretium sagittis ut risus pretium risus donec litora ut augue, ultrices sed etiam at velit habitant tristique lectus!'
                                                    onChange={handeInput}
                                                    className="form-control" id="about_comp" rows="5" cols="5" value={companyInput.roles_responsibilities}>
                                                </textarea>
                                                <span className="text-danger" id='err_roles_responsibilities'>{error_list.roles_responsibilities}</span>
                                            </div>
                                        </div>
                                        {/* Call To Action */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                                                <label htmlFor="Call To Action" className="labelStyle">Call to Action (Name & URL)</label>
                                            </div>
                                            <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12'>
                                                <div className='row d-flex justify-content-between'>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per text-center InputHeight InputBox ">
                                                        <select className="custom-select custom-selectMT" id="inputGroupSelect04"
                                                            value={companyInput.call_action1}
                                                            onChange={handeInput}
                                                            name="call_action1">
                                                            <option >Download Now</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>
                                                        <span className="text-danger" id="#err_call_action1">{error_list.call_action1}</span>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 width49per InputHeight text-center InputBox ">
                                                        <input type="text" name="call_action"
                                                            placeholder='CTA URL: https//asads'
                                                            value={companyInput.call_action}
                                                            onChange={handeInput}
                                                            className="form-control" id="cta" />
                                                        <span className="text-danger" id="#err_call_action">{error_list.call_action}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Referral Link */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                                                <label htmlFor="company popular name" className="labelStyle">Referral Link</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                                                <input type="text" name="company_popular_name"
                                                    placeholder='Ex : https//www.kamaao.app/home'
                                                   
                                                    className="form-control" id="#" />
                                                {/* <span className="text-danger" id="#"></span> */}
                                            </div>
                                        </div>
                                        {/* Referral Code */}
                                        <div className="row mb-3">
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                                                <label htmlFor="company popular name" className="labelStyle">Referral Code</label>
                                            </div>
                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                                                <input type="text" name="company_popular_name"
                                                    placeholder='Referral Code'
                                                   
                                                    className="form-control" id="#" />
                                                {/* <span className="text-danger" id="#"></span> */}
                                            </div>
                                        </div>

                                    </form>

                                </div>
                            </div>
                            {/* Button section */}
                            <div className='row'>
                                <div className='col-12 button-box'>

                                    <button className='backgroung-gray marginRight10' onClick={prevStep}>Back</button>
                                    <button className='backgroung-orange'>Next</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            );

    }

}

export default TaskForm;