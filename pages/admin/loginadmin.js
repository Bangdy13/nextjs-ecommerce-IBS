import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { postData } from "../../helpers/fetchData";
import { DataContext } from "../../store/GlobalState";

export default function loginadmin() {
  const initialState = { email: "", password: "" };
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/signin", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });

    dispatch({
      type: "AUTH",
      payload: {
        token: res.accessToken,
        user: res.user,
      },
    });
    Cookies.set("refreshtoken", res.refreshToken, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (
      Object.keys(auth).length !== 0
        ? router.push("/admin/dashboard")
        : router.push("/admin/loginadmin")
    );
  }, [auth]);

  return (
    <>
      <form
        className="mx-auto px-5"
        style={{ maxWidth: "500px", marginTop: "7rem" }}
        onSubmit={handleSubmit}
      >
        <div className="card shadow p-3 mb-5 bg-body rounded px-4 py-4">
          <h2 className="text-center text-uppercase mb-4 signin">
            sign in admin
          </h2>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="w-100 text-uppercase button-sign">
            sign in
          </button>
        </div>
      </form>
    </>
  );
}
