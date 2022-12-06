import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';

import $ from 'jquery';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import axios from 'axios';
import Breadcrums from "./Breadcrums";
// import RichTextEditor from 'react-rte';



function Add_store() {
  //state for steps
  const [product, setProduct] = useState('');
  const [category, setcategory] = useState('');
  const [sub_category, setsub_categories] = useState('');
  const [productResponse, setproductResponse] = useState([]);
  const [categoryResponse, setcategoryResponse] = useState([]);
  const [sub_categoriesResponse, setsub_categoriesResponse] = useState([]);

  
  const handleProduct = val => {
    setProduct(val);
  }
  const handleCategory = val => {
    setcategory(val);
  }
  const handleSubcategories = val => {
    setsub_categories(val);
  }
 
  // Fetching product
  useEffect(() => {
    axios.get('api/product').then((res) => {
      setproductResponse(res.data.product);

    })
  }, [])
  const products = productResponse.map((response) => (
    { label: response.store_product_name, value: response.product_id }
  ))

  // Fetching category
  var product_id = product.value;

  console.log("product_id id" , product_id)

  useEffect(() => {
    if (product_id) {
      axios.get('api/category/' + product_id).then((res) => {

        setcategoryResponse(res.data.category);

      })
    }
  }, [product_id])
  const categeries = categoryResponse.map((response) => (
    { label: response.category_name, value: response.category_id }
  ))

  // Fetching sub_categories
  var category_id = category.value;

  console.log("category id" , category_id)
  useEffect(() => {
    if (category_id) {
      axios.get('api/sub_category/' + category_id).then((res) => {

        setsub_categoriesResponse(res.data.sub_category);

      })
    }
  }, [category_id])
  const sub_categories = sub_categoriesResponse.map((response) => (
    { label: response.store_sub_categoried_name, value: response.sub_category_id }
  ))

  const submitCompany = (e) => {
    e.preventDefault();

    
    formData.append('product', product.label);
    formData.append('category', category.label);
    formData.append('sub_category', sub_category.label);

    console.log(formData);

  }
 
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
   
      return (

        <div className='container-fluid paddingRight'>
          <Breadcrums name='Job'/>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-12 detailsbutton'>
              <div className='row'>
                <div className='col-lg-4 col-md-4 col-sm-12 col-12 buttoncolor buttonRL active'><a >Store Details</a></div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 MainBoxC-details'>
              <div className='row'>
                <div className='col-12'>
                  <form onSubmit={submitCompany} encType="multipart/form-data" id="from_company">
                   

                    {/*Location*/}
                    <div className="row mb-3">
                      <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 align-self-center'>
                        <label htmlFor="Call To Action" className="col-sm-6 col-form-label labelStyle">Store Category</label>
                      </div>
                      <div className='col-xl-8 col-lg-8 col-md-12 col-sm-12 mt-md-2'>
                        <div className='row d-flex justify-content-between'>
                        
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                          

                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleProduct}
                              value={product}
                              name="product"
                              options={products}
                            />

                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleCategory}
                              value={category}
                              name="category"
                              options={categeries}
                            />

                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12 width33 text-end InputHeight InputBox">
                            <Select
                              className="custom-select  custom-selectMultiSelect"
                              onChange={handleSubcategories}
                              value={sub_category}
                              name="sub_category"
                              options={sub_categories}
                            />

                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className='row'>
                      <div className='col-12 button-box'>

                    <button type="submit" className='backgroung-orange'>Submit</button>
                       
                      </div>

                    </div>
                   
                  </form>
                    {/* Button section */}
                    
                </div>
              </div>

            </div>
          </div>
        </div>
      );

}

export default Add_store;