import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
// Import CSS
import "../assets/admin/css/Application.css";
function ApplicationViewSecond() {

    return (
        <div className='container-fluid'>

            <div className='applicationHeadingBox paddingTopBottom20'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <h4 className='applicationHeadingText'>Application View</h4>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ApplicationButtonBox'>
                        <button className='ApplicationButton'>Massage</button>
                        <button className='ApplicationButton'>Export</button>
                    </div>
                </div>
            </div>
            <div className='row paddingLeftRight'>
                <div className='col-12 ApplicantBox'>
                    <p>Applicant</p>
                </div>
            </div>

            <div className='row paddingLeftRight marginTop10 TimelineSEction'>
                <div className='col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 '>

                    <div className='row'>
                        <div className='col-12 bgWhite'>
                            <div className='row'>
                                <div className='col-12 WorkingBox'>
                                    <p>Active</p>
                                </div>

                            </div>
                            {/* personal Details Section */}
                            <div className='row'>
                                <div className='col-12 leftBorder'>
                                    <div className='row paddingLeft50 border-bottom'>
                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                                            <div className='row'>
                                                <div className='col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6'>
                                                    <div className='ApplicationViewProfile'></div>
                                                    {/* <img src={{}} width="120px" height="120px" className='pt-3'></img>                 */}
                                                </div>
                                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'>
                                                    <div className='row'>
                                                        <div className='col-12'>
                                                            <p className='Name_Text'>paras</p>
                                                        </div>
                                                        <div className='col-12'>
                                                            <p className='ID_Text'>231223</p>
                                                        </div>
                                                        <div className='col-12'>
                                                            <p className='Gender_Text'>Male</p>
                                                        </div>
                                                        <div className='col-12 margin20per'>
                                                            <p className='Contact_Text'>+91 9818170730</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Details Section End */}
                                    {/* Job Details Section Start */}
                                    <div className='row paddingLeft50 border-bottom'>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <div className='row'>
                                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6'><p className='CategoryText'>Category</p></div>
                                                        <div className='col-xl-7 col-lg-7 col-md-7 col-sm-8 col-6'><p className='Job_Text'>Job</p></div>
                                                    </div>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <div className='row'>
                                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'><p className='CategoryText'>Type</p></div>
                                                        <div className='col-xl-7 col-lg-7 col-md-7 col-sm-6 col-6'><p className='Job_Text'>Full Time</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row paddingLeft50 border-bottom'>
                                        <div className='col-12'>
                                            <div className='row'>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <div className='row'>
                                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'><p className='CategoryText'>Company</p></div>
                                                        <div className='col-xl-7 col-lg-7 col-md-7 col-sm-6 col-6'><p className='Job_Text'>ABC Co.</p></div>
                                                    </div>
                                                </div>
                                                <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                                    <div className='row'>
                                                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'><p className='CategoryText'>Title</p></div>
                                                        <div className='col-xl-7 col-lg-7 col-md-7 col-sm-6 col-6'><p className='Job_Text'>Ecommerce Executive</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row paddingLeft50 border-bottom'>
                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                                            <div className='row'>
                                                <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'><p className='CategoryText'>Location</p></div>
                                                <div className='col-xl-7 col-lg-7 col-md-7 col-sm-6 col-6'><p className='Job_Text'>Rohini, Delhi</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Follow Up Timeline Start */}
                    <div className='row marginTop10 TimelineSEction bgWhite paddingBottom30'>
                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 '>
                            <div className='row'>
                                <div className='col-12 border-bottom'>
                                    <select className="custom-select custom-selectTimeline" id="inputGroupSelect04">
                                        <option >Follow Up Timeline</option>
                                        <option defaultValue="1">One</option>
                                        <option defaultValue="2">Two</option>
                                        <option defaultValue="3">Three</option>
                                    </select>
                                </div>
                                <div className='col-12 paddingLeft30'>
                                    <p className='dateHeding'>05 Jan, 2022</p>
                                </div>
                                <div className='col-12 paddingLeft45'>
                                    <div className='row'>
                                        <div className='col-8'><p>Customer will register tomorrow</p></div>
                                        <div className='col-4'><p>02:45 Pm</p></div>
                                    </div>
                                </div>
                                <div className='col-12 paddingLeft45 border-bottom'>
                                    <div className='row'>
                                        <div className='col-8'><p>Call not picked up</p></div>
                                        <div className='col-4'><p>12:10 Pm</p></div>
                                    </div>
                                </div>

                                <div className='col-12 paddingLeft30'>
                                    <p className='dateHeding'>02 Jan, 2022</p>
                                </div>
                                <div className='col-12 paddingLeft45'>
                                    <div className='row'>
                                        <div className='col-8'><p>Customer will register tomorrow</p></div>
                                        <div className='col-4'><p>02:45 Pm</p></div>
                                    </div>
                                </div>
                                <div className='col-12 paddingLeft45'>
                                    <div className='row'>
                                        <div className='col-8'><p>Call not picked up</p></div>
                                        <div className='col-4'><p>12:10 Pm</p></div>
                                    </div>
                                </div>
                                <div className='col-12 paddingLeft45'>
                                    <div className='row'>
                                        <div className='col-8'><p>Will call back</p></div>
                                        <div className='col-4'><p>06:20 Pm</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Follow Up Timeline end */}
                </div>

                <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 bgWhite Width40per'>
                    <div className='row'>
                        <div className='col-12 border-bottom'>
                            <select className="custom-select custom-selectTimeline custom-UpdateStatus" id="inputGroupSelect04">
                                <option >Update Status</option>
                                <option defaultValue="1">One</option>
                                <option defaultValue="2">Two</option>
                                <option defaultValue="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 UpdateStatusBox border-bottom'>
                            <p>In Process</p>
                            <p>Referred  </p>
                            <p>Rejected  </p>
                        </div>

                        <div className='col-12 UpdateStatusBox1'>
                            <p>Remarks</p><br />
                            <p>Re-Referred</p>
                            <p>Re-Re-Referred</p>
                            <p>onboarded</p>
                            <p>Under Verification</p>
                            <p className='active activeText'>Active</p>
                            <p>Not Interested</p>
                            <p>Not Eligible</p>
                            <p>Documents Incompelete</p>
                            <p>Vehichle not available</p>
                            <p>Expired</p>
                        </div>
                        <div className='col-12 RemarkBox'>
                            <p className='RemarkText'>Remarks</p>
                            <div className='RemarkDetailBox'>
                                <p>
                                    Ex : Free and ready to use replacement logo in various styles and compositions for your design — the logo mirrors the web app at logoipsum.com
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Follow Up Timeline end */}
            <div className='row '>
                <div className='col-12 paginationBox'>
                    <Pagination>
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Item>{2}</Pagination.Item>
                        <Pagination.Item>{3}</Pagination.Item>
                        <Pagination.Item>{4}</Pagination.Item>
                        <Pagination.Item active>{5}</Pagination.Item>
                        <Pagination.Item>{6}</Pagination.Item>
                        <Pagination.Item>{7}</Pagination.Item>
                        <Pagination.Item>{8}</Pagination.Item>
                        <Pagination.Item>{9}</Pagination.Item>
                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Next />
                    </Pagination>
                </div>
            </div>
        </div>
    );

}

export default ApplicationViewSecond;