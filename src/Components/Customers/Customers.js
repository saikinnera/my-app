import React from 'react';
import {Link} from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import axios from 'axios';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Header from '../Header/Header';

class Customers extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      details: [],
      columns: [
        {
          dataField: 'UserLoginId',
          text: 'Login Id',
          sort: true,
          filter: textFilter()
  
        },
      {
        dataField: 'FirstName',
        text: 'Name',
        sort: true,

      },
      {
        dataField: 'AlternativeEmailID',
        text: 'Email ID',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'UserPhone',
        text: 'Phone Number',
        sort: true,
        filter: textFilter()
       
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
      },
      {
        dataField: 'Status',
        text: 'Status',
        sort: true
      }
      ]
    }
  }
  componentWillMount() {
    this.getwishlist();
  }
  getwishlist() {
    fetch('https://prod.ahwanam.com/api/alluserdetails').then((res) => res.json()).then((res) => {
      this.setState({
        details: res
      })
    })
  }
  render() {
    return (
      <div>
        <Header />
        <div className="row" style={{ marginRight: "0px", padding: "20px" }}>
          <div className="col-sm-2 col-md-2">
            <div className="lst">My List</div>
            <ul className="list-group item" style={{ paddingLeft: "59px",color:"black" }}>
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
            <h4 style={{color:"#f03690", fontWeight: "400"}}>Customer Details</h4>
            <BootstrapTable
              keyField='UserDetailId'
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
export default Customers;