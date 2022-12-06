import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Select from 'react-select';
import Breadcrums from './Breadcrums';



function Add_employee() {
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";
  const [imageUrl,setImageUrl]=useState();

  const [isSubmit, setIsSubmit] = useState(false);
  const [Profile,setProfile]=useState([]);
  const [PicType,setPicType]=useState([]);
  const [Employee, setEmployee] = useState({
    employee_name: "",
    employee_email: "",
    employee_pass: "",
    mobile:"",
    profile_pic:""
  });
  //   const { register, handleSubmit,reset , formState: { errors } } = useForm({

  // });
  const [designtion, setDesignation] = useState([]);
  const handledesignOption = val => {
    setDesignation(val);
    error_list.designtion='';
  }
  const designOption = [
    { label: 'Sub Admin', value: '2' },
    { label: 'Sales ', value: '3' },
    { label: 'Back Office', value: '4' },
    { label: 'Tele caller', value: '5' },
  ];
  const [error_list, setError] = useState({
    employee_name: "",
    employee_email: "",
    employee_pass: "",
    mobile:"",
    profile_pic:"",
    designtion:""
  });


  const handelemployee = (e) => {
    //const { name, value } = e.target;
    setEmployee({ ...Employee, [e.target.name]: e.target.value });
    if(e.target.name==='employee_name'){
      error_list.employee_name='';
    }
    if(e.target.name==='employee_email'){
      error_list.employee_email='';
    }
    if(e.target.name==='employee_pass'){
      error_list.employee_pass='';
    }
    if(e.target.name==='mobile'){
      error_list.mobile='';
    }
    if(e.target.name==='profile_pic'){
      error_list.profile_pic='';
    }
    if(e.target.name==='profile_pic'){
    setProfile(e.target.files[0]);
    setPicType(e.target.files[0].name.split('.').pop());
    let value = URL.createObjectURL(e.target.files[0]);
    setImageUrl(value);
    }
  }
  useEffect(() => {
    console.log(error_list);
    if (Object.keys(error_list).length === 0 && isSubmit) {
      // console.log(Employee);
      // console.log(Profile);
      // console.log(PicType);
    }
  }, [error_list]);

  const submitemployee = (e) => {

    e.preventDefault();
    setError(validate(Employee));
    setIsSubmit(true);


    const formData = new FormData();


    formData.append('employee_name', Employee.employee_name);
    formData.append('employee_email', Employee.employee_email);
    formData.append('employee_pass', Employee.employee_pass);
    formData.append('mobile', Employee.mobile);
    formData.append('profile_pic',Profile);
    formData.append('employee_designation', designtion.value);
    if (Object.keys(error_list).length === 0) {


      axios.post('api/add_employee', formData).then(res => {
        if (res.data.status === 200) {


          Employee.employee_name = '';
          Employee.employee_email = '';
          Employee.employee_pass = '';
          Employee.mobile = '';
          Employee.profile_pic = '';
          setDesignation([]);
          setImageUrl('');
          swal("Success", res.data.message, "success");

          setError([]);


        } else {
          console.log(res.data.validation_errors);
          setError(res.data.validation_errors);
        }

      });
    }
    //  else{
    // //   swal("Warning","Please fill all filed","error");
    // // }


  }
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    

    if (!values.employee_name) {
      errors.employee_name = "Name is required!";
    }
    if (!values.employee_email) {
      errors.employee_email = "Email is required!";
    } else if (!regex.test(values.employee_email)) {
      errors.employee_email = "This is not a valid email format!";
    }
    if (!values.employee_pass) {
      errors.employee_pass = "Password is required";
    } else if (values.employee_pass.length < 4) {
      errors.employee_pass = "Password must be more than 4 characters";
    } else if (values.employee_pass.length > 10) {
      errors.employee_pass = "Password cannot exceed more than 10 characters";
    }
     if (!values.mobile.length) {
      errors.mobile = "Mobile number is required!";
    }else if(values.mobile.length>10||values.mobile.length<10){
      errors.mobile = "Mobile number must be 10 digits";
    }  
    
    if(PicType=='jpeg'|| PicType=='jpg' ||PicType=='png'||!values.profile_pic){

    }else{
      errors.profile_pic = "Profile image must be jpeg,png,jpg type ";
    }
    if (designtion.value == undefined) {
      errors.designtion = "please select designtion";
    }
    return errors;
  };

  return (
    <div className='container-fluid paddingRight mt-4'>   
       <Breadcrums name='Employee'/>

      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL active'><a>Add Employee</a></div>

          </div>

        </div>
      </div>
      <div className='row'>
        <div className='col-12 MainBoxC-details'>
          <div className='row'>
            <div className='col-12'>
              <form onSubmit={submitemployee} encType="multipart/form-data" id="from_company">
                {/*  name */}
                <div className="row mb-3">
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                    <label htmlFor="Employee Name" className="labelStyle">Employee Name</label>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                    <div className="input-group">
                      <input type="text"
                        name="employee_name"
                        value={Employee.employee_name}
                        //{...register("employee_name",{required:'Employee Name is required'})}
                        onChange={handelemployee}
                        placeholder='Enter Employee Name'
                        className="form-control" id="employee_name" />

                    </div>
                    <span className='text-danger'>{error_list.employee_name}</span>
                    {/* {errors.employee_name && <span className='text-danger'>{errors.employee_name?.message}</span>} */}
                  </div>


                </div>
                {/* email */}
                <div className="row mb-3">
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                    <label htmlFor="company popular name" className="labelStyle">Employee Email</label>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                    <div className="input-group">
                      <input type="email"
                        name="employee_email"
                        value={Employee.employee_email}
                        //{...register("employee_email",{required:'Employee is required'})}
                        onChange={handelemployee}
                        placeholder='Enter Employee Email'
                        className="form-control" id="employee_email" />
                    </div>
                    <span className='text-danger'>{error_list.employee_email}</span>
                    {/* {errors.employee_email && <span className='text-danger'> {errors.employee_email?.message}</span>} */}
                  </div>


                </div>
                {/* password */}
                <div className="row mb-3">
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                    <label htmlFor="company popular name" className="labelStyle">Employee Password</label>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                    <div className="input-group">
                      <input type="password"
                        name="employee_pass"
                        value={Employee.employee_pass}
                        // {...register("employee_pass",{required:'Password is required'})}
                        onChange={handelemployee}
                        placeholder='Enter Employee Password'
                        className="form-control" id="employee_pass" />
                    </div>
                    <span className='text-danger'>{error_list.employee_pass}</span>
                    {/* {errors.employee_pass && <span  className='text-danger'> {errors.employee_pass?.message}</span>} */}
                  </div>

                </div>
                {/* profile pic */}
                
              <div className='row'>
                <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                  {/* mobile  */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="mobile" className="labelStyle">Mobile Number</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="text"
                      name="mobile"
                       value={Employee.mobile}

                       onChange={handelemployee} placeholder='Please enter your number'
                        className="form-control" id="mobile" />
                           <span className='text-danger'>{error_list.mobile}</span>
                    </div>                 

                  </div>
                  {/* profile Pic */}
                  <div className="row mb-3">
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 align-self-center'>
                      <label htmlFor="profile Pic " className="labelStyle">Profile Image</label>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 InputHeight ">
                      <input type="file"value={Employee.profile_pic}
                         onChange={handelemployee} className="form-control" name="profile_pic" />
                   
                    <span className='text-danger'>{error_list.profile_pic}</span>
                    </div>

                  </div>
                </div>
                {/* image upload box */}

                <div className='col-xl-3 col-lg-3 col-md-12 col-sm-12 mb-3'><p ><img src={imageUrl || defaultSrc} className='imageUploadBox imageUploadBoxMargin-l' /></p></div>
              </div>
                {/* designation  */}
                <div className="row mb-3">
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 '>
                    <label htmlFor="company popular name" className="labelStyle">Employee Designation</label>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 text-center InputBox InputHeight">
                    <div className="input-group">
                      <Select

                        className="custom-select  custom-selectMultiSelect"
                        onChange={handledesignOption}
                        value={designtion}
                        placeholder='Enter Employee Designation'
                        options={designOption}
                        id="employee_designation" />
                    </div>
                    <span className='text-danger'>{error_list.designtion}</span>
                    {/* {errors.employee_designation && <span  className='text-danger'> {errors.employee_designation?.message}</span>} */}

                  </div>
                </div>
                {/* Button */}
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

export default Add_employee;