import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SortOutlinedIcon from '@material-ui/icons/SortOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { FaHome } from 'react-icons/fa';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Breadcrums from "./Breadcrums";
// import Breadcrums from "./Breadcrums";
// import FontAwesomeIcon from '@fortawesome/free-solid-svg-icons';

function View_company() {

  const [loading, setLoading] = useState(true);
  const [companylist, setCompany] = useState([]);
  function showlist() {
    axios.get('api/view_company').then(res => {

      if (res.status === 200) {
        setCompany(res.data.company)
      }

      setLoading(false);

    });
  }
  useEffect(() => {
    showlist();
  }, []);



  function company_delete(id) {
    axios.delete('api/delete_company/' + id).then((res) => {
      if (res.data.status === 204) {

        swal('warning', res.data.message, 'warning');
        showlist();
      }
    })

  }
  function enable_company(id) {

    axios.post('api/enable_company/' + id).then((res) => {
      if (res.data.status === 200) {

        showlist();

        swal('success', res.data.message, 'success');
        //location.reload();
      }

    })

  }

  function disable_company(id) {

    axios.post('api/disable_company/' + id).then((res) => {
      if (res.data.status === 200) {


        swal('success', res.data.message, 'success');
        showlist();

      }

    })

  }
  if (loading == true) {
    return (<div>Loding</div>)
  } else {
    var viewdata = '';

    viewdata =
      companylist.map((item, index) => {
        return (
          <tr key={item.id}>
            <th scope="row">{index + 1}</th>
            <td>{item.company_legal_name}</td>
            <td>{item.company_popular_name}</td>
            <td>{item.company_url}
            </td>
            <td className="DisPlayInline"><Link className='btn btn-success btn-sm margin_left5 btn-bg-Green' to={`edit_company/${item.id}`} >Edit</Link>
              {(item.status == 'enable') ? <span className='btn btn-outline-primary btn-sm margin_left5' onClick={() => disable_company(item.id)}>Enable</span> : <span className='btn btn-outline-warning btn-sm margin_left5' onClick={() => enable_company(item.id)}>Disable</span>} <span className='btn btn-danger btn-sm margin_left5' onClick={() => company_delete(item.id)}>Delete</span>
            </td>
          </tr>
        );
      });
  }
  return (
    
    <div className='row'>    
      <div className='col-12 paddingR28 '>

        <Breadcrums name="View Company"/>
        <div className='row'>
          <div className='col-12 cardHeader'>
            <a><SortOutlinedIcon className='ThreeLine' /></a>
            <a><p className='SortText marginT15'>Sort by</p></a>
            <div className='FilterImage'></div>
            <a><p className='SortText marginT20'>Filter</p></a>
            <Link to='/admin/add_company_details'><AddBoxIcon className='PlusIcon' /></Link>
            {/* <FontAwesomeIcon icon='fa-solid fa-filter' /> */}
          </div>
        </div>
        {/* first Row */}
        <div className='row card table-responsive'>
          <table className="table">
            <thead className="thead-dark">
              <tr className='Text_Align_center'>
                <th scope="col">#</th>
                <th scope="col">Company Legal Name</th>
                <th scope="col">Company Popular Name</th>
                <th scope="col">Website Url</th>
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


export default View_company;
