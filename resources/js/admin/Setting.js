import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons';
// import Css
import "../assets/admin/css/Settings.css";

function Setting() {

    const [loading, setLoading] = useState(true);

    return (
        <div className='row'>
            <div className='col-12 paddingR'>

                <div className='row'>
                    <div className='col-12'>
                        <div className='StoreHeaderImage'>
                            <a><AddBoxIcon className='PlusIcon ProjectPlusIcon' /></a>
                            <h3 className='pt-3'>1. All App User Data</h3>
                            <h3>2. All Admin Panel User Data</h3>
                            <h3>3. All Client Data Company Wise</h3>
                            <h3>4. Create Client Profile And Set Payment Rules (Time Frame & Milestones)</h3>
                            <h3>5. Create New User Or Admin And Manage Their Roles</h3>
                            <h3>6. Block User Account Or Employees</h3>                           
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Setting;
