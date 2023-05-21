import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import validation from "../helpers/validation";
import { DataContext } from "../store/GlobalState";
import { postData } from "../helpers/fetchData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRouter } from "next/router";

const Signup = () => {
  const initialState = { name: "", email: "", password: "", cf_password: "" };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, cf_password } = userData;

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
    const errMsg = validation(name, email, password, cf_password);
    if (errMsg) return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    const res = await postData("auth/signup", userData);
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push("/signin");
  }, [auth]);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Navbar />
      <form
        className="mx-auto px-5"
        style={{ maxWidth: "500px", marginTop: "7rem" }}
        onSubmit={handleSubmit}
      >
        <div className="card shadow p-3 mb-5 bg-body rounded px-4 py-4">
          <h2 className="text-center text-uppercase mb-4 signin">sign up</h2>
          <div className="form-group">
            <label htmlFor="text">Username</label>
            <input
              type="text"
              className="form-control"
              id="nama"
              aria-describedby="nama"
              placeholder="Nama"
              name="name"
              value={name}
              onChange={handleInput}
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm Password"
              name="cf_password"
              value={cf_password}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="w-100 text-uppercase button-sign">
            sign up
          </button>
          <p className="my-2">
            Already have a account?
            <Link href="/signin" legacyBehavior id="link">
              <a className="links">Signin</a>
            </Link>
          </p>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Signup;
