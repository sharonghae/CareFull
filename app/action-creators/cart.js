'use strict';


//synchronous
const getOrderDetailsAction = (orderDetails) => ({
	type: 'GET_ORDER_DETAILS',
	orderDetails: orderDetails
});

//asychronous
export const fetchOrderDetails = () => 
  dispatch => 
    fetch(`/api/cart/`) 
      .then(res => res.json())
      .then(orderDetails => dispatch(getOrderDetailsAction(orderDetails)));
  