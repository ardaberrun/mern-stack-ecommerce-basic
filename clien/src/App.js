import React from 'react';
import {BrowserRouter as Router, Switch,Route } from 'react-router-dom';
import Home from './views/Home';
import Membership from './views/Membership';
import AdminPanel from './views/AdminPanel';
import Product from './views/Product';
import PrivateRoute from './components/PrivateRoute';
import AdminProductForm from './components/AdminProductForm'
import AdminEditProductForm from './components/AdminEditProductForm'
import Cart from './views/Cart';


function App() {
  return (
    <Router>
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/category/:slug' exact component={Home}/> 

      <Route path='/product/:id' exact component={Product}/>

      <Route path='/membership' exact component={Membership}/>

      <Route path='/cart' exact component={Cart}/>

      <PrivateRoute path='/admin' exact component={AdminPanel}/>
      <PrivateRoute path='/admin/product' exact component={AdminProductForm}  />
      <PrivateRoute path='/admin/product/:id' exact component={AdminEditProductForm}/>
      
    </Switch>
  </Router>
  );
}

export default App;
