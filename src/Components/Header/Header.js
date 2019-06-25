import React from 'react';
import {Link} from 'react-router-dom';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import mysvg from '../../images/knots-vows.svg';
import { MDBDataTable } from 'mdbreact';
import BootstrapTable from 'react-bootstrap-table-next';
import TableHeaderColumn from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Modal, Button, Form } from 'react-bootstrap';
import './Header.css';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.open=this.open.bind(this);
    this.close=this.close.bind(this);
  }
  operation() {
    this.setState({
        showMe: !this.state.showMe
    })
}
getInitialState() {
    return { showModal: false };
}

close() {
    this.setState({ showModal: false });
}

open() {
    this.setState({ showModal: true });
}
  render(){
    return(
    <div className="main">
    <div className="experts" style={{ backgroundColor: "#f03690", height: "50px" }}>
        <p className="admin">Admin</p>
    </div>
    <div style={{padding:"10px"}}>
        <img src={mysvg} className="logo1" />
        {/* <Link onClick={this.open} style={{ paddingLeft: "30%" }}>Login</Link> */}
        <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <button>Login</button>
            </Form>
        </Modal>
    </div>
  
</div>);
  }
 
}

export default Header;