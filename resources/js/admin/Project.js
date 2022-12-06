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
import "../assets/admin/css/project.css";

function Project() {

    const [loading, setLoading] = useState(true);

    return (
        <div className='row'>
            <div className='col-12 paddingR'>

                <div className='row'>
                    <div className='col-12'>
                        <div className='ProjectHeaderImage'>
                            <a><AddBoxIcon className='PlusIcon ProjectPlusIcon' /></a>
                        </div>
                    </div>
                </div>

                <div className='row margintop10'>
                    <div className='col-12 cardHeader'>
                        <a><SortOutlinedIcon className='ThreeLine' /></a>
                        <a><p className='SortText marginT15'>Sort by</p></a>
                        <div className='FilterImage margintop10'></div>
                        <a><p className='SortText marginT20'>Filter</p></a>
                        {/* <FontAwesomeIcon icon='fa-solid fa-filter' /> */}
                    </div>
                </div>
                <div className='row margintop10'>
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                        <div className='row cardHeadingBox'>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <p className='CardHeading'>Working <span>05</span></p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 ThreeDotsBox'>
                                <MoreHorizIcon className='ThreeDots' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                    <div className='row cardHeadingBox'>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <p className='CardHeading'>In Progress <span>45</span></p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 ThreeDotsBox'>
                                <MoreHorizIcon className='ThreeDots' />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4'>
                    <div className='row cardHeadingBox'>
                            <div className='col-lg-6 col-md-6 col-sm-6'>
                                <p className='CardHeading'>Completed <span>101</span></p>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 ThreeDotsBox'>
                                <MoreHorizIcon className='ThreeDots' />
                            </div>
                        </div>
                    </div>
                </div>
                {/* first Row */}
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3  cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3  cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5  cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second Row */}
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3  cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3  cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5  cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Row */}
                <div className='row'>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3  cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3  cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5  cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-4 marginT10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-12 iconSection'>
                                        <p className='cardHeaderP'>2d</p>
                                        <RemoveOutlinedIcon className='line' />
                                        <FavoriteOutlinedIcon className='heart' />
                                        <p className='number'>34</p>
                                        <RemoveOutlinedIcon className='line' />
                                        {/* <FontAwesomeIcon icon="fa-solid fa-thumbtack" /> */}
                                        <div className='PinImage'></div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-4 CardImageBox'>
                                        {/* <img src='' className='cardImage' /> */}
                                        <div className='cardImage'></div>
                                    </div>
                                    <div className='col-8 cardDetails p-0 m-0'>
                                        <p className='First_p'>Swiggy Delivery Boy Job</p>
                                        <p className='second_P'>Potential monthly earning.</p>
                                        <p className='trird_p'>₹10,000 - 25,000</p>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-3 cardButton'><a className='buttonText'>Full Time</a></div>
                                    <div className='col-3 cardButton'><a className='buttonText'>200 Left</a></div>
                                    <div className='col-5 cardButton'><a className='buttonText'>Expire on 20 March</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}


export default Project;
