import Head from "next/head";
import Link from "next/link";
import React, { useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { DataContext } from "../store/GlobalState";

const Orderan = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  if (!auth.user) return null;
  return (
    <>
      <Head>
        <title>Orderan</title>
      </Head>
      <Navbar />
      <div className="details-orders">
        <h5 className="text-center text-uppercase font-weight-bold mb-4 pt-3">
          {auth.user.role === "user"
            ? "Pesanan Saya"
            : "Daftar Pesanan Pelanggan"}
        </h5>
        <div className="recentOrders">
          {orders.length === 0 ? (
            <h2 className="text-center">Orderan Kosong</h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>ID</td>
                  <td className="text-center">PRODUK</td>
                  <td className="text-center">UKURAN</td>
                  <td className="text-center">TANGGAL</td>
                  <td className="text-center">STATUS BAYAR</td>
                  <td className="text-center">STATUS KIRIM</td>
                  <td>AKSI</td>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td className="text-center">
                      {order.cart.map((item) => (
                        <div key={item._id}>
                          <img
                            src={item.foto[0].url}
                            alt={item.foto[0].url}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                            className="img-thumbnail mb-1"
                          />
                        </div>
                      ))}
                    </td>
                    <td className="text-center">{order.sizebaju}</td>
                    <td className="text-center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-center">
                      {order.paid ? (
                        <span className="status dibayar">Sudah dibayar</span>
                      ) : (
                        <span className="status belumbayar">Belum dibayar</span>
                      )}
                    </td>
                    <td className="text-center">
                      {order.delivered ? (
                        <span className="status dikirim">
                          Proses pengiriman
                        </span>
                      ) : (
                        <span className="status belumkirim">
                          Belum disetujui
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/detailpesanan/${order._id}`}
                        legacyBehavior
                        id="link"
                      >
                        <a className="btn text-white">Lihat</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <br />
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
};

export default Orderan;
