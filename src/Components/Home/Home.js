import React from 'react';
import './Home.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import "mdbreact/dist/css/mdb.css";
import mysvg from '../../images/knots-vows.svg';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Modal, Form } from 'react-bootstrap';
import * as Moment from 'moment';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: [], details2: [], status: '',message:'',datacomment:[],comment:'',UpdatedDate:'',
            enquiry_id:localStorage.getItem('enquiryid'),
           columns: [
                {
                    dataField: 'EnquiryId',
                    text: 'EnquiryId',
                    sort: true,
                },
                {
                    dataField: 'PersonName',
                    text: 'Name',
                    sort: true,
                    filter: textFilter()

                }, {
                    dataField: 'SenderEmailId',
                    text: 'Email ID',
                    sort: true,
                    filter: textFilter()
                },
                {
                    dataField: 'SenderPhone',
                    text: 'Phone Number',
                    sort: true,
                },
                {
                    dataField: 'EnquiryDetails',
                    text: 'Enquiry Details',
                    sort: true,
                },
                {
                    dataField: 'Status',
                    text: 'Enquiry Status',
                    sort: true,
                },
                {
                    dataField: 'EnquiryDate',
                    text: 'Event Date',
                    sort: true,
                    filter: textFilter(),
                    formatter: (cell) => {
                        let dateObj = cell;
                        dateObj = new Date(cell);
                        return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
                    }
                },
                {
                    dataField: 'UpdatedDate',
                    text: 'Requested Date',
                    sort: true,
                    formatter: (cell) => {
                        let dateObj = cell;
                        dateObj = new Date(cell);
                        return `${('0' + dateObj.getDate()).slice(-2)}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${dateObj.getFullYear()}`;
                    }
                }, {
                    dataField: 'EnquiryId',
                    text: 'Details',
                    sort: true,
                    formatter: (EnquiryId) => {
                        return (
                            <div>
                                <button onClick={() => this.open(EnquiryId)} className="btns">Details</button>
                            </div>
                        );
                    }
                }
            ]
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e) {
        const state = this.state
        state[e.target.id] = e.target.value;
        this.setState(state);
      }
    handleChange1(e) {
        var Status=e.target.value;
        var enquiry_id = localStorage.getItem('enquiryid');
        fetch('https://api.ahwanam.com/api/updatestatus', {
            method: 'POST',
            body: JSON.stringify({
                status: Status, enquiry_id: enquiry_id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then(() => {
                this.setState({
                    enquiry_id: '', status: ''
                });  
                window.location.reload();        
            })   
    }
    operation() {
        this.setState({
            showMe: !this.state.showMe
        })
    }
    operation1() {
        this.setState({
            show: !this.state.show
        })
    }
    getInitialState() {
        return { showModal: false };
    }
    close() {
        this.setState({ showModal: false });
    }
    open(EnquiryId) {
        localStorage.setItem('enquiryid',EnquiryId);
        fetch('https://api.ahwanam.com/api/GetEnquiry?enquiry_id=' + EnquiryId).then((res) => res.json()).then((res) => {
            this.setState({
                details2: res
            });
            this.getcomment(EnquiryId);
        })
        this.setState({ showModal: true });
    }
    componentWillMount() {
        this.getEnquirydetails();
    }
    getEnquirydetails() {
        fetch('https://api.ahwanam.com/api/generalenquiries').then((res) => res.json()).then((res) => {
            this.setState({
                details: res
            })
        })
    }
    getcomment(enquiry_id){
        fetch('https://api.ahwanam.com/api/getcomments?enquiry_id='+enquiry_id).then((res) => res.json()).then((res) => {
            this.setState({
                datacomment: res
            })
        })
      }
    Savecomment(e) {    
        var enquiry_id = localStorage.getItem('enquiryid');
        const {admin_comment,user_id} = this.state;  
        e.preventDefault();
        fetch('https://api.ahwanam.com/api/savecomment', {
          method: 'POST',
          body: JSON.stringify({
            admin_comment:admin_comment,enquiry_id:enquiry_id,user_id:user_id
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((res) => { 
            this.setState({
                admin_comment:'',enquiry_id:'',user_id:'',               
            });
            alert('sucess');
            this.getcomment(enquiry_id);
            return res.success;
          })
      }
   
    render() {
        return (
            <div className="main">
                <div className="experts">
                    <p className="admin">Admin</p>
                </div>
                <div style={{ padding: "10px" }}>
                    <img src={mysvg} className="logo1" />
                </div>
                <div className="row" style={{ marginRight: "0px", padding: "30px" }}>
                    <div className="col-sm-2 col-md-2">
                        <div className="lst">My List</div>
                        <ul className="list-group item" style={{ paddingLeft: "59px" }}>
                            <div>
                                <li className="name">
                                    <Link to="/" style={{ color: "black" }}>General Enquiries</Link>
                                </li>
                            </div>
                            <div>
                                <li className="name">
                                    <Link to="/ServiceEnquiries" style={{ color: "black" }}>Service Enquiries</Link></li>
                            </div>
                            <div>
                                <li className="name">
                                    <Link to="/Customers" style={{ color: "black" }}>Customers</Link>
                                </li>
                            </div>
                            <div>
                                <li className="name">
                                    <Link to="/Wishlist" style={{ color: "black" }}>Wishlist</Link></li>
                            </div>
                        </ul>
                    </div>
                    <div className="col-sm-10 col-md-10">
                        <h4 style={{ color: "#f03690", fontWeight: "400" }}>General Enquiries</h4>
                        <BootstrapTable className="tst"
                            keyField='EnquiryId'
                            data={this.state.details}
                            columns={this.state.columns} pagination={paginationFactory()}
                            filter={filterFactory()} />
                        <Modal show={this.state.showModal} onHide={this.close} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title style={{ color: "#f03690" }}>Enquiry Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div style={{ border: "solid 1px", borderColor: "#f03690" }}>
                                        <div className="tst1">
                                            <div className="row detail">
                                                <div className="col-sm-6 col-md-6">
                                                    <b>Enquiry Id  :</b> <span>{this.state.details2.EnquiryId}</span>                                               
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <b> User Name  :</b> <span>{this.state.details2.PersonName}</span>
                                                </div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-sm-6 col-md-6">
                                                    <b> Email Id  :</b> <span>{this.state.details2.SenderEmailId}</span>
                                                </div>
                                                <div className="col-sm-6 col-md-6">
                                                    <b> Phone Number  : </b> <span>{this.state.details2.SenderPhone}</span>
                                                </div>
                                            </div>
                                            <div className="row detail">
                                                <div className="col-sm-6 col-md-6">
                                                    <b> Enquiry Details  : </b> <span>{this.state.details2.EnquiryDetails}</span>
                                                </div>
                                                <div className="col-sm-4 col-md-4">
                                                    <b>Status  :</b>
                                                    <span>
                                                        <select className="pform" id={this.props.Status} value={this.state.selectValue}
                                                            onChange={this.handleChange1.bind(this)} required>
                                                            <option value="Open">Open</option>
                                                            <option value="Inprogress">Inprogress</option>
                                                            <option value="Close">Close</option>
                                                        </select>                                     
                                                    </span>
                                                </div>                                
                                            </div>
                                            <div className="row details">                                              
                                                <button className="save">Save</button>                                                  
                                            </div>                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="comment">
                                    <label className="addcom"><b>Add Comment  :</b></label>
                                    <textarea type="text" className="form-control" id="admin_comment" name="admin_comment" style={{ backgroundColor: "#E6E6FA" }}
                                       rows="3" onChange={this.handleChange} value={this.state.admin_comment}/>                     
                                </div>
                                <div className="button" style={{ marginTop: "15px" }}>
                                    <button className="save" onClick={this.Savecomment.bind(this)}>Save</button>
                                </div>
                                <div>
                    {this.state.datacomment.map((list1) => (
                       
                        <div id="display-data">
                   <span style={{marginLeft:"20px"}}>{Moment(Date(list1.UpdatedDate)).format("lll")}</span>
                    <div>
                    <textarea type="text" className="form-control" id="comment" name="comment" style={{ backgroundColor: "#E6E6FA" }}
                    rows="2" onChange={this.handleChange} value={list1.comment}/>   
                    </div>   
                        </div>
                    ))}
                 </div>
                                 <div >
                           
                                 </div>
                       
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
                <div className="footer">
                    <div className="row" id="txt1">
                        <div className="col-sm-12 col-md-12" >
                            <p className="kv">Knots&Vows</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;