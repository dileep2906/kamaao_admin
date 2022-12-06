import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Breadcrums from './Breadcrums';
// import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons';

function View_employee() {
 
  const [loading , setLoading ] =useState(true);
  const [ employeelist , setEmployee] =useState([]);
  function showlist(){
    axios.get('api/view_employee').then(res=>{

      if(res.status === 200){
        setEmployee(res.data.employee)
      }

      setLoading(false);

    });
  }
  useEffect(() =>{
    showlist();
  },[]);

   

  function employee_delete(id){
    axios.delete('api/delete_employee/'+id).then((res)=>{
      if(res.data.status === 204){
        
        swal('warning',res.data.message,'warning');
        showlist();
      } 
  })

  } 
  function enable_employee(id){
      
   axios.post('api/enable_employee/'+id).then((res)=>{
     if(res.data.status === 200){
      
      showlist();
      
       swal('success',res.data.message,'success');
       //location.reload();
     }

 })

 }  
 
 function disable_employee(id){
     
    axios.post('api/disable_employee/'+id).then((res)=>{
      if(res.data.status === 200){
        
       
        swal('success',res.data.message,'success');
        showlist();
        
      }
 
  })
 
  } 
  if(loading==true){
    return(<div>Loding</div>)
  }else{
  var viewdata='';
  
  viewdata=
  employeelist.map((item, index) => {
    return(
        
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{(item.user_type==2)?'Sub Admin':(item.user_type==3)?'Sales':(item.user_type==4)?'Back Office':(item.user_type==5)?'Tele caller':'Admin'}
            
            </td>
            <td className="DisPlayInline"><Link className='btn btn-success btn-sm margin_left5 btn-bg-Green' to={`edit_employee/${item.id}`} >Edit</Link> {(item.status=='enable')?<span className='btn btn-outline-primary btn-sm margin_left5' onClick={()=>disable_employee(item.id)}>Enable</span>:<span className='btn btn-outline-warning btn-sm margin_left5' onClick={()=>enable_employee(item.id)}>Disable</span>} <span className='btn btn-danger btn-sm margin_left5' onClick={()=>employee_delete(item.id)}>Delete</span></td>
          </tr>
         
      
      );
  });
  }
  return (
    <div className='row mt-2'>
      <div className='col-12 paddingR28'>
      <Breadcrums name='View Employee'/>
        <div className='row'>
          <div className='col-12 cardHeader'>
            <a><SortOutlinedIcon className='ThreeLine' /></a>
            <a><p className='SortText marginT15'>Sort by</p></a>
            <div className='FilterImage'></div>
            <a><p className='SortText marginT20'>Filter</p></a>
            <Link to='/admin/add_employee'><AddBoxIcon className='PlusIcon' /></Link>
            {/* <FontAwesomeIcon icon='fa-solid fa-filter' /> */}
          </div>
        </div>
        {/* first Row */}
        <div className='row card table-responsive'>
        <table className="table">
        <thead className="thead-dark">
          <tr className='Text_Align_center'>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">User Type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className='Text_Align_center'>
        {viewdata}
        </tbody>
      </table>
          
        </div>
    

      </div>
    </div>

  );
}


export default View_employee;
