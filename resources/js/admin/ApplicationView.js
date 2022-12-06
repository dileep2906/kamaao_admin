import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { withRouter, useHistory } from 'react-router-dom';
// Import CSS
import "../assets/admin/css/Application.css";
// import 'antd/dist/antd.css';
import { Spin, Select } from 'antd';

function ApplicationView(props) {
    const history = useHistory();
    const { Option } = Select;
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [remarkInput, Setremark] = useState({
        remark: ''
    })
    const [user_application, setUser_application] = useState('');
    function application_details() {
        const application_id = props.match.params.id;
        axios.get(`api/application_view/${application_id}`).then((res) => {
            console.log(res.data.status);
            if (res.data.status = 200) {
                setUser_application(res.data.app);
                setStatus(res.data.app[0].status);
                setLoading(false);
            } else {
                swal('error', res.data.message, 'error');
                //history.push('/admin/view_employee');
            }
        })

    }
    const [fetchfollow, setfetchfollow] = useState('');
    function applcation_followup_fetch() {
        const application_id = props.match.params.id;
        axios.get(`api/applcation_followup_fetch/${application_id}`).then((res) => {
            console.log(res.data.status);
            if (res.data.status = 200) {
                setfetchfollow(res.data.follow);
            } else {
                swal('error', res.data.message, 'error');
                //history.push('/admin/view_employee');
            }
        })
    }
    useEffect(() => {
        applcation_followup_fetch();
        application_details();
    }, [props.match.params.id]);
    const handeRemark = (e) => {
        Setremark({ ...remarkInput, [e.target.name]: e.target.value });
    }
    const Remarkapplication = (e) => {
        const application_id = props.match.params.id;
        const formData = new FormData();
        formData.append('remark', remarkInput.remark);
        axios.post(`api/application_remark/${application_id}`, formData).then((res) => {

            if (res.data.status = 200) {
                swal('Success', res.data.message, 'success');
                application_details();
                remarkInput.remark = '';
            } else {
                swal('error', res.data.message, 'error');

                // history.push('/admin/view_employee');
            }

        });
    }
    const heandelstaus = (val) => {
        const application_id = props.match.params.id;
        setStatus(val);
        const formData = new FormData();
        formData.append('status', val);
        axios.post(`api/application_status/${application_id}`, formData).then((res) => {

            if (res.data.status) {
                swal('Success', res.data.message, 'success');
                application_details();
            } else {
                history.push('/admin/view_employee');
            }

        });
    }

    const [follow, setFollow] = useState({
        comment: ""
    });
    const hendelFollow = (e) => {
        setFollow({ ...follow, [e.target.name]: e.target.value });

    }

    const submitFollow = (e) => {
        e.preventDefault();
        const application_id = props.match.params.id;
        //alert(follow.comment);
        const formData = new FormData();


        formData.append('comment', follow.comment);
        formData.append('followupdate', follow.followupdate);
        formData.append('app_id', application_id);


        axios.post('api/applcation_followup', formData).then(res => {
            if (res.data.status === 200) {


                follow.comment = '';

                swal("Success", res.data.message, "success");
                applcation_followup_fetch();

                application_details();

            } else {
                swal("Error", "This time your not comment", "error");
            }

        });
    }

    if (loading == true) {
        return (
            //<div>Loding</div>
            <div className="example">
                <Spin />
            </div>)
    } else {
        return (
            <div className='container-fluid mb-5'>

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

                <div className='row paddingLeftRight marginTop10'>
                    <div className='col-12 bgWhite'>
                        <div className='row'>
                            <div className='col-12 '>
                                <div className='col-xl-2 col-lg-2 col-md-2 col-sm-6 pt-2'>
                                    {/* < Working/> */}

                                    <Select
                                        showSearch
                                        style={{ width: 200, color: 'black' }}
                                        value={status}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                        onChange={heandelstaus}
                                    >
                                        <Option value="Not Interested">Not Interested</Option>
                                        <Option value="Under Verification">Under Verification</Option>
                                        <Option value="Not Eligible">Not Eligible</Option>
                                        <Option value="Active">Active</Option>
                                        <Option value="Remark">Remark</Option>
                                        <Option value="Working">Working</Option>
                                        <Option value="Expired">Expired</Option>
                                        <Option value="Re-Referred">Re-Referred</Option>
                                        <Option value="Re-Re-Referred">Re-Re-Referred</Option>
                                        <Option value="Onboarded">Onboarded</Option>
                                        <Option value="Document incompelete">Document incompelete</Option>
                                        <Option value="Vehichle not available">Vehichle not available</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        {/* personal Details Section */}
                        <div className='row'>
                            <div className='col-12 leftBorder'>
                                <div className='row paddingLeft50 border-bottom'>
                                    <div className='col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12'>
                                        <div className='row'>
                                            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'>
                                                <div className='ApplicationViewProfile'></div>
                                                {/* <img src={{}} width="120px" height="120px" className='pt-3'></img>                 */}
                                            </div>
                                            <div className='col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'>
                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <p className='Name_Text'>{user_application[0].name}</p>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p className='ID_Text'>{user_application[0].id}</p>
                                                    </div>
                                                    <div className='col-12'>
                                                        <p className='Gender_Text'>{user_application[0].gender}</p>
                                                    </div>
                                                    <div className='col-12 margin20per'>
                                                        <p className='Contact_Text'>{user_application[0].mobile}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                        <p className='RemarkText'>Remarks <button type="button" className="ApplicationButton" data-bs-toggle="modal" data-bs-target="#remark">Add Remarks</button>
                                        </p>
                                        {/* <!-- Modal --> */}
                                        <div className="modal fade" id="remark" tabIndex="-1" aria-labelledby="remarkModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="remark">Add Remarks</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <textarea name="remark"
                                                            placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                                                            onChange={handeRemark}
                                                            className="form-control" id="steps" rows="5" cols="5" value={remarkInput.remark}>
                                                        </textarea>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <span className="btn btn-primary" onClick={() => Remarkapplication()}>Submit</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='RemarkDetailBox'>
                                            <p>
                                                {user_application[0].remark}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Details Section End */}
                                {/* Job Details Section Start */}
                                <div className='row paddingLeft50 border-bottom'>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                <div className='row'>
                                                    <div className='col-6'><p className='CategoryText'>Category</p></div>
                                                    <div className='col-6'><p className='Job_Text'>{user_application[0].job_category}</p></div>
                                                </div>
                                            </div>
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                <div className='row'>
                                                    <div className='col-6'><p className='CategoryText'>Type</p></div>
                                                    <div className='col-6'><p className='Job_Text'>{user_application[0].job_type}</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='row paddingLeft50 border-bottom'>
                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                <div className='row'>
                                                    <div className='col-6'><p className='CategoryText'>Company</p></div>
                                                    <div className='col-6'><p className='Job_Text'>{user_application[0].company_legal_name}</p></div>
                                                </div>
                                            </div>
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                <div className='row'>
                                                    <div className='col-6'><p className='CategoryText'>Title</p></div>
                                                    <div className='col-6'><p className='Job_Text'>{user_application[0].job_title}</p></div>
                                                </div>
                                            </div>
                                            <div className='col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12'>
                                                <div className='row'>
                                                    <div className='col-6'><p className='CategoryText'>Location</p></div>
                                                    <div className='col-6'><p className='Job_Text'>{user_application[0].state},{user_application[0].city}  </p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='row paddingLeft50'>
                            <div className='col-12'>

                            </div>
                        </div>
                        {/* Job Details Section End */}
                    </div>

                </div>
                {/* Follow Up Timeline Start */}
                <div className='row paddingLeftRight marginTop10 TimelineSEction'>
                    <div className='col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12 bgWhite'>
                        <div className='row'>
                            <div className='col-12 border-bottom'>
                                <select className="custom-select custom-selectTimeline" id="inputGroupSelect04">
                                    <option >Follow Up Timeline</option>
                                    <option defaultValue="1">One</option>
                                    <option defaultValue="2">Two</option>
                                    <option defaultValue="3">Three</option>
                                </select>
                            </div>
                            {fetchfollow.map((item) => {
                                return (
                                    <>
                                        <div className='col-12 paddingLeft30'>
                                            <p className='dateHeding'>{item.comment_at}</p>
                                        </div>
                                        <div className='col-12 paddingLeft45'>
                                            <div className='row'>
                                                <div className='col-8'><p>{item.comment}</p></div>
                                                <div className='col-4'><p>{item.comment_time}</p></div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className='col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 bgWhite Width40per'>
                        <span className="text-dark">Follow Up Timeline</span>
                        <form onSubmit={submitFollow} encType="multipart/form-data" className="pt-3">

                            <label htmlFor="Follow Up Timeline" className="labelStyle">Comment</label>
                            <textarea name="comment"
                                placeholder='Ex : Eleifend risus ante ad erat elit quisque cursus, quisque mollis aenean ultrices arcu auctor, sollicitudin curae vitae quam netus facilisis, tristique tellus viverra, a cubilia luctus viverra eleifend magna varius, ultrices sed etiam at velit habitant tristique lectus!'
                                onChange={hendelFollow}
                                className="form-control" id="Follow Up Timeline" rows="5" cols="5" value={follow.comment} >
                                follow
                            </textarea>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 pt-2 width49per text-center InputHeight InputBox">
                            <label htmlFor="Follow Up Timeline" className="labelStyle">Next Follow Up Date</label>

                            <input type="date" name="followupdate"
                              placeholder='Select Date'
                              value={follow.followupdate}
                              onChange={hendelFollow}
                              className="form-control" id="comp_pn" />


                            {/* <span className="text-danger" id='err_expiry_date'>{error_list.expiry_date}</span> */}
                          </div>
                            <div className='row'>
                                <div className='col-12 button-box pb-2'>
                                    <button type="submit" className='backgroung-orange'>Submit</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ApplicationView);