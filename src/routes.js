import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Customers from './Components/Customers/Customers';
import BarChart from './Components/BarChart/BarChart';
import Home from './Components/Home/Home';
import Wishlist from './Components/Wishlist/Wishlist';
import ServiceEnquiries from './Components/ServiceEnquiries/ServiceEnquiries';
import GeneralEnquiries from './Components/GeneralEnquiries/GeneralEnquiries';
import Details from './Components/Details/Details';
import Data from './Components/Data/Data';

const Routes =()=>(
    <BrowserRouter>
    <Switch>  
      <Route exact path="/Customers" component={Customers}/>
      <Route exact path="/BarChart" component={BarChart}/>
      <Route exact path="/ServiceEnquiries" component={ServiceEnquiries}/>
      {/* <Route exact path="/GeneralEnquiries" component={GeneralEnquiries}/> */}
      <Route exact path="/Wishlist" component={Wishlist}/>
      {/* <Route exact path="/Details" component={Details}/> */}
      {/* <Route exact path="/Data" component={Data}/> */}
      <Route exact path="/" component={Home}/>
      
</Switch>
</BrowserRouter>

)

export default Routes;