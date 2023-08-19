import React from 'react';
import { shallow } from 'enzyme';
import { Cart } from '../components/Cart';

describe('Cart component', () => {
  const mockCart = {
    cartItems: [
      { id: 1, name: 'Product 1', price: 10, cartQuantity: 2 },
      { id: 2, name: 'Product 2', price: 15, cartQuantity: 1 },
    ],
    cartTotalAmount: 35,
  };

  const mockDispatch = jest.fn();

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
  }));

  it('renders empty cart message', () => {
    const wrapper = shallow(<Cart cart={{ cartItems: [] }} />);
    expect(wrapper.find('.cart-empty').exists()).toBe(true);
  });

  it('renders cart items', () => {
    const wrapper = shallow(<Cart cart={mockCart} />);
    expect(wrapper.find('.cart-item').length).toBe(mockCart.cartItems.length);
  });

  it('handles remove from cart', () => {
    const wrapper = shallow(<Cart cart={mockCart} />);
    wrapper.find('button').at(0).simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('handles clear cart', () => {
    const wrapper = shallow(<Cart cart={mockCart} />);
    wrapper.find('.clear-btn').simulate('click');
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
