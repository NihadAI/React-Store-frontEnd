import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import productsReducer, { productsFetch } from '../slices/productsSlice';

// jest.mock('axios');
// const axios = require('axios');


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('productsSlice', () => {
  it('should handle productsFetch async action', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    axios.get.mockResolvedValue({ data: mockData });

    const expectedActions = [
      productsFetch.pending(),
      productsFetch.fulfilled(mockData),
    ];

    const store = mockStore({ products: { items: [], status: null } });

    await store.dispatch(productsFetch());

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('should handle productsFetch async action when rejected', async () => {
    const mockError = new Error('An error occurred.');
    axios.get.mockRejectedValue(mockError);

    const expectedActions = [
      productsFetch.pending(),
      productsFetch.rejected(),
    ];

    const store = mockStore({ products: { items: [], status: null } });

    await store.dispatch(productsFetch());

    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });

  it('should handle productsFetch async action and update the state', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    axios.get.mockResolvedValue({ data: mockData });

    const initialState = { items: [], status: null };
    const expectedState = { items: mockData, status: 'success' };

    const store = mockStore(initialState);

    await store.dispatch(productsFetch());

    const actualState = store.getState().products;
    expect(actualState).toEqual(expectedState);
  });

  it('should handle productsFetch async action when rejected and update the state', async () => {
    const mockError = new Error('An error occurred.');
    axios.get.mockRejectedValue(mockError);

    const initialState = { items: [], status: null };
    const expectedState = { items: [], status: 'rejected' };

    const store = mockStore(initialState);

    await store.dispatch(productsFetch());

    const actualState = store.getState().products;
    expect(actualState).toEqual(expectedState);
  });

  it('should return the initial state', () => {
    expect(productsReducer(undefined, {})).toEqual({
      items: [],
      status: null,
    });
  });
});
