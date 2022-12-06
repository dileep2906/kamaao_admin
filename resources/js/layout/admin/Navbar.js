import axios from "axios";
import React,{useState,useEffect,memo }from "react";
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import Modal from "antd/lib/modal/Modal";
import Select from 'react-select';
import {Table} from "antd";
import { Badge } from "antd";
import Mentions from "antd";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
// import ReorderIcon from '@material-ui/icons/Reorder';
import LineWeightOutlinedIcon from '@material-ui/icons/LineWeightOutlined';
// import HiOutlineMenuAlt1 from '@material-ui/icons/HiOutlineMenuAlt1';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import "../../assets/admin/css/Navbar.css";

const clientId = "181412757037-coge70cv88lll7chf8q990pjoeaikjos.apps.googleusercontent.com";
const auth_token = localStorage.getItem('isUserLogged');
const user_name = localStorage.getItem('auth_name');
const user_id = localStorage.getItem('auth_id');

const columns = [
   
    {
      title: '#',
      dataIndex: 'key',
      sorter: (a, b) => a.uid.length - b.uid.length,
      sortDirections: ['ascend', 'descend', 'ascend'],
      
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['ascend', 'descend', 'ascend'],
  
      
      //render: (text) => <a href='/admin/application_view/'>{text}</a>,
    },
   
    {
      title: 'Contact',
      dataIndex: 'contact',
      sorter: (a, b) => a.contact.length - b.contact.length,
      sortDirections: ['ascend', 'descend', 'ascend'],
  
    },
    {
      title: 'Location',
      dataIndex: 'location',
      sorter: (a, b) => a.location.length - b.location.length,
      sortDirections: ['ascend', 'descend', 'ascend'],
  
    },
   
   
   
   
  ];

// console.log("user_name asa ",user_name)
// console.log("user_id sdasd" , user_id)

const Navbar = (props) => {
    const history = useHistory();
    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post('api/logout').then(res => {

            if (res.data.status === 200) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');

                swal("Success", res.data.message, "success");


                history.push('/admin');
                location.reload();



            }

        });
    }
    const [loading, setLoading] = useState(true);

    const [employee, setEmployee] = useState('');
  const [application_follow_up, setApplication] = useState([]);
  const [getRows, setRows] = useState([]);
    
//   console.log("hello get row" , getRows)
    function showApplicationfollowup(){
        axios.get('api/view_applicationfollowup/'+auth_token).then((res) => {       
        //    console.log("application consooe",res)
        //    console.log("application consooe1",res.data.application_follow_up)
          setApplication(res.data.application_follow_up);
          setLoading(false);
        })
      }
      useEffect(() => {
        showApplicationfollowup();
      }, [])

      const getLatestRowDetails = async () => {
        // const results = await axios.get("http://localhost:8000/api/getLatestRow");
        const results = await axios.get("api/get_applicationfollowup/"+auth_token).then((getres) => {       
            console.log("getres application consooe",getres)
            console.log("get application consooe1",getres.data.get_application_follow_up)
            setRows(getres.data.get_application_follow_up);
           setLoading(false);
         });
       
      };
      useEffect(() => {
        getLatestRowDetails();
      }, [])

      
    const data = application_follow_up.map((response,index) =>
  
  (

    {
      key: index+1,
      uid: response.id,
      name: response.name,
      contact:response.mobile,
      location: response.state,
      
    }
  )
  )

  function application_view(id){
    history.push('/admin/application_view/'+id);
    
   }

  
    const handleEmployee = val => {
      setEmployee(val);
    }
   
    const onSignoutSuccess = () => {
        console.clear();

    };

    var AuthButtons = '';

    if (localStorage.getItem('auth_token')) {
        AuthButtons = (
            <li><a className="dropdown-item" onClick={logoutSubmit}>
                Logout
            </a></li>
        );
    }
    return (
        <div>

            <nav className="sb-topnav navbar navbar-expand navbarBackground">
                
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 margin100" id="sidebarToggle" href="#">
                    <div className="navbarButtonBox">
                        {/* <ReorderIcon className="NavButton" /> */}
                        <HiOutlineMenuAlt1 className="NavButton" />
                    </div>
                </button>
                <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 margin100" id="sidebarToggleTab" href="#">
                    <div className="navbarButtonBox">
                        {/* <ReorderIcon className="NavButton" /> */}
                        <HiOutlineMenuAlt1 className="NavButton" />
                    </div>
                </button>
                <div className="TitleTextBox">
                    {/* <p className="titleText">Dashboard</p> */}
                </div>
                <form className="FormPosition d-md-inline-block form-inlin">
                    <div className="input-group NavSearchBox">
                        <SearchIcon className="SearchIcon" />
                        <input className="form-control" type="text" placeholder="Search by jobs, company, skills....." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    </div>
                </form>
                {/* msg box */}
                <div className="HeaderMsgBox">
                    <ChatBubbleOutlineOutlinedIcon className="MsgIcon" />
                </div>
                {/* notification box */}
                <div className="NotificationBox">   
                <div className="notificationnumber">
                 
                <NotificationsNoneOutlinedIcon className="NotificationIcon" data-bs-toggle="modal" data-bs-target="#exampleModalfollowup"/>
                <sup>
                {
                   (getRows == 0)? '0' : getRows
                   
                }
                </sup> 
                </div>           
                    
                </div>
                <div className="nameBox">
                         <p className="nameText">{props.name}</p>
                         {/* <p className="nameText">{props.id}</p> */}
                    <p className="AdminText">{(props.user_type==2)?'Sub Admin':(props.user_type==3)?'Sales':(props.user_type==4)?'Back Office':(props.user_type==5)?'Tele caller':'Admin'}</p>

                </div>
                <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                    <li className="nav-item dropdown">
                        <Link className="nav-link" id="navbarDropdown" to="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="ProfileImageBox">
                                <div className="ProfileImage" ></div>
                            </div>
                        </Link>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="/admin/profile">Profile</Link></li>
                            <li><Link className="dropdown-item" to="#!">Activity Log</Link></li>
                            <li className="NotificationMessage"><Link className="dropdown-item" to="#!">Notification</Link></li>
                            <li className="NotificationMessage"><Link className="dropdown-item" to="#!">Message</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            {AuthButtons}
                        </ul>
                    </li>
                </ul>
            </nav>


{/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModalfollowup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Today FollowUp Data</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <Table
          
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={data}
          onRow={record => ({
            onClick: () => {
              console.log(record);
              application_view(record.uid);
            },
          })}
        />

           
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              {/* <span  className="btn btn-primary" onClick={()=>Assignapplication()}>Assign</span> */}
            </div>
        </div>
        </div>
      </div>

        </div>

    );

}

export default memo(Navbar);