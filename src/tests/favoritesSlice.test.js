import configureStore from "redux-mock-store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../slices/favoritesSlice";

const mockStore = configureStore([]);

describe("favoritesSlice reducer", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      favorites: {
        items: [],
      },
    });
  });

  it("should handle addToFavorites", () => {
    const product = { id: 1, name: "Product 1" };

    store.dispatch(addToFavorites(product));

    const actions = store.getActions();
    const expectedPayload = { type: "favorites/addToFavorites", payload: product };

    expect(actions).toEqual([expectedPayload]);
  });

  it("should handle removeFromFavorites", () => {
    const initialState = {
      favorites: {
        items: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" },
        ],
      },
    };

    store = mockStore(initialState);

    const productToRemove = { id: 1, name: "Product 1" };

    store.dispatch(removeFromFavorites(productToRemove));

    const actions = store.getActions();
    const expectedPayload = { type: "favorites/removeFromFavorites", payload: productToRemove };

    expect(actions).toEqual([expectedPayload]);
  });
});
