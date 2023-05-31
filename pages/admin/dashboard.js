/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import LayoutAdmin from "../../components/componentsadmin/LayoutAdmin";
import { DataContext } from "../../store/GlobalState";

export default function dashboard() {
  const { state, dispatch } = useContext(DataContext);
  const { users, orders } = state;

  return (
    <>
      <Head>
        <title>Dashbaord Admin</title>
      </Head>
      <LayoutAdmin>
        <div className="details">
          {/* <h2 className="text-center font-weight-bold">
          Daftar Orderan Customer
        </h2> */}
          <div className="recentOrders">
            <div className="cardHeaders">
              <h2>Recent Orders</h2>
            </div>
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
                    <td className="text-center">BAYAR</td>
                    <td className="text-center">KIRIM</td>
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
                              src={item.foto[0]?.url}
                              alt={item.foto[0]?.url}
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
                          <span className="status bg-primary">Sudah </span>
                        ) : (
                          <span className="status belumbayar">Belum </span>
                        )}
                      </td>
                      <td className="text-center">
                        {order.delivered ? (
                          <span className="status dikirim">Dikirim</span>
                        ) : (
                          <span className="status belumkirim">Belum</span>
                        )}
                      </td>
                      <td>
                        <Link
                          href={`/admin/detailpesanan/${order._id}`}
                          legacyBehavior
                          id="link"
                        >
                          <a className="btn text-white">Lihat Detail</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* <h2 className="text-center font-weight-bold">Daftar Akun Customer</h2> */}
          <div className="recentCustomers">
            <div className="cardHeaders">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td width={60}>
                      <div className="imgBx">
                        <img
                          src={user.avatar}
                          alt={user.avatar}
                          style={{
                            width: "50px",
                            height: "50px",
                            overflow: "hidden",
                            obejctFit: "cover",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <h5>
                        {user.name}
                        <br />
                        <span>{user.email}</span>
                      </h5>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
}
