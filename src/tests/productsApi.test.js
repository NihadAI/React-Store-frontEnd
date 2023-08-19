import { rest } from "msw";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import configureStore from "../index";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockProducts = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
];

const mockBaseQuery = (url, method, { body }) => {
  switch (url) {
    case "/products":
      return Promise.resolve({ body: mockProducts });
    default:
      return fetchBaseQuery.defaultBaseQuery(url, method, { body });
  }
};

const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: mockBaseQuery,
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => `products`,
    }),
  }),
});

const { useGetAllProductsQuery } = productsApi;

describe("productsApi", () => {
    it("should fetch all products", async () => {
      server.use(
        rest.get("/products", (req, res, ctx) => {
          return res(ctx.json(mockProducts));
        })
      );
  
      let result;
  
      await act(async () => {
        const { result: hookResult, waitFor } = renderHook(() =>
          useGetAllProductsQuery()
        );
  
        result = hookResult.current;
  
        await waitFor(() => {
          return hookResult.current.isSuccess;
        });
      });
  
      expect(result.data).toEqual(mockProducts);
      expect(result.error).toBeUndefined();
    });
  });
  
  
  
  
  