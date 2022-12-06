import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import {

    Link
} from "react-router-dom";
// Import CSS
import "../assets/admin/css/Order.css";
// import Bar chat
import OrderApplicationTable from "../components/OrderApplicationTable";
import SearchIcon from '@material-ui/icons/Search';
import Breadcrums from "./Breadcrums";
// import OrderFilter from "../components/OrderFilter";
function OrderApplication() {

    return (
        <div className='container-fluid'>
            <Breadcrums name='Order' />
            <div className='applicationHeadingBox '>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <h4 className='applicationHeadingText'>Orders</h4>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ApplicationButtonBox'>
                        <button className='ApplicationButton'>Create Order</button>
                    </div>
                </div>
            </div>
            <div className='row padding10'>
                <div className='col-12 OrderHeaderBox'>
                    <span className='LinkText'><Link className="nav-link neviBlue" to="#">All</Link></span>
                    <span className='LinkText'><Link className="nav-link" to="#">Open</Link></span>
                    <span className='LinkText'><Link className="nav-link" to="#">Dispatched</Link></span>
                    <span className='LinkText'><Link className="nav-link" to="#">Completed</Link></span>
                </div>
            </div>
            <div className='row paddingRL10'>
                <div className='col-12 FormBackground'>
                    <div className='row'>
                        <div className='col-2'>
                            {/* < OrderFilter/> */}
                            <select className="custom-select custom-selectRB" id="inputGroupSelect04">
                                <option >Filter Order</option>
                                <option defaultValue="1">One</option>
                                <option defaultValue="2">Two</option>
                                <option defaultValue="3">Three</option>
                            </select>
                        </div>
                        <div className='col-10 SearchBox'>
                            <form className="d-none d-md-inline-block form-inlin Width100per">
                                <div className="input-group NavSearchBox NavSearchBox1">
                                    <SearchIcon className="SearchIcon01" />
                                    <input className="form-control" type="text" placeholder="Enter Order....." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <OrderApplicationTable />
                </div>
            </div>
        </div>
    );

}

export default OrderApplication;