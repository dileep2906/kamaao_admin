import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
import Breadcrums from './Breadcrums';




function Add_category() {
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
 
 
  const [category, setCategory] = useState({
    cat_name: "",
    
  });

  //   const { register, handleSubmit,reset , formState: { errors } } = useForm({

  // });
 
  const [error_list, setError] = useState({});


  const handelcat = (e) => {
    //const { name, value } = e.target;
    setCategory({ ...category, [e.target.name]: e.target.value });
    if(e.target.name=='cat_name'){
      setError({cat_name:''});
    }

  }
  
  useEffect(() => {
    //console.log(error_list);
    if (Object.keys(error_list).length === 0 && isSubmit) {
      //console.log(category);
    }
  }, [error_list]);

  const submitcategory = (e) => {

    e.preventDefault();
    setError(validate(category));
    setIsSubmit(true);


    const formData = new FormData();


    formData.append('cat_name', category.cat_name);
    if (Object.keys(error_list).length === 0) {

      
      axios.post('api/add_category', formData).then(res => {
        if (res.data.status === 200) {


            // category.cat_name= '';
         
          swal("Success", res.data.message, "success");
            history.push('/admin/view_category');
          setError([]);


        } else {
          // console.log(res);
          setError(res.data.validation_errors);
         // swal("Error", res.data.message, "error");
        }

      });
    }
    


  }
  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.cat_name) {
      errors.cat_name = "Category name is required!";
    }
   
    return errors;
  };

  return (
    <div className='container-fluid paddingRight mt-4'>
      <Breadcrums name='Category'/>
      <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
          <div className='row'>
            <div className='col-lg-4 col-md-6 col-sm-12 col-12 buttoncolor buttonRL active'><a>Add Category</a></div>

          </div>

        </div>
      </div>
      <div className='row'>
        <div className='col-12 MainBoxC-details'>
          <div className='row'>
            <div className='col-12'>
              <form onSubmit={submitcategory} encType="multipart/form-data" id="from_company">
                {/*  Category Name */}
                <div className="row mb-3">
                  <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 align-self-center'>
                    <label htmlFor="Employee Name" className="labelStyle">Category Name</label>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 InputBox InputHeight">
                    <div className="input-group">
                      <input type="text"
                        name="cat_name"
                        value={category.cat_name}
                        onChange={handelcat}
                        placeholder='Enter Category Name'
                        className="form-control" id="cat_name" />

                    </div>
                    <span className='text-danger'>{error_list.cat_name}</span>
                    {/* {errors.employee_name && <span className='text-danger'>{errors.employee_name?.message}</span>} */}
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

export default Add_category;