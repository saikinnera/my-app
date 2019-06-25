import React from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import { MDBDataTable } from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Header from '../Header/Header';
class ServiceEnquiries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      columns: [
        {
          dataField: 'EnquiryId',
          text: 'EnquiryId',
          sort: true,
  
        },{
        dataField: 'PersonName',
        text: 'Name',
        sort: true,

      },
      {
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
        dataField: 'city',
        text: 'City',
        sort: true
      },
      {
        dataField: 'Services',
        text: 'Services',
        sort: true
      },
  
      ]
    }
  }
  componentWillMount() {
    this.getEnquirydetails();
  }
  getEnquirydetails() {
    fetch('https://prod.ahwanam.com/api/Serviceenquiries').then((res) => res.json()).then((res) => {
      this.setState({
        details: res
      })
    })
  }
  dateFormatter(cell) {
    if (!cell) {
          return "";
    }
    return `${moment(cell).format("DD-MM-YYYY")? moment(cell).format("DD-MM-YYYY"):moment(cell).format("DD-MM-YYYY") }`;
}
  render() {
    return (
      <div>
        <Header />
        <div className="row" style={{ marginRight: "0px", padding: "20px" }}>
          <div className="col-sm-2 col-md-2">
            <div className="lst">My List</div>
            <ul className="list-group item" style={{ paddingLeft: "59px" }}>
              <div>
                <li className="name1">
                  <Link to="/" style={{color:"black" }}>General Enquiries</Link>
                </li>
              </div>
              <div>
                <li className="name">
                  <Link to="/ServiceEnquiries" style={{color:"black" }}>Service Enquiries</Link></li>
              </div>
              <div>
                <li className="name">
                  <Link to="/Customers" style={{color:"black" }}>Customers</Link>
                </li>
              </div>
              <div>
              <li className="name">
                    <Link to="/Wishlist" style={{color:"black" }}>Wishlist</Link></li>
              </div>
            </ul>
          </div>
          <div className="col-sm-10 col-md-10">
            <h4 style={{color:"#f03690", fontWeight: "400"}}>Service Enquiries</h4>
            <BootstrapTable className="tst"
              keyField='EnquiryId'
              data={this.state.details}
              columns={this.state.columns} pagination={paginationFactory()}
              filter={filterFactory()} />
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
export default ServiceEnquiries;