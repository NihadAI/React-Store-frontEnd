import cartReducer, {
    addToCart,
    decreaseCart,
    removeFromCart,
    getTotals,
    clearCart,
  } from "../slices/cartSlice";
  
  describe("cartSlice reducer", () => {
    const initialState = {
      cartItems: [],
      cartTotalQuantity: 0,
      cartTotalAmount: 0,
    };
  
    it("should handle initial state", () => {
      expect(cartReducer(undefined, {})).toEqual(initialState);
    });
  
    it("should handle addToCart", () => {
      const product = { id: 1, name: "Product 1", price: 10 };
      const action = addToCart(product);
      const nextState = cartReducer(initialState, action);
  
      expect(nextState.cartItems).toEqual([
        { id: 1, name: "Product 1", price: 10, cartQuantity: 1 },
      ]);
    });
  
    it("should handle decreaseCart", () => {
      const initialStateWithCartItem = {
        cartItems: [{ id: 1, name: "Product 1", price: 10, cartQuantity: 2 }],
        cartTotalQuantity: 2,
        cartTotalAmount: 20,
      };
  
      const action = decreaseCart({ id: 1 });
      const nextState = cartReducer(initialStateWithCartItem, action);
  
      expect(nextState.cartItems[0].cartQuantity).toBe(1);
    });
  
    it("should handle removeFromCart", () => {
      const initialStateWithCartItem = {
        cartItems: [{ id: 1, name: "Product 1", price: 10, cartQuantity: 1 }],
        cartTotalQuantity: 1,
        cartTotalAmount: 10,
      };
  
      const action = removeFromCart({ id: 1 });
      const nextState = cartReducer(initialStateWithCartItem, action);
  
      expect(nextState.cartItems).toEqual([]);
    });
  
    it("should handle getTotals", () => {
      const initialStateWithCartItem = {
        cartItems: [
          { id: 1, name: "Product 1", price: 10, cartQuantity: 2 },
          { id: 2, name: "Product 2", price: 15, cartQuantity: 3 },
        ],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
      };
    
      const action = getTotals();
      const nextState = cartReducer(initialStateWithCartItem, action);
    
      const expectedTotalAmount = 2 * 10 + 3 * 15;
    
      expect(nextState.cartTotalQuantity).toBe(5);
      expect(nextState.cartTotalAmount).toBe(expectedTotalAmount);
    });
          
    it("should clear the cart", () => {
      const initialState = {
        cartItems: [
          { id: 1, name: "Product 1", price: 10, cartQuantity: 2 },
          { id: 2, name: "Product 2", price: 15, cartQuantity: 3 },
        ],
        cartTotalQuantity: 5,
        cartTotalAmount: 60,
      };
  
      const nextState = cartReducer(initialState, clearCart());
  
      expect(nextState.cartItems).toEqual([]);
      expect(nextState.cartTotalQuantity).toBe(0);
      expect(nextState.cartTotalAmount).toBe(0);
    });   
  });
  