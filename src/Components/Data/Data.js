import React from 'react';
import { MDBDataTable } from 'mdbreact';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
class Data extends React.Component{
 constructor(props){
   super(props);
   this.state={
       Total:[],show: false,details2:[],   defaultSortName: 'name', 
       
   }
   this.handleShow = this.handleShow.bind(this);
   this.handleClose = this.handleClose.bind(this);
   this.cellButton=this.cellButton.bind(this);
   this.options = {
    defaultSortName: 'WishlistdetailId',  
    defaultSortOrder: 'desc',
   
  };
 }
 
 componentDidMount(){
   this.getEnquirydetails()
 }
 cellButton(WishlistdetailId) {
   return (
      <button 
         className="btns"
         onClick={() => 
         this.handleShow(WishlistdetailId)}>
     Details
      </button>
   )}
 getEnquirydetails() {
  fetch('https://prod.ahwanam.com/api/allwishlist').then((res) => res.json()).then((res) => {
      this.setState({
          Total: res
      })
  })
}
handleClose() {
  this.setState({ show: false });
}
handleShow(WishlistdetailId) {
  fetch('https://prod.ahwanam.com/api/wishlist/wishlistdetails?wishlist_id='+WishlistdetailId).then((res) => res.json()).then((res) => {
    this.setState({
      details2: res
    })
  })
  this.setState({ show: true });
}
  render(){
    return(
      <div className="table">
         <BootstrapTable data={this.state.Total} pagination={paginationFactory()} keyField='WishlistdetailId' options={ this.options }  search={ true } >
        <TableHeaderColumn dataField='WishlistdetailId' dataSort={ true }>WishlistdetailId</TableHeaderColumn>
        <TableHeaderColumn dataField='UserLoginId'>UserLoginId</TableHeaderColumn>
        <TableHeaderColumn dataField='wishlistName'>wishlistName</TableHeaderColumn>
        <TableHeaderColumn
        dataField='WishlistdetailId'
        dataFormat={this.cellButton.bind(this)}
      />
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
    );

  }

}
export default Data;