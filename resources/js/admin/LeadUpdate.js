import React, {useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {Form  } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

 const LeadUpdate=(props)=>{
     console.warn("props",props.match.params.id);
    //  const [fetchdata, setFetchData] = useState([]);
     const url="http://localhost:3000/addlead";
     const [data,setData] = useState([]);
     const [data1, setData1]=useState({
      name: data.name,
      address: data.address,
      email: data.email,
      contact: data.contact,
      city:data.city,
      business:data.business,
      website:data.website,
      reg_comments:data.reg_comments,
      perspective:data.perspective,
      exdate:data.exdate
     })
    function submit(e){
      e.preventDefault();
      axios.patch("http://localhost:3000/addlead/"+props.match.params.id,{
        name:data1.name,
        address:data1.address,
        contact:data1.contact,
        city:data1.city,
        business:data1.business,
        website:data1.website,
        reg_comments:data1.reg_comments,
        address:data1.address,
        perspective:data1.perspective,
        exdate:data1.exdate
      })
      .then(res=>{
        // alert(res.data.name);
        alert("Successfully Updated data.")
        console.log(res.data.name)
      })
    }
   
     function handle(e){
       const newdata={...data1}
       newdata[e.target.id]= e.target.value
       setData1(newdata)
       console.log(newdata)
     }
   
     useEffect(async()=>{
         let result=await fetch("http://localhost:3000/addlead/"+props.match.params.id);
         result = await result.json();
         setData(result);
         //console.log(data);
     })
    return(
        <div className="container mt-3">
        <div className="row">
            <div className="col-md-12">
              <div style={{textAlign:'left',margin:10}}>
                <h3>Update Lead</h3>
              </div>
            <Form onSubmit={(e)=>submit(e)}>
         <Form.Row style={{textAlign:'left'}}>
           <Col>
           <Form.Label htmlFor="inputPassword5" >Name</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="name" name="name" defaultValue={data.name} type="text" placeholder="Name" />
           </Col>
           <Col>
           <Form.Label htmlFor="inputPassword5" >Email</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="email" defaultValue={data.email} type="text" placeholder="Email" />
           </Col>
         </Form.Row>
         <br/>
         <Form.Row style={{textAlign:'left'}}>
         <Col>
         <Form.Label htmlFor="inputPassword5" >Mobile</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="contact" defaultValue={data.contact} type="number" placeholder="Contact " />
           </Col>
           <Col> 
           <Form.Label htmlFor="inputPassword5" >City</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="city" defaultValue={data.city} type="text" placeholder="City" />
           </Col>
           
          </Form.Row>
          <br/>
          <Form.Row style={{textAlign:'left'}}>
         <Col> 
         <Form.Label htmlFor="inputPassword5" >Address</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="address" defaultValue={data.address} type="text" placeholder="Address" />
           </Col>
           <Col>
           <Form.Label htmlFor="inputPassword5" >Business</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="business" defaultValue={data.business} type="text" placeholder="Business" />
           </Col>
          </Form.Row>
          <br/>
          <Form.Row style={{textAlign:'left'}}>
         <Col> 
         <Form.Label htmlFor="inputPassword5" >Perspective</Form.Label>
           {/* <Form.Control onChange={(e)=>handle(e)} id="perspective" defaultValue={data.perspective} type="text" placeholder="Perspective" /> */}
           <Form.Control
          as="select"
          custom
          onChange={(e)=>handle(e)} id="perspective"
        >
          <option value="Interested">Interested</option>
          <option value="callback">Call Back</option>
          <option value="ringing">Ringing</option>
          <option value="notinterested">Not Interested</option>
        </Form.Control>
           </Col>
           <Col>
           <Form.Label htmlFor="inputPassword5" >Extended date</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="exdate" defaultValue={data.exdate} type="date" placeholder="Date" />
           </Col>
          </Form.Row>
          <br/>
          <Form.Row style={{textAlign:'left'}}>
         <Col> 
         <Form.Label htmlFor="inputPassword5" >Website</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="website" defaultValue={data.website} type="text" placeholder="Wesite Url" />
           </Col>
           <Col>
           <Form.Label htmlFor="inputPassword5" >Description</Form.Label>
           <Form.Control onChange={(e)=>handle(e)} id="reg_comments" defaultValue={data.reg_comments} type="text" placeholder="Description" />
           </Col>
          </Form.Row> 
          <br/> 
           <br/>
           <button className='btn btn-primary'>Submit</button>
         </Form>
            </div>
        </div>
       </div>
    );
}
export default withRouter(LeadUpdate);