import Head from "next/head";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getData } from "../../helpers/fetchData";
import { addKeranjang } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

const produk = (props) => {
  const [products, setProducts] = useState(props.products);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  return (
    <>
      <Head>
        <title>Galeri-Produk</title>
      </Head>
      <Navbar />
      <section className="my-5" style={{ marginTop: "6rem" }} id="arrivals">
        <h1 className="heading">
          <span>gallery ita beauty shop</span>
        </h1>
        <div className="heading2 py-3 px-4 my-3">
          <div className="row" style={{ marginTop: 30 }}>
            {products.length === 0 ? (
              <h2 className="text-center">Produk tidak tersedia</h2>
            ) : (
              products.map((product) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-xs-12 py-md-0 mb-3"
                  key={product._id}
                  product={product}
                >
                  <div className="card cards">
                    <Link
                      href={`detailproduk/${product._id}`}
                      legacyBehavior
                      id="link"
                    >
                      <img
                        src={product.foto[0]?.url}
                        className="card-img-top"
                        alt={product.foto[0]?.url}
                      />
                    </Link>
                    <div className="card-body">
                      <h5 title={product.nama} style={{ marginTop: -10 }}>
                        {product.nama}
                      </h5>
                      <div className="row justify-content-between mx-0">
                        <h6 className="product_price">
                          Rp.
                          <span style={{ fontSize: "1.2rem" }}>
                            {product.newharga}
                          </span>
                        </h6>
                        {product.persediaan > 0 ? (
                          <h6 className="product_stock">
                            {product.persediaan} Stok
                          </h6>
                        ) : (
                          <h6 className="product_stock">Habis</h6>
                        )}
                      </div>
                      <a className="btn_add_cart">
                        <i
                          className="fas fa-shopping-cart"
                          aria-hidden="true"
                          onClick={() => dispatch(addKeranjang(product, cart))}
                        ></i>
                      </a>
                      <h6
                        className="product_terjual p-0 mt-2"
                        style={{ marginBottom: -10 }}
                      >
                        {product.terjual} terjual
                      </h6>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const res = await getData("product");
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  };
}

export default produk;
