import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Breadcrums (props){

    return(

        <>
        <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12 col-12 m-0 p-0'>
          <div className='breadcrumbs01'>
            <ul>
              <li><Link className='nav-link01'><FaHome className='HomeIcon' /></Link> <MdKeyboardArrowRight className='Right_ArrowB' /></li>
              <li><Link className='nav-link01'>{props.name}</Link></li>
            </ul>

          </div>

        </div>
      </div>
        </>
    );
}
export default Breadcrums;