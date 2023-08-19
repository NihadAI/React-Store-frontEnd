import React, { Component } from "react";
import { connect } from "react-redux";
import { FormLabel, FormControl, Button } from "react-bootstrap";

import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../slices/cartSlice";

import { Link } from "react-router-dom";

class Cart extends Component {

  state = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  componentDidMount() {
    this.props.dispatch(getTotals());
  }

  handleAddToCart = (product) => {
    this.props.dispatch(addToCart(product));
  };

  handleDecreaseCart = (product) => {
    this.props.dispatch(decreaseCart(product));
  };

  handleRemoveFromCart = (product) => {
    this.props.dispatch(removeFromCart(product));
  };

  handleClearCart = () => {
    this.props.dispatch(clearCart());
  };


  render() {
    const { cart } = this.props;

    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={cartItem.image} alt={cartItem.name} />
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button
                        onClick={() => this.handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => this.handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => this.handleAddToCart(cartItem)}>
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button
                className="clear-btn"
                onClick={() => this.handleClearCart()}
              >
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                <button>Check out</button>
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
        <FormLabel>First Name</FormLabel>
        <FormControl
          type="text"
          placeholder="Enter your first name"
          required
          onChange={(e) => this.handleChange({ name: "firstName", value: e.target.value })}
        />
        <FormLabel>Last Name</FormLabel>
        <FormControl
          type="text"
          placeholder="Enter your last name"
          required
          onChange={(e) => this.handleChange({ name: "lastName", value: e.target.value })}
        />
        <FormLabel>Phone</FormLabel>
        <FormControl
          type="text"
          placeholder="Enter your phone number"
          onChange={(e) => this.handleChange({ name: "phone", value: e.target.value })}
        />
        <FormLabel>Email</FormLabel>
        <FormControl
          type="email"
          placeholder="Enter your email address"
          required
          onChange={(e) => this.handleChange({ name: "email", value: e.target.value })}
        />
        <FormLabel>Delivery Address</FormLabel>
        <FormControl
          type="text"
          placeholder="Enter your delivery address"
          required
          onChange={(e) => this.handleChange({ name: "deliveryAddress", value: e.target.value })}
        />
        <Button type="submit">Submit</Button>
      </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Cart);
