import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import Css
import "../assets/admin/css/HotOffers.css";

function View_offer() {

    const [loading , setLoading ] =useState(true);
  const [ companylist , setCompanylist] =useState();
  async function showlist(){
   await axios.get('api/view_offer').then(res=>{
      if(res.status === 200){
        setCompanylist(res.data.hot_offer)
         
      }
      setLoading(false);
    });
  }
  useEffect(() =>{
    showlist();
  },[]); 

  
  function delete_offer(id){
    axios.delete('api/delete_offer/'+id).then((res)=>{
      if(res.data.status === 204){
        swal('warning',res.data.message,'warning');
        showlist();
      } 
  })

  } 
  function disable_offer(id){
   axios.post('api/disable_offer/'+id).then((res)=>{
     if(res.data.status === 200){
       swal('success',res.data.message,'success');
       showlist();
     
       
     }

 })

 }  
 function enable_offer(id){
    axios.post('api/enable_offer/'+id).then((res)=>{
      if(res.data.status === 200){
        swal('success',res.data.message,'success');
        showlist();
      
        
      }
 
  })
 
  } 
  // let viewdata=''; 
   
 let viewdata = companylist?.map((item) => {
    
    return(
    <div 
    
    key={item.id}
    className='col-lg-4 col-md-4 col-sm-4 marginT10'>
    <div className='card'>
      <div className='card-body'>
          <div className="fun_btngroub">
            <Link to={`edit_offer/${item.id}`} className='btn btn-info btn-sm'>Edit</Link>
            &nbsp;<span className='btn btn-danger btn-sm' onClick={()=>delete_offer(item.id)}>Delete</span>
            &nbsp;{(item.status=='enable')?<span className='btn btn-outline-primary btn-sm' onClick={()=>disable_offer(item.id)}>Enable</span>:<span className='btn btn-outline-warning btn-sm' onClick={()=>enable_offer(item.id)}>Disable</span>}
             </div>
        
           <div className='row'>
               <div className='col-12 iconSection'>
                   <p className='cardHeaderP'>2d</p>
                   <RemoveOutlinedIcon className='line' />
                   <FavoriteOutlinedIcon className='heart' />
                   <p className='number'>34</p>
                   <RemoveOutlinedIcon className='line' />
                   <div className='PinImage'></div>
               </div>
           </div>
           <div className='row'>
               <div className='col-4 '>
               {(()=>{
              if(item.offer_logo == null){
                return(
            
                  <div  className='cardImage CardImageBox'></div> 
                  
                  ); 
                  
              }else{
                return(
                  <img src={`/offer/`+item.offer_logo} className='cardImage  CardImageBox' />
                );
              }
            })()}
               </div>
               <div className='col-7 cardDetails p-0 m-0'>
               <p className='First_p'>{item.offer_legal_name}</p>
               <p className='second_P'>{item.offer_popular_name}</p>
               <p className='trird_p'>Offer Price : ₹{item.offer_price} </p>
               <p className='trird_p'>Actual Price : ₹{item.actual_price} </p>
               </div>
              
           </div>
          
       </div>
   </div>
</div>);
  });


    return (
        <div className='row'>
            <div className='col-12 paddingR'>

                <div className='row'>
                    <div className='col-12'>
                   
                        <div className='HotHeaderImage'>
                        <Link to='/admin/add_hot_offer'><AddBoxIcon className='PlusIcon ProjectPlusIcon' /></Link>
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
                   
                   
                {viewdata}
                </div>
                {/* Second Row */}
                
               

            </div>
        </div>

    );
}


export default View_offer;
