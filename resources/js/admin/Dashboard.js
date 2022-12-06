import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    button
} from 'react-router-dom';
import swal from 'sweetalert';
// Import CSS
import "../assets/admin/css/Dashboard.css";
// import Bar chat
import BarChartss from "../components/BarChartss";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Breadcrums from "./Breadcrums";
function Dashboard(props) {

    return (
        <div className='container-fluid paddingR30'>
            <Breadcrums name='Dashboard' />
            <div className='row'>
                <div className='col-12 FirstRow'>
                    <div className='row'>
                        <div className='col-6'><p className='WelcomeText'>Welcome<span>  {props.name}</span></p></div>
                        <div className='col-6 FilterMessageBox'>
                            <button className='btn Filerbutton marginRight10'>Filter</button>
                            <button className='btn Filerbutton'>Massage</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12'>
                            <div className='row'>
                                <div className='col-12 BarCharBox'>
                                    {/* Bar Chart Box */}
                                    <BarChartss />

                                </div>
                                <div className='col-12 marginTop10'>
                                    <div className='row RateMainBox'>
                                        <div className='RateBox'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-9'><p className='NotificationText'>Approved</p></div>
                                                        <div className='col-3'>
                                                            <ArrowUpwardIcon className='UpArrowGreen' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <p className='RateText'>₹ 80,000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='RateBox'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-9'><p className='NotificationText'>Pending</p></div>
                                                        <div className='col-3'>
                                                            <ArrowUpwardIcon className='UpArrowRed' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <p className='RateText'>₹ 34,000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='RateBox'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-9'><p className='NotificationText'>Rejected</p></div>
                                                        <div className='col-3'>
                                                            <ArrowUpwardIcon className='UpArrowRed Roatate180' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <p className='RateText'>₹ 34,000</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='RateBox'>
                                            <div className='row'>
                                                <div className='col-12'>
                                                    <div className='row'>
                                                        <div className='col-9'><p className='NotificationText'>Completed</p></div>
                                                        <div className='col-3'>
                                                            <ArrowUpwardIcon className='UpArrowGreen' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-12'>
                                                    <p className='RateText'>₹ 20,000</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 RatingBox'>
                            <div className='row'>
                                <div className='col-12 PieBox'>
                                    {/* Rating Pie Box */}
                                    Rating Box
                                </div>
                                <div className='col-12'>
                                    <p className='PieBoxDetails'> <FiberManualRecordIcon className='Bluedot' />&nbsp; &nbsp; Appstore Ratings</p>
                                    <p className='PieBoxDetails'><FiberManualRecordIcon className='Reddot' />&nbsp; &nbsp; Playstore Ratings</p>
                                    <p className='PieBoxDetails'><FiberManualRecordIcon className='Yellowdot' />&nbsp; &nbsp; Net Profit Goal</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className='row marginTop10 marginBottom50'>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 EmptyBox'></div>
                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 EmptyBox marginLeft35'></div>
            </div>
        </div>
    );

}

export default Dashboard;