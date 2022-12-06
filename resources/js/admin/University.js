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
import "../assets/admin/css/University.css";

function University() {

    const [loading, setLoading] = useState(true);

    return (
        <div className='row'>
            <div className='col-12 paddingR'>

                <div className='row'>
                    <div className='col-12'>
                        <div className='StoreHeaderImage'>
                            <a><AddBoxIcon className='PlusIcon ProjectPlusIcon' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default University;
