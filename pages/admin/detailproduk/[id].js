import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import LayoutAdmin from "../../../components/componentsadmin/LayoutAdmin";
import { getData } from "../../../helpers/fetchData";
import { addKeranjang } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";

export default function DetailProduk(props) {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext);

  const { cart, auth } = state;

  const isActive = (i) => {
    if (tab === i) return " active";
    return "";
  };

  return (
    <>
      <Head>
        <title>Detail-Produk</title>
      </Head>
      <LayoutAdmin>
        <div
          className="mx-4 shadow py-5 card-detail"
          style={{ marginTop: "30px" }}
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mx-3">
              <li className="breadcrumb-item">
                <Link href="/admin/listProduk" legacyBehavior id="link">
                  <a>List produk</a>
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-capitalize"
                aria-current="page"
              >
                {product.nama}
              </li>
            </ol>
          </nav>

          <div className="row detail_produk my-4 mx-3">
            <div className="col-md-5">
              <img
                src={product.foto[tab]?.url}
                alt={product.foto[tab]?.url}
                className="img-thumbnail rounded mt-4 images"
              />
              <div className="row mx-0" style={{ cursor: "pointer" }}>
                {product.foto.map((img, i) => (
                  <img
                    src={img.url}
                    alt={img.url}
                    key={i}
                    className={`img-thumbnail rounded mb-4 img-detail ${isActive(
                      i
                    )}`}
                    onClick={() => setTab(i)}
                  />
                ))}
              </div>
            </div>
            <div className="col-md-7 mt-4" key={product._id}>
              <h3
                style={{ fontWeight: 500, fontSize: "1.5rem" }}
                className="text-capitalize"
              >
                {product.nama}
              </h3>
              <div className="row mx-0 justify-content-between mt-5">
                <h3 className="old_harga">
                  Harga Lama :{" "}
                  <span className="product_old_price">
                    Rp.{product.oldharga}
                  </span>
                </h3>
                <h6
                  style={{ fontWeight: "normal" }}
                  className="product_terjual"
                >
                  {product.terjual} terjual
                </h6>
              </div>
              <div className="mx-0">
                <h3 className="old_harga">
                  Harga Promo :{" "}
                  <span className="product_new_price">
                    Rp.{product.newharga}
                  </span>
                </h3>
              </div>
              <div className="mt-4">
                <h6 style={{ fontWeight: "normal" }}>
                  Rekomendasi umur : {product.umur} tahun
                </h6>
                <h6 style={{ fontWeight: "normal" }}>
                  Ukuran : {product.size}
                </h6>
                <h6 className="mt-4" style={{ fontWeight: "normal" }}></h6>
                <div className="mt-4">Deskripsi :</div>
                <p className="mt-2"> {product.deskripsi}</p>
              </div>
              <div className="btn_detail row mx-0">
                {auth.user?.role === "user" ? (
                  <button
                    type="button"
                    className="btn_cekout_outline"
                    onClick={() => dispatch(addKeranjang(product, cart))}
                  >
                    <i
                      className="fa-solid fa-cart-plus mr-2"
                      aria-hidden="true"
                    ></i>
                    masukkan keranjang
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 shadow my-5 py-3 card-size">
          <div className="col-md-8">
            <ul className="menu_items">
              <li className="detail">Detail Ukuran</li>
            </ul>
            <div className="detail_size">
              <li>{product.detailsize}</li>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);

  return {
    props: {
      product: res.product,
    },
  };
}
