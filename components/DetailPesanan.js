import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getData, patchData } from "../helpers/fetchData";
import { updateKeranjang } from "../store/Actions";
import BayarBtn from "./bayarBtn";

const DetailPesanan = ({ detailPesanan, state, dispatch }) => {
  const { auth, orders } = state;
  // const [order, setOrder] = useState([]);

  // const testPay = async () => {
  //   try {
  //     const res = await getData("/api/order");
  //     setOrder(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   testPay();
  // }, []);

  const handlePayment = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData(`order/bayar/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
      dispatch(
        updateKeranjang(
          orders,
          order._id,
          {
            ...order,
            paid: true,
            dateOfBayar: new Date().toLocaleDateString,
            metode: "Cash on Delivery",
          },
          "ADD_TO_ORDER"
        )
      );
      return dispatch({
        type: "NOTIFY",
        payload: { success: res.msg },
      });
    });
  };

  const handleDikirim = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData(`order/kirim/${order._id}`, null, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      const { paid, dateOfBayar, metode, delivered } = res.result;
      dispatch(
        updateKeranjang(
          orders,
          order._id,
          {
            ...order,
            paid,
            dateOfBayar,
            metode,
            delivered,
          },
          "ADD_TO_ORDER"
        )
      );
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  if (!auth.user) return null;

  return (
    <>
      {detailPesanan.map((order) => (
        <div className="row justify-content-around" key={order._id}>
          <div className="py-4" style={{ maxWidth: "65%" }}>
            <div className="mt-2">
              <h3 className="font-weight-bold text-center mb-5">
                Data Pengiriman
              </h3>
              <p style={{ fontSize: "18px" }}>Nama : {order.user.name}</p>
              <p style={{ fontSize: "18px" }}>Email : {order.user.email}</p>
              <p style={{ fontSize: "18px" }}>Alamat : {order.alamatlengkap}</p>
              <p style={{ fontSize: "18px" }}>
                No. Handphone : {order.handphone}
              </p>
              <p style={{ fontSize: "18px" }}>Ukuran Baju : {order.sizebaju}</p>
              <h3 className="font-weight-bold">Status Pengiriman</h3>
              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.delivered
                  ? `Dikirim pada ${order.dateOfBayar}`
                  : "Belum dikirim"}
                {auth.user.role === "admin" && !order.delivered && (
                  <button
                    className="btn btn-success"
                    type="button"
                    style={{ border: "none", outline: "none" }}
                    onClick={() => handleDikirim(order)}
                  >
                    Tandai Dikirim
                  </button>
                )}
              </div>
              <h3 className="font-weight-bold">Status Pembayaran</h3>
              {/* {order.metode && (
                <h5 className="font-weight-bold ">
                  Metode Pembayaran :{" "}
                  <span className="text-secondary">
                    <em>{order.metode}</em>
                  </span>
                </h5>
              )}
              {order.IDpembayaran && (
                <h5 className="font-weight-bold ">
                  ID Pembayaran :{" "}
                  <span className="text-secondary">
                    <em>{order.IDpembayaran}</em>
                  </span>
                </h5>
              )} */}
              <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-danger"
                } d-flex justify-content-between align-items-center`}
                role="alert"
              >
                {order.paid
                  ? `Dibayar pada ${order.dateOfBayar}`
                  : "Belum dibayar"}
              </div>
            </div>
            <div>
              <h3 className="font-weight-bold">Barang Pesanan : </h3>
              {order.cart.map((item) => (
                <div
                  className="row border-bottom mx-0 py-3 justify-content-between align-items-center"
                  key={item._id}
                >
                  <Link
                    legacyBehavior
                    id="link"
                    href={`/detailproduk/${item._id}`}
                  >
                    <img
                      src={item.foto[0]?.url}
                      alt={item.foto[0]?.url}
                      style={{
                        width: "90px",
                        height: "90px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      className="img-thumbnail"
                    />
                  </Link>
                  <div className="col-md-9">
                    <h5 className="flex-fill">
                      <a>{item.nama}</a>
                    </h5>
                    <span style={{ color: "#FF6E31" }}>
                      {item.quantity} x Rp. {item.newharga} = Rp.{" "}
                      {item.newharga * item.quantity}
                    </span>
                    <h6 className="mt-2">Ukuran Baju : {order.sizebaju}</h6>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!order.paid && auth.user.role !== "admin" && (
            <div className="p-4 col-md-4">
              <h4 className="mb-4 mt-4 text-capitalize font-weight-bold">
                Total :{" "}
                <span
                  className="product_price"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Rp. {order.total}
                </span>
              </h4>
              <button className="w-100" onClick={() => testPay(order)}>
                CASH
              </button>
              <BayarBtn total={order.total} order={order} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default DetailPesanan;
