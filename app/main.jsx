'use strict'
import React from 'react'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import store from './store'
import AllProductsContainer from './containers/AllProductsContainer';
import ProductContainer from './containers/ProductContainer';
import fetchOneProduct from './action-creators/product';
import fetchReviews from './action-creators/review';

import CartContainer from './containers/CartContainer'
import OrderContainer from './containers/OrderContainer'

import Login from './components/Login'
import Signup from './components/signup'
import AdminDashboard from './components/AdminDashboard'

import Checkout from './components/Checkout'

import Order from './components/Order'
import Navbar from './components/Navbar'

import WhoAmI from './components/WhoAmI'


//should we replace the root with the Main

const Main = connect(
  //mapStateToProps
  ({ auth, products }) => ({ user: auth, products: products })

) (
  ({ user, products, children }) => 
    <div id='main' className=''>
      <Navbar inventory={products} loginButton={user ? <WhoAmI/> : <Login/>}/>
      {children}
    </div>
    
  
)

function onProductEnter (nextRouterState) {
  store.dispatch( fetchOneProduct(nextRouterState.params.productId) );  //puts current product on the props
  store.dispatch( fetchReviews(nextRouterState.params.productId) );  //puts reviews on the props of the Product component
}

render (
  <Provider store={store}>
    <Router history={browserHistory}>
     <Route path="/" component={Main}>
      <IndexRedirect to="products" />
      <Route path="products" component={AllProductsContainer}/>
      <Route path="category/:categoryName" component={AllProductsContainer}/>
        <Route path="products/:productId" component={ProductContainer} onEnter={onProductEnter} />
        <Route path="login" component={Login} />
        <Route path="signup" component={Signup}/>
        <Route path="cart" component={CartContainer}/>
        <Route path="checkout" component={Checkout} />
        <Route path="order" component={OrderContainer} />
        <Route path='dashboard' component={AdminDashboard} />
      </Route>

    </Router>
  </Provider>
  ,
  document.getElementById('app')
)
