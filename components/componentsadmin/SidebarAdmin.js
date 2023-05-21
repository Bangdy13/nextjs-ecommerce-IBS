/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";

const SidebarAdmin = ({ children }) => {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  if (!auth.user) return null;

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({
      type: "AUTH",
      payload: {},
    });
    dispatch({
      type: "NOTIFY",
      payload: { success: "Berhasil Keluar !" },
    });
    router.push("/admin/loginadmin");
  };

  useEffect(() => {
    var toggle = document.querySelector(".toggle");
    var navigation = document.querySelector(".navigation");
    var main = document.querySelector(".main");
    toggle.onclick = function () {
      toggle.classList.toggle("active");
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  });

  return (
    <>
      <div id="sidebar">
        <div className="navigation">
          <ul>
            <li className="pt-3">
              <span className="icon">
                <img
                  src="/ibs.png"
                  alt="logo"
                  width={45}
                  height={45}
                  className="ml-2"
                />
              </span>
              <span
                className="title-judul text-white ml-3 font-weight-bold "
                style={{ fontSize: "24px" }}
              >
                Ita Beauty <span className="span-title">Shop</span>
              </span>
            </li>
            <li
              className={router.pathname === "/admin/dashboard" ? "active" : ""}
            >
              <Link href="/admin/dashboard" legacyBehavior id="link">
                <a>
                  <span className="icon">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </span>
                  <span className="title">Dashboard</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/admin/profilAdmin" ? "active" : ""
              }
            >
              <Link legacyBehavior id="link" href="/admin/profilAdmin">
                <a>
                  <span className="icon">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <span className="title">Profil</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/admin/orderanPelanggan" ? "active" : ""
              }
            >
              <Link legacyBehavior id="link" href="/admin/orderanPelanggan">
                <a>
                  <span className="icon">
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                  </span>
                  <span className="title">Orderan</span>
                </a>
              </Link>
            </li>
            <li
              className={router.pathname === "/admin/customer" ? "active" : ""}
            >
              <Link legacyBehavior id="link" href="/admin/customer">
                <a>
                  <span className="icon">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </span>
                  <span className="title">Customers</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/admin/listProduk" ? "active" : ""
              }
            >
              <Link legacyBehavior id="link" href="/admin/listProduk">
                <a>
                  <span className="icon">
                    <i className="fa fa-box" aria-hidden="true"></i>
                  </span>
                  <span className="title">List Produk</span>
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname === "/admin/kategoriProduk" ? "active" : ""
              }
            >
              <Link legacyBehavior id="link" href="/admin/kategoriProduk">
                <a>
                  <span className="icon">
                    <i className="fa fa-list" aria-hidden="true"></i>
                  </span>
                  <span className="title">List Kategori</span>
                </a>
              </Link>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="text-white"
                style={{ cursor: "pointer" }}
              >
                <span className="icon">
                  <i className="fa fa-sign-out" aria-hidden="true"></i>
                </span>
                <span className="title">Keluar</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="topbar">
            <div className="toggle"></div>
            <li className="nav-item dropdown" style={{ listStyle: "none" }}>
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={auth.user.avatar}
                  alt={auth.user.avatar}
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    marginRight: "3px",
                    textAlign: "center",
                  }}
                />
                <span className="text-dark">{auth.user.name}</span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                style={{ background: "#003147", color: "#fff" }}
              >
                <Link legacyBehavior id="link" href="/admin/profilAdmin">
                  <a className="dropdown-item button">
                    <img
                      src={auth.user.avatar}
                      alt={auth.user.avatar}
                      style={{
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        transform: "translateY(-1px)",
                        marginRight: "5px",
                        // textAlign: "center",
                      }}
                    />
                    {auth.user.name}
                  </a>
                </Link>
                <div className="dropdown-divider"></div>

                <Link legacyBehavior id="link" href="/admin/dashboard">
                  <button className="dropdown-item button">
                    <i className="fa fa-home mr-2" aria-hidden="true"></i>
                    Dashboard
                  </button>
                </Link>
                <Link legacyBehavior id="link" href="/">
                  <button className="dropdown-item button">
                    <i className="fa fa-home mr-2" aria-hidden="true"></i>
                    Home User
                  </button>
                </Link>

                {/* <div className="dropdown-divider"></div> */}
                <button className="dropdown-item button" onClick={handleLogout}>
                  <i
                    className="fa-solid fa-right-from-bracket mr-2"
                    aria-hidden="true"
                  ></i>
                  Keluar
                </button>
              </div>
            </li>
            {/* <div className="user">
              <img src={auth.user.avatar} alt={auth.user.avatar} />
            </div> */}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default SidebarAdmin;
