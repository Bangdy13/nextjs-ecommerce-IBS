import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import filterSearch from "../helpers/filterSearch";

const Navbar = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [kategori, setKategori] = useState("");

  const { categories } = state;

  const router = useRouter();

  const handlerLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch({
      type: "AUTH",
      payload: {},
    });

    dispatch({
      type: "NOTIFY",
      payload: { success: "Berhasil Keluar !" },
    });
    router.push("/");
  };

  const loggedRouter = () => {
    return (
      <>
        <li className="nav-item dropdown">
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
                width: "25px",
                height: "25px",
                transform: "translateY(-2px)",
                marginRight: "3px",
                textAlign: "center",
              }}
            />
            {auth.user.name}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            {auth.user.role === "user" ? (
              <Link legacyBehavior id="link" href="/profil">
                <a className="dropdown-item button">
                  <img
                    src={auth.user.avatar}
                    alt={auth.user.avatar}
                    style={{
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      transform: "translateY(-3px)",
                      marginRight: "3px",
                      textAlign: "center",
                    }}
                  />
                  {auth.user.name}
                </a>
              </Link>
            ) : (
              <Link legacyBehavior id="link" href="/admin/profilAdmin">
                <a className="dropdown-item button">
                  <img
                    src={auth.user.avatar}
                    alt={auth.user.avatar}
                    style={{
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      transform: "translateY(-3px)",
                      marginRight: "3px",
                      textAlign: "center",
                    }}
                  />
                  {auth.user.name}
                </a>
              </Link>
            )}
            <div className="dropdown-divider"></div>
            {auth.user.role === "user" ? null : ( // </Link> //   </button> //     <i className="fas fa-user mr-2" aria-hidden="true"></i>Profil //   <button className="dropdown-item button"> // <Link legacyBehavior id="link" href="/profil">
              <Link legacyBehavior id="link" href="/admin/dashboard">
                <button className="dropdown-item button">
                  <i className="fa fa-home mr-2" aria-hidden="true"></i>
                  Dashboard
                </button>
              </Link>
            )}
            {auth.user.role === "user" ? (
              <Link legacyBehavior id="link" href="/orderan">
                <button className="dropdown-item button">
                  <i
                    className="fas fa-shopping-bag mr-2"
                    aria-hidden="true"
                  ></i>
                  Pesanan Saya
                </button>
              </Link>
            ) : null}
            {/* <div className="dropdown-divider"></div> */}
            <button className="dropdown-item button" onClick={handlerLogout}>
              <i
                className="fa-solid fa-right-from-bracket mr-2"
                aria-hidden="true"
              ></i>
              Keluar
            </button>
          </div>
        </li>
      </>
    );
  };

  const handleCategory = (e) => {
    setKategori(e.target.value);
    filterSearch({ router, kategori: e.target.value });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top shadow-sm " id="navbar">
        <Link legacyBehavior id="link" href="/">
          <a className="navbar-brand">
            <img src="/ibs.png" alt="logo" width={"45px"} />
          </a>
        </Link>
        <li className="nav-item d-lg-none d-flex ml-auto ">
          <Link legacyBehavior id="link" href="/keranjang">
            <a className="nav-link">
              <i
                className="fas fa-shopping-cart mr-1 position-relative"
                aria-hidden="true"
              >
                <span id="cart1" className="position-absolute">
                  {cart.length}
                </span>
              </i>
            </a>
          </Link>
        </li>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <img src="/men.png" alt="menu" width={"70px"} height={"35px"} />
          </span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link legacyBehavior id="link" href="/">
                <a className="nav-link active">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link legacyBehavior id="link" href="/galeriproduk">
                <a className="nav-link">Shop</a>
              </Link>
            </li>
            <li className="nav-item dropdown mr-3">
              <select
                className="custom-select text-capitalize"
                name="kategori"
                value={kategori}
                onChange={handleCategory}
              >
                <option value="all">All Produk</option>

                {categories.map((c) => (
                  <option key={c._id} value={c._id} href="#arrival">
                    {c.name}
                  </option>
                ))}
              </select>
            </li>
            <li className="nav-item dropdown">
              <select
                className="custom-select text-capitalize"
                value={sort}
                onChange={handleSort}
              >
                <option value="-createdAt">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="-terjual">Best Sales</option>
                <option value="-newharga">Price: Hight-Low</option>
                <option value="newharga">Price: Low-Hight</option>
              </select>
            </li>
          </ul>
          <form className="form-search">
            <input
              type="text"
              name="search"
              placeholder="search your product here for.."
              list="title_product"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <button type="submit">search</button> */}
          </form>
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item mr-2 d-none d-lg-flex ">
              <Link legacyBehavior id="link" href="/keranjang">
                <a className="nav-link ">
                  <i
                    className="fas fa-shopping-bag mr-1 position-relative"
                    aria-hidden="true"
                  >
                    <span id="cart1" className="position-absolute">
                      {cart.length}
                    </span>
                  </i>
                </a>
              </Link>
            </li>

            {Object.keys(auth).length === 0 ? (
              <li className="nav-item ">
                <Link legacyBehavior id="link" href="/signin">
                  <a className="nav-link">
                    <i className="fas fa-user mr-1" aria-hidden="true"></i>
                    Signin
                  </a>
                </Link>
              </li>
            ) : (
              loggedRouter()
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
