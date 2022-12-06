import React ,{useState,useEffect}from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Profile from "../../admin/Profile";
import Dashboard from "../../admin/Dashboard";
import Add_job from "../../admin/Add_job";
import View_job from "../../admin/View_job";
import Edit_jobs from "../../admin/Edit_jobs";
import Company_details from "../../admin/Company_details";
import View_Company from "../../admin/View_company";
import Edit_Company from "../../admin/Company_edit";
import All_application from "../../admin/ApplicationOverView";
import Application_view from "../../admin/ApplicationView";
import Demo from "../../admin/Demo";
import Login from "../../components/Login";
import { Alert } from "bootstrap";
import ReactDOM from "react-dom";
import Add_employee from "../../admin/Add_employee";
import View_employee from "../../admin/View_employee";
import Edit_employee from "../../admin/Edit_employee";
import Add_task from "../../admin/Add_task";
import View_task from "../../admin/View_task";
import Edit_task from "../../admin/Edit_task";
import HotOffers from "../../admin/HotOffers";
import Add_Hot_Offer from "../../admin/Add_Hot_Offer";
import View_offer from "../../admin/View_hotoffer";
import Edit_Hotoffer from "../../admin/Hotoffer_edit";
import Add_project from "../../admin/Add_project";
import View_project from "../../admin/View_project";
import Orders from "../../admin/OrderApplication";
import Edit_project from "../../admin/Edit_project";
import Add_category from "../../admin/Add_category";
import View_category from "../../admin/View_category";
import Edit_category from "../../admin/Edit_category";
import Add_procategory from "../../admin/Add_procategory";
import View_procategory from "../../admin/View_procategory";
import Edit_procategory from "../../admin/Edit_procategory";
import Store from "../../admin/Store";
import View_store from "../../admin/View_store";
import Add_store from "../../admin/Add_store";
import University from "../../admin/University";
import Setting from "../../admin/Setting";

import "../../assets/admin/css/styles.css";
import "../../assets/admin/js/scripts";
import "../../assets/admin/css/Form.css";
import "../../assets/admin/css/companyView.css";
import { useHistory } from 'react-router-dom';
import {Spin} from 'antd';
import { Settings } from "@material-ui/icons";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min';



const MasterLayout = () => {
    const history = useHistory();
    const[loading,setLoading]=useState(true);
    const [getuser,setuserDetails]=useState({
        name:'',
        user_type:''
    });
    const auth_token = localStorage.getItem('isUserLogged');
   
        useEffect(() =>{
        axios.get('api/check_user/'+auth_token).then(res=>{
          if(res.status === 200)
          {
            
                    axios.get(`api/get_user/`+res.data.check_user[0].tokenable_id).then(res=>{
                    
                    if(res.status === 200){
                        setuserDetails(res.data.employee);
                     setLoading(false);
                    }
                    });
            
          }
         
         });
            },[]);
    return (
        <div>
            {(() => {
                if (!localStorage.getItem('auth_token')) {

                    window.location.href = "/admin";

                } else {
                    if(loading==true){
                        return(<div className="d-flex justify-content-center " style={{marginTop: 300 + 'px'}} >
                            <div className="spinner-grow text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-secondary" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-danger" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-warning" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-info" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
<div className="spinner-grow text-dark" role="status">
  <span className="visually-hidden">Loading...</span>
</div>
                        </div>);
                    }else{
                    return (
                        <Router>
                            <div className="sb-nav-fixed">
                                <Navbar name={getuser.name} id={getuser.id} user_type={getuser.user_type} />
                                <div id="layoutSidenav">
                                    <div id="layoutSidenav_nav">
                                        <Sidebar name={getuser.name} user_type={getuser.user_type}/>
                                    </div>
                                    <div id="layoutSidenav_content">
                                        <main className="PaddingTopMain-20">

                                            <Switch>
                                                <Route exact path="/admin/dashboard">
                                                    <Dashboard name={getuser.name}/>
                                                </Route>
                                                <Route path="/admin/profile">
                                                    <Profile />
                                                </Route>
                                                
                                                <Route path="/admin/add_category">
                                                    <Add_category />
                                                </Route>

                                                <Route path="/admin/view_category">
                                                    <View_category />
                                                </Route>
                                                <Route path="/admin/edit_category/:id">
                                                    <Edit_category />
                                                </Route>

                                                <Route path="/admin/add_procategory">
                                                    <Add_procategory />
                                                </Route>
                                                <Route path="/admin/view_procategory">
                                                    <View_procategory />
                                                </Route>
                                                <Route path="/admin/edit_procategory/:id">
                                                    <Edit_procategory />
                                                </Route>

                                                <Route path="/admin/add_job">
                                                    <Add_job />
                                                </Route>

                                                <Route path="/admin/view_jobs">
                                                    <View_job />
                                                </Route>
                                                <Route path="/admin/edit_jobs/:id">
                                                    <Edit_jobs />
                                                </Route>
                                                <Route path="/admin/add_employee">
                                                    <Add_employee />
                                                </Route>
                                                <Route path="/admin/view_employee">
                                                    <View_employee />
                                                </Route>
                                                <Route path="/admin/edit_employee/:id">
                                                    <Edit_employee />
                                                </Route>
                                                <Route path="/admin/orders">
                                                    <Orders />
                                                </Route>
                                                <Route path="/admin/add_task">
                                                    <Add_task />
                                                </Route>
                                                <Route path="/admin/edit_task/:id">
                                                    <Edit_task />
                                                </Route>
                                                <Route path="/admin/view_task">
                                                    <View_task />
                                                </Route>
                                                <Route path="/admin/hot_offers">
                                                    <HotOffers />
                                                </Route>
                                                <Route path="/admin/add_hot_offer">
                                                    <Add_Hot_Offer />
                                                </Route>
                                                <Route path="/admin/view_hot_offer">
                                                    <View_offer />
                                                </Route>
                                                <Route path="/admin/edit_offer/:id">
                                                    <Edit_Hotoffer />
                                                </Route>
                                                <Route path="/admin/add_company_details">
                                                    <Company_details />
                                                </Route>
                                                <Route path="/admin/view_company">
                                                    <View_Company />
                                                </Route>
                                                <Route path="/admin/all_application">
                                                    <All_application />
                                                </Route>
                                                <Route path="/admin/application_view/:id">
                                                    <Application_view/>
                                                </Route>
                                                <Route path="/admin/edit_company/:id">
                                                    <Edit_Company />
                                                </Route>
                                                <Route path="/admin/add_projects">
                                                    <Add_project />
                                                </Route>
                                                <Route path="/admin/view_projects">
                                                    <View_project />

                                                </Route>
                                                <Route path="/admin/edit_project/:id">
                                                    <Edit_project />

                                                </Route>

                                                <Route path="/admin/store">
                                                    <View_store />
                                                </Route>

                                                <Route path="/admin/add_store">
                                                    <Add_store />
                                                </Route>

                                                <Route path="/admin/university">
                                                    <University />
                                                </Route>

                                                <Route path="/admin/settings">
                                                    <Setting />
                                                </Route>
                                            </Switch>
                                        </main>
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                        </Router>
                    );
                    }
                }
            }
            )()}
        </div>
    );
}

export default MasterLayout;

if (document.getElementById('admin')) {
    ReactDOM.render(<MasterLayout />, document.getElementById('admin'));
}
