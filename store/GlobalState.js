import { createContext, useEffect, useReducer } from "react";
import { getData } from "../helpers/fetchData";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    modal: [],
    cart: [],
    orders: [],
    users: [],
    categories: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.accessToken,
            user: res.user,
          },
        });
      });
    }
    getData("categories").then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: err.res } });
      dispatch({
        type: "ADD_CATEGORY",
        payload: res.categories,
      });
    });
  }, []);

  useEffect(() => {
    const simpan_keranjang = JSON.parse(
      localStorage.getItem("simpan_keranjang")
    );
    if (simpan_keranjang)
      dispatch({ type: "ADD_TO_CART", payload: simpan_keranjang });
  }, []);

  useEffect(() => {
    localStorage.setItem("simpan_keranjang", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({ type: "ADD_TO_ORDER", payload: res.orders });
      });
      if (auth.user.role === "admin") {
        getData("user", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch({ type: "ADD_USERS", payload: res.users });
        });
      } else {
        dispatch({ type: "ADD_TO_ORDER", payload: [] });
        dispatch({ type: "ADD_USERS", payload: [] });
      }
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
