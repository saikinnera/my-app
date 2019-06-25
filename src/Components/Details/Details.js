import React from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Header from '../Header/Header';
import { Modal, Button, Form } from 'react-bootstrap';
import './Details.css';
class Details extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      details: [], show: false,datas:[], showMe:false,showMe1:false,show: false,details2:[],
      columns: [{
        dataField: 'WishlistdetailId',
        text: 'Wishlist Id',
        sort: true
      },
      {
        dataField: 'wishlistName',
        text: 'User Name',
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
        sort: true
      },
      {
        dataField: 'WishlistdetailId',
        text: 'Get Details',
        sort: true,    
        formatter: (WishlistdetailId) => {
          return (
            <div>
              <button onClick={()=>this.handleShow(WishlistdetailId)} className="btns">
                View Details
              </button>
            </div>
          );
        }
       
      },
      ]
    }
  
  }
 
  operation()
{
  this.setState({
    showMe:!this.state.showMe
  })
}
operation1()
{
  this.setState({
    showMe1:!this.state.showMe1
  })
}
  handleClose() {
    this.setState({ show: false });
  }
  handleShow(WishlistdetailId) {
     fetch('https://prod.ahwanam.com/api/wishlist/wishlistdetails?wishlist_id=' + WishlistdetailId).then((res) => res.json()).then((res) => {
      this.setState({
        details2: res
      })
    })
    this.setState({ show: true });
  }
  componentDidMount() { 
    this.getwishlist();
   
  }
  getwishlist() {
    fetch('https://prod.ahwanam.com/api/allwishlist').then((res) => res.json()).then((res) => {
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
            <ul className="list-group item" style={{ paddingLeft: "59px" }}>
              <div>
                <li className="name1">
                  <Link to="/" style={{ color: "black", fontWeight: "400" }}>General Enquiries</Link>
                </li>
              </div>
              <div>
                <li className="name">
                  <Link to="/ServiceEnquiries"  style={{ color: "black" }}>Service Enquiries</Link></li>
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
            <h4 style={{ color: "#f03690", fontWeight: "400" }}>Wishlist</h4>
            <BootstrapTable 
              keyField='ID' border={false}
              data={this.state.details}
              columns={this.state.columns} pagination={paginationFactory()}
              filter={filterFactory()}>
          
              </BootstrapTable>
              <Modal dialogClassName="my-modal" show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title style={{color:"#f03690"}}>Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {
                    this.state.details2.map((rowdata, i) => {
                      if (rowdata.adminvendors != '') {
                        return (<div className="t">
                         <div style={{paddingLeft: "20px"}}> {rowdata.category_name}</div>
                          {
                            (typeof (rowdata.adminvendors) == 'object') ?
                              <div className="row" style={{paddingLeft: "40px"}}>
                                {
                                  rowdata.adminvendors.map((subRowData, index) =>
                                    <div className="col-sm-3 col-md-3">
                                      <div className="card" id="data1">
                                        <img className="img1" src={subRowData.pic_url} />
                                        <div className="card-body">
                                          <div className="row">
                                            <div className="col-sm-8 col-md-8">
                                              <span className="txt2" style={{textOverflow:"ellipsis"}} numberOfLines={1} ellipsizeMode='head'>{subRowData.name}</span>
                                              <p className="txt1">{subRowData.city}</p>
                                              
                                            </div>
                                            <div className="col-sm-4 col-md-4">
                                              <p className="price">₹&nbsp;{subRowData.price.minimum_price}</p>
                                             <p className="date">{subRowData.wishlist_addeddate}</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>)
                                }
                              </div>
                              : null
                          }
                        </div>)
                      }
                      else {
                        return (<div></div>)
                      }
                    }
                    )
                  }
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
export default Details;