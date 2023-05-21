import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import { addKeranjang } from "../store/Actions";

const Produk = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;

  return (
    <>
      <div className="mb-3 col-lg-3 col-md-6 col-sm-6 col-xsm-6">
        <div className="card cards">
          {auth.user && auth.user.role === "admin" && (
            <input
              type="checkbox"
              checked={product.checked}
              className="position-absolute"
              style={{ height: 20, width: 20 }}
              onChange={() => handleCheck(product._id)}
            />
          )}
          <Link href={`detailproduk/${product._id}`} legacyBehavior id="link">
            <img
              className="card-img-top"
              src={product.foto[0]?.url}
              alt={product.foto[0]?.url}
            />
          </Link>
          <div className="card-body">
            <h5 title={product.nama} style={{ marginTop: "-10px" }}>
              {product.nama}
            </h5>
            <div className="row d-flex justify-content-between align-items-center mx-0">
              <h6 className="product_price">
                Rp.
                <span style={{ fontSize: "1.1rem" }}>{product.newharga}</span>
              </h6>
              {product.persediaan > 0 ? (
                <h6 className="product_stock">{product.persediaan} stok</h6>
              ) : (
                <h6 className="product_stock">habis</h6>
              )}
            </div>
            {!auth.user || auth.user.role !== "admin" ? (
              <a className="btn_add_cart">
                <i
                  className="fas fa-shopping-cart"
                  aria-hidden="true"
                  onClick={() => dispatch(addKeranjang(product, cart))}
                ></i>
              </a>
            ) : (
              <div className="row d-flex justify-content-between mx-0 mt-1">
                <Link
                  legacyBehavior
                  id="link"
                  href={`/admin/tambahproduk/${product._id}`}
                >
                  <a
                    className="btn text-white"
                    style={{ marginRight: "5px", flex: 1 }}
                  >
                    Edit
                  </a>
                </Link>
                <button
                  className="btn bg-danger text-white"
                  style={{ marginRight: "5px", flex: 1 }}
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_MODAL",
                      payload: [
                        {
                          data: "",
                          id: product._id,
                          nama: product.nama,
                          type: "DELETE_PRODUCT",
                        },
                      ],
                    })
                  }
                >
                  Hapus
                </button>
              </div>
            )}
            <h6
              className="product_terjual p-0 mt-2"
              style={{ marginBottom: "-10px" }}
            >
              {product.terjual} terjual
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Produk;
