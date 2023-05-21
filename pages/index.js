import Head from "next/head";
import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Produk from "../components/Produk";
import filterSearch from "../helpers/filterSearch";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getData } from "../helpers/fetchData";
import { DataContext } from "../store/GlobalState";

const Home = (props) => {
  const [products, setProducts] = useState(props.products);
  const [page, setPage] = useState(1);
  const [isCheck, setIsCheck] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  const router = useRouter();

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleHapusSemua = () => {
    let hapusArr = [];
    products.forEach((product) => {
      if (product.checked) {
        hapusArr.push({
          data: "",
          id: product._id,
          nama: "Apakah anda ingin hapus semua produk yang dipilih ?",
          type: "DELETE_PRODUCT",
        });
      }
    });
    dispatch({ type: "ADD_TO_MODAL", payload: hapusArr });
  };

  const handleViewAll = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Navbar />
      <Banner />
      <section className="arrival" id="arrivals">
        <h1 className="heading">
          <span>new arrivals</span>
        </h1>
        <div className="heading2">
          {/* <Filter state={state} /> */}
          {auth.user && auth.user.role === "admin" && (
            <div className="delete_all btn bg-danger py-2 text-white mx-0">
              <input
                type="checkbox"
                checked={isCheck}
                onChange={handleCheckAll}
                style={{
                  height: 20,
                  width: 20,
                  transform: "translateY(4px)",
                }}
              />
              <button
                className="btn bg-danger text-white ml-1"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={handleHapusSemua}
              >
                Hapus Semua
              </button>
            </div>
          )}
          <div
            className="d-flex flex-wrap justify-content-between align-items-flex-start mx-0"
            style={{ marginTop: 30 }}
          >
            {products.length === 0 ? (
              <h2 className="text-center">Produk tidak tersedia</h2>
            ) : (
              products.map((product) => (
                <Produk
                  key={product._id}
                  product={product}
                  handleCheck={handleCheck}
                />
              ))
            )}
          </div>
          {props.result < page * 6 ? (
            ""
          ) : (
            <button
              className="btn text-white bg-info d-block mx-auto mt-4 py-2 px-3"
              onClick={handleViewAll}
            >
              View all
            </button>
          )}
        </div>
      </section>
      <div className="heading2">
        <div className="row">
          <div className="icons-container col-lg-3 col-md-6 col-sm-6">
            <div className="icons">
              <i className="fas fa-shipping-fast" aria-hidden="true"></i>
              <h3>fast shipping</h3>
              <p>Terwuwu kemeja panjang pria cowok gatlemen</p>
            </div>
          </div>
          <div className="icons-container col-lg-3 col-md-6 col-sm-6">
            <div className="icons">
              <i className="fas fa-user-clock" aria-hidden="true"></i>
              <h3>fast shipping</h3>
              <p>Terwuwu kemeja panjang pria cowok gatlemen</p>
            </div>
          </div>
          <div className="icons-container col-lg-3 col-md-6 col-sm-6">
            <div className="icons">
              <i className="fas fa-money-check-alt" aria-hidden="true"></i>
              <h3>fast shipping</h3>
              <p>Terwuwu kemeja panjang pria cowok gatlemen</p>
            </div>
          </div>
          <div className="icons-container col-lg-3 col-md-6 col-sm-6">
            <div className="icons">
              <i className="fas fa-box" aria-hidden="true"></i>
              <h3>fast shipping</h3>
              <p>Terwuwu kemeja panjang pria cowok gatlemen</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const kategori = query.kategori || "all";
  const sort = query.sort || "";
  const search = query.search || "all";

  const res = await getData(
    `product?limit=${page * 6}&kategori=${kategori}&sort=${sort}&nama=${search}`
  );
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default Home;
