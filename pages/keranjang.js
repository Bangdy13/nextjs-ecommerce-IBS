import Head from "next/head";
import KeranjangItem from "../components/KeranjangItem";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../store/GlobalState";
import dynamic from "next/dynamic";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getData, postData } from "../helpers/fetchData";
import { useRouter } from "next/router";
import DetailPesanan from "../components/DetailPesanan";

const Keranjang = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart, orders } = state;
  const router = useRouter();

  const [namalengkap, setNamaLengkap] = useState("");
  const [alamatlengkap, setAlamatLengkap] = useState("");
  const [handphone, setHandPhone] = useState("");
  const [sizebaju, setSizeBaju] = useState("");
  const [callback, setCallback] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.newharga * item.quantity;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("simpan_keranjang"));
    if (cartLocal && cartLocal.length > 0) {
      let newArray = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, nama, foto, persediaan, newharga, terjual } =
            res.product;
          if (persediaan > 0) {
            newArray.push({
              _id,
              nama,
              foto,
              persediaan,
              newharga,
              terjual,
              quantity: item.quantity > persediaan ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: "ADD_TO_CART", payload: newArray });
      };
      updateCart();
    }
  }, [callback, dispatch]);

  const handleBayar = async () => {
    if (!alamatlengkap || !handphone || !namalengkap || !sizebaju)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Isikan data form pemesanan dengan benar." },
      });
    let newKeranjang = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.persediaan - item.quantity >= 0) {
        newKeranjang.push(item);
      }
    }
    if (newKeranjang.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "Produk keluar jika stok atau jumlahnya tidak mencukupi.",
        },
      });
    }
    dispatch({
      type: "NOTIFY",
      payload: {
        loading: true,
      },
    });
    postData(
      "order",
      { namalengkap, handphone, alamatlengkap, sizebaju, cart, total },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
      dispatch({ type: "ADD_TO_CART", payload: [] });

      const newPesanan = {
        ...res.newPesanan,
        user: auth.user,
      };

      dispatch({
        type: "ADD_TO_ORDER",
        payload: [...orders, newPesanan],
      });
      dispatch({
        type: "NOTIFY",
        payload: { success: res.msg },
      });
      return router.push(`/detailpesanan/${res.newPesanan._id}`);
    });
  };

  return (
    <>
      <Head>
        <title>Keranjang Belanja</title>
      </Head>
      <Navbar />
      <section id="cart_shipping">
        <div className="row mx-4 py-5">
          <div className="col-md-8 text-dark table-responsive py-3">
            <h4 className="text-uppercase font-weight-bold text-center py-3">
              Keranjang Belanja
            </h4>
            <table className="table my-2 py-3">
              <tbody>
                {cart.length === 0 ? (
                  <h3 className="text-center mb-3">
                    Keranjang Kosong{" "}
                    <Link legacyBehavior id="link" href="/galeriproduk">
                      <a style={{ color: "blue", fontSize: "25px" }}>
                        Pergi Belanja lagi !
                      </a>
                    </Link>
                  </h3>
                ) : (
                  cart.map((item) => (
                    <KeranjangItem
                      key={item._id}
                      item={item}
                      dispatch={dispatch}
                      cart={cart}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 my-3 text-uppercase">
            <h4 className="text-uppercase font-weight-bold text-center py-3">
              Pembayaran
            </h4>
            <form
              className=" px-5 shadow py-4 form-step mx-auto"
              style={{ maxWidth: "550px" }}
            >
              <h5 className="font-weight-bold text-center mb-3">
                Form Pengiriman
              </h5>
              <label htmlFor="text">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                id="nama"
                className="form-control mb-2"
                value={namalengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
              />
              <label htmlFor="alamat">Alamat Lengkap</label>
              <input
                type="text"
                name="alamat"
                id="alamat"
                className="form-control mb-2"
                value={alamatlengkap}
                onChange={(e) => setAlamatLengkap(e.target.value)}
              />
              <label htmlFor="handphone">No.HP</label>
              <input
                type="text"
                name="handphone"
                id="handphone"
                className="form-control mb-2"
                value={handphone}
                onChange={(e) => setHandPhone(e.target.value)}
              />
              <label htmlFor="sizebaju">Ukuran</label>
              <input
                type="text"
                name="sizebaju"
                id="sizebaju"
                className="form-control mb-2"
                value={sizebaju}
                onChange={(e) => setSizeBaju(e.target.value)}
              />
              <span className="font-weight-bold ">Subtotal</span> (
              {cart.reduce((a, c) => a + c.quantity, 0)}) :{" "}
              <span style={{ color: "#FF6E31" }}>Rp. {total}</span>
              <hr className="second-hr" />
              <div className="mt-2 button">
                <button
                  type="button"
                  className="btn_bayar text-center w-100 "
                  onClick={handleBayar}
                >
                  <a style={{ textDecoration: "none" }} className="text-white">
                    Pesan Sekarang
                  </a>
                </button>
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
      </section>
      <Footer />
    </>
  );
};

export default dynamic(() => Promise.resolve(Keranjang), { ssr: false });
