import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { postData } from "../helpers/fetchData";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Signin = () => {
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
    Cookie.set("refreshtoken", res.refreshToken, {
      path: "api/auth/accessToken",
      expires: 7,
    });
    localStorage.setItem("firstLogin", true);
  };

  useEffect(() => {
    if (
      Object.keys(auth).length !== 0 ? router.push("/") : router.push("/signin")
    );
  }, [auth]);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Navbar />
      <form
        className="mx-auto px-5"
        style={{ maxWidth: "500px", marginTop: "7rem" }}
        onSubmit={handleSubmit}
      >
        <div className="card shadow p-3 mb-5 bg-body rounded px-4 py-4">
          <h2 className="text-center text-uppercase mb-4 signin">sign in</h2>
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
          <p className="my-2">
            You don't have a account?
            <Link href="/signup" legacyBehavior id="link">
              <a className="links">Signup</a>
            </Link>
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Signin;
