import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { useGetAllProductsQuery } from '../slices/productsApi';
import Home from '../components/Home';

const mockDispatch = jest.fn();
const mockHistoryPush = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

jest.mock('../slices/productsApi', () => ({
  useGetAllProductsQuery: jest.fn(),
}));

describe('Home component', () => {
  const mockStore = configureStore();
  const initialState = {
    products: {
      items: [],
      status: 'success',
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders loading when status is pending', () => {
    useGetAllProductsQuery.mockReturnValue({
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders unexpected error when status is neither success nor pending', () => {
    useGetAllProductsQuery.mockReturnValue({
      data: null,
      error: {},
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('Unexpected error occurred...')).toBeInTheDocument();
  });

  test('renders products when status is success', () => {
    const mockData = [
      {
        id: 1,
        name: 'Product 1',
        image: 'product1.jpg',
        desc: 'Description 1',
        price: 10,
      },
      {
        id: 2,
        name: 'Product 2',
        image: 'product2.jpg',
        desc: 'Description 2',
        price: 20,
      },
    ];

    useGetAllProductsQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('New Arrivals')).toBeInTheDocument();
    expect(screen.getAllByTestId('product')).toHaveLength(2);
  });

  test('handles adding product to favorites', () => {
    const mockData = [
      {
        id: 1,
        name: 'Product 1',
        image: 'product1.jpg',
        desc: 'Description 1',
        price: 10,
      },
    ];

    useGetAllProductsQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const addToFavoritesButton = screen.getByText('Add To Favorites');
    fireEvent.click(addToFavoritesButton);

    expect(mockDispatch).toHaveBeenCalledWith(addToFavorites(mockData[0]));
    expect(mockHistoryPush).toHaveBeenCalledWith('/favorites');
  });

  test('handles adding product to cart', () => {
    const mockData = [
      {
        id: 1,
        name: 'Product 1',
        image: 'product1.jpg',
        desc: 'Description 1',
        price: 10,
      },
    ];

    useGetAllProductsQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Home />
        </Router>
      </Provider>
    );

    const addToCartButton = screen.getByText('Add To Cart');
    fireEvent.click(addToCartButton);

    expect(mockDispatch).toHaveBeenCalledWith(addToCart(mockData[0]));
    expect(mockHistoryPush).toHaveBeenCalledWith('/cart');
  });
});
