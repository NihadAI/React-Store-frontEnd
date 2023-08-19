import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NavBar from '../components/NavBar';

describe('NavBar component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    cart: {
      cartTotalQuantity: 5,
    },
  };
  const store = mockStore(initialState);

  test('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );

    const logoText = getByText('OnlineShop');
    const bagIcon = getByText('Bag');
    const bagQuantity = getByText('5');

    expect(logoText).toBeInTheDocument();
    expect(bagIcon).toBeInTheDocument();
    expect(bagQuantity).toBeInTheDocument();
  });
});
