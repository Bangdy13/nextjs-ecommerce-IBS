import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { getData } from "../../helpers/fetchData";
import { DataContext } from "../../store/GlobalState";
import { useRouter } from "next/router";
import ListProduk from "../../components/componentsadmin/content/ListProduk";
import LayoutAdmin from "../../components/componentsadmin/LayoutAdmin";
import filterSearch from "../../helpers/filterSearch";
import Filter from "../../components/Filter";

export default function listProduk(props) {
  const [products, setProducts] = useState(props.products);

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const [kategori, setKategori] = useState("");
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth, categories } = state;

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

  const handleCategory = (e) => {
    setKategori(e.target.value);
    filterSearch({ router, kategori: e.target.value });
  };

  return (
    <>
      <Head>
        <title>List Produk</title>
      </Head>
      <LayoutAdmin>
        <Filter state={state} />
        <div className="px-3 mt-4">
          <h3 className="text-center font-weight-bold mb-3">
            Daftar List Produk
          </h3>
          <Link legacyBehavior id="link" href="/admin/tambahproduk">
            <button type="button" className="btn text-white px-2 py-2">
              <i className="fas fa-plus"></i> Tambah Produk
            </button>
          </Link>
          {auth.user && auth.user.role === "admin" && (
            <div className="delete_all btn bg-danger px-2 py-1 ml-2 text-white">
              <input
                type="checkbox"
                checked={isCheck}
                onChange={handleCheckAll}
                style={{
                  height: 20,
                  width: 20,
                  transform: "translateY(5px)",
                }}
              />
              <button
                className="btn bg-danger text-white ml-1 py-1"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={handleHapusSemua}
              >
                Hapus Semua
              </button>
            </div>
          )}
        </div>
        <div className="row px-3" style={{ marginTop: 30 }}>
          <div className="col-md-3 mb-3 no-gutters">
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-primary font-weight-bold text-white">
                <i className="fa fa-list mr-2" aria-hidden="true"></i>LIST
                KATEGORI
              </li>
              <select
                className="custom-select text-capitalize"
                value={kategori}
                onChange={handleCategory}
              >
                <option value="all">All Produk</option>

                {categories.map((item) => (
                  <option value={item._id}>{item.name}</option>
                ))}
              </select>
            </ul>
          </div>
          <div className="col-md-9">
            <div className="row">
              {products.length === 0 ? (
                <h2 className="text-center">Produk tidak tersedia</h2>
              ) : (
                products.map((product) => (
                  <ListProduk
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
                className="btn text-white bg-info d-block mx-auto mt-2 mb-4 py-2 px-3"
                onClick={handleViewAll}
              >
                View all
              </button>
            )}
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}

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
