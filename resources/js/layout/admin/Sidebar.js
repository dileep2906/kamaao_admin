import React,{useState,useEffect} from "react";
import {

    Link
} from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import StoreMallDirectoryOutlinedIcon from '@material-ui/icons/StoreMallDirectoryOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import DonutSmallOutlinedIcon from '@material-ui/icons/DonutSmallOutlined';
import GroupWorkOutlinedIcon from '@material-ui/icons/GroupWorkOutlined';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import WebAsset from '@material-ui/icons/WebAsset';
import { MdViewCompact, MdAddComment, MdOutlineAddToPhotos, MdStreetview, MdOutlinePostAdd, MdOutlinePreview, MdOutlineAddTask,MdWebAsset,MdEmojiPeople,MdOutlineNaturePeople } from "react-icons/md";
import { AiOutlineFundView } from "react-icons/ai";
import { FaPeopleArrows } from "react-icons/fa";
import { IoMdArrowRoundForward } from "react-icons/io";

import "../../assets/admin/css/Sidebar.css";

const Sidebar = (props) => {
  return (

        <nav className="sb-sidenav accordion SideBarBg"
            id="sidenavAccordion" >
            <div className="SidebarBox">
                <div id="Logo0101" className="Logo LogoSmallDevice">
                </div>
                <div className="LogoName SidebarHideShow">
                </div>
                <div className="SidebarHumbugerBox" id="SidebarHumbuger">
                <IoMdArrowRoundForward className="SidebarHumbugerIcons " />
                </div>
            </div>
            <div className="sb-sidenav-menu">
                <div className="nav padding70">
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/dashboard">
                            <HomeOutlinedIcon className="SidebarIcons " />
                         
                            <p className="SidebarHideShow">Dashboard</p>
                        </Link>
                    </div>
                    {(()=>{
              if(props.user_type==5 ||props.user_type==2 ||props.user_type==1){
                return(
                    <>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="" data-bs-toggle="collapse" data-bs-target="#collapseLayouts1">
                            <WebAssetIcon className="SidebarIcons" />

                            <p className="SidebarHideShow"> Assets </p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left35per SidebarHideShow" />
                        </Link>
                    </div>

                    <div className="collapse "
                        id="collapseLayouts1"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15" to="/admin/view_company" >
                                <MdViewCompact className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                View Company
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15" to="/admin/add_company_details" >
                                <MdAddComment className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                Add Company
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15" to="/admin/add_category">
                                <MdAddComment className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                Add Category
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15" to="/admin/view_category" >
                                <MdAddComment className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                View Category
                                </p>
                            </Link>
                        </nav>
                    </div>
                    </>
                     ); 
                  
                    }
                  })()}
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/all_application">
                            <DashboardOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">   Applications  </p>
                        </Link>
                    </div>
                    {(()=>{
                    if(props.user_type==2||props.user_type==3){
                return(
                    <>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/orders">
                            <ShoppingCartOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">  Orders </p>
                        </Link>
                    </div>
                    </>
                     ); 
                  
                    }
                  })()}
                    {(()=>{
                    if(props.user_type==2 ||props.user_type==1){
                return(
                    <>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts">
                            <WorkOutlineOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">Jobs</p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left44per SidebarHideShow" />
                        </Link>
                    </div>
                    <div className="collapse "
                        id="collapseLayouts"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/add_job" >
                                <MdOutlineAddToPhotos className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                    Add Job
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/view_jobs" >
                                <MdStreetview className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow ">
                                    View Job
                                </p>
                            </Link>
                        </nav>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="#" data-bs-toggle="collapse" data-bs-target="#employee">
                       
                            <WebAsset className="SidebarIcons" />
                            <p className="SidebarHideShow">  Employee </p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left25per SidebarHideShow" />
                        </Link>
                    </div>
                    <div className="collapse "
                        id="employee"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/add_employee" >
                                       <FaPeopleArrows className="SidebarIcons SidebarIcons0101" />
                                       
                                <p className="SidebarHideShow"> Add Employee </p> </Link>
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/view_employee" >
                                    <MdOutlineNaturePeople className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow"> View Employee
                                </p>
                            </Link>
                        </nav>
                    </div>


                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="#" data-bs-toggle="collapse" data-bs-target="#Projects">
                            <WorkOutlineOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">  Projects </p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left30per SidebarHideShow" />
                        </Link>
                    </div>
                    <div className="collapse "
                        id="Projects"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/add_projects" >
                                <MdOutlinePostAdd className="SidebarIcons SidebarIcons0101" />

                                <p className="SidebarHideShow">Add Projects
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/view_projects" >
                                <MdOutlinePreview className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">View Projects
                                </p>
                            </Link>
                        </nav>
                    </div>

                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="#" data-bs-toggle="collapse" data-bs-target="#tasks">
                            <AssignmentTurnedInOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> Tasks </p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left40per SidebarHideShow" />
                        </Link>
                    </div>
                    <div className="collapse "
                        id="tasks"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/add_task" >
                                <MdOutlineAddTask className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow"> Add Task
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/view_task" >
                                <AiOutlineFundView className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                    View Task
                                </p>
                            </Link>
                        </nav>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="#" data-bs-toggle="collapse" data-bs-target="#producat">
                            <AssignmentTurnedInOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> producat</p>
                            <KeyboardArrowDownIcon className="DropDownIcon margin_left40per SidebarHideShow" />
                        </Link>
                    </div>
                    <div className="collapse "
                        id="producat"
                        aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" >
                        <nav className="sb-sidenav-menu-nested nav" >
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/add_procategory" >
                                <MdOutlineAddTask className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow"> Add Product Category
                                </p>
                            </Link>
                            <Link className="nav-link RowBg paddingL15"
                                to="/admin/view_procategory" >
                                <AiOutlineFundView className="SidebarIcons SidebarIcons0101" />
                                <p className="SidebarHideShow">
                                    View Product Category
                                </p>
                            </Link>
                        </nav>
                    </div>
                    </>
                     ); 
                  
                    }
                  })()}
                   {(()=>{
                    if(props.user_type==2||props.user_type==4 ||props.user_type==1){
                return(
                    <>
                     <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/view_hot_offer">
                            <LocalOfferOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> Hot Offers </p>
                        </Link>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/store">
                            <StoreMallDirectoryOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">Store </p>
                        </Link>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/university">
                            <AccountBalanceOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow">University </p>
                        </Link>
                    </div>
                    <div className="collapsed RowBg marginTop70">
                        <Link className="nav-link navLinkPadding" to="/admin/settings">
                            <SettingsOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> Settings </p>
                        </Link>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/reports">
                            <DonutSmallOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> Reports </p>
                        </Link>
                    </div>
                    <div className="collapsed RowBg">
                        <Link className="nav-link navLinkPadding" to="/admin/help_support">
                            <GroupWorkOutlinedIcon className="SidebarIcons" />
                            <p className="SidebarHideShow"> Help & Support </p>
                        </Link>
                    </div>
                    </>
                );
                    }
            })()}
                </div>
            </div>
             </nav>

    );

}

export default Sidebar;