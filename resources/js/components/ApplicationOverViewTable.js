import React, { useState,useEffect } from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.css';
import { Spin } from 'antd';
import Select from 'react-select';
import {useHistory} from 'react-router-dom';
const columns = [
  {
    title: 'Image',
    dataIndex: 'image',
    

  },
  {
    title: 'UID',
    dataIndex: 'uid',
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
    title: 'Gender',
    dataIndex: 'gender',
    sorter: (a, b) => a.gender.length - b.gender.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

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
  {
    title: 'Time',
    dataIndex: 'time',
    sorter: (a, b) => a.time.length - b.time.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

  },
  {
    title: 'Company',
    dataIndex: 'company',
    sorter: (a, b) => a.company.length - b.company.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: (a, b) => a.type.length - b.type.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.length - b.status.length,
    sortDirections: ['ascend', 'descend', 'ascend'],

  },
];

function ApplicationOverViewTable() {
  const history=useHistory();
  const[row,setrow]=useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setrow(selectedRows);
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
     
    }
   
  };
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState([]);
  const selectionType= useState('checkbox');
  const auth_token=localStorage.getItem('isUserLogged');
  const user_name = localStorage.getItem('auth_name');
  const user_id = localStorage.getItem('auth_id');
  // console.log(auth_token)auth_id
  // console.log("user_name",user_name)
  // console.log("user_id" , user_id)
  function showApplication(){
    axios.get('api/view_application/'+auth_token).then((res) => {       
       console.log("application consooe",res)
       console.log("application consooe1",res.data.application)
      setApplication(res.data.application);
      setLoading(false);
    })
  }
  useEffect(() => {
    showApplication();
  }, [])

  
  const data = application.map((response,index) =>
  
  (

    {
      key: index+1,
      image: response.profile_pic,
      uid: response.id,
      name: response.name,
      gender:response.gender,
      contact:response.mobile,
      location: response.state,
      time:response.created_at,
      company:response.company_legal_name,
      title:response.job_title,
      type:response.job_type,
      status:response.status,
    }
  )
  
  
  )
  const [employee, setEmployee] = useState('');
  const [employeeResponse, setemployeeResponse] = useState([]);
  
  // Fetching State
  useEffect(() => {
    axios.get('api/assign_employee').then((res) => {
      setemployeeResponse(res.data.employee);

    })
  }, [])
  const employeeoptions  = employeeResponse.map((response) => (
    { label: response.name, value: response.id }
  ))
  const handleEmployee = val => {
    setEmployee(val);
  }
  function Assignapplication (){
    var app_id=[];
    for(let i=0; i<row.length;i++){
      //console.log(row[i].uid);
      app_id.push(row[i].uid);
    }

    const AssignData ={
      assign:employee.value,
     application_id:app_id 
  };
    axios.post('api/assign_application',AssignData).then(res=>{
        console.log(res.data);
      if(res.data.status ===200){
           
       
           swal("Success",res.data.message,"success");
           setEmployee('');
           setrow('');
           showApplication();

         }else{
          console.log(res.data.validation_errors);
          swal('Error',res.data.message,'error');
         }
  });
}
 function application_view(id){
  history.push('/admin/application_view/'+id);
  
 }
  if(loading==true){
    return(
    //<div>Loding</div>
    <div className="example">
    <Spin />
  </div>)
  }else if(user_id == 1){
    return (
    <div>  
  
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Assign Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <Select
                                className="custom-select  custom-selectMultiSelect"
                                onChange={handleEmployee}
                                value={employee}
                                name="empolyee"
                                options={employeeoptions}
                                placeholder='Select Employee'
                            
                              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <span  className="btn btn-primary" onClick={()=>Assignapplication()}>Assign</span>
            </div>
        </div>
        </div>
      </div>
  
       
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          pagination={{ pageSize: 10 }}
          dataSource={data}
          onRow={record => ({
            onClick: () => {
              console.log(record);
              application_view(record.uid);
            },
          })}
        />
    </div>
    );
       }
  
  else
  
  {
  return (
  <div>


    {/* <!-- Modal --> */}
    

     
      <Table
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        // }}
        columns={columns}
        pagination={{ pageSize: 10 }}
        dataSource={data}
        onRow={record => ({
          onClick: () => {
            console.log(record);
            application_view(record.uid);
          },
        })}
      />
  </div>
  );
     }
}

export default ApplicationOverViewTable;