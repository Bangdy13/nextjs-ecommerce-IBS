import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import LayoutAdmin from "../../components/componentsadmin/LayoutAdmin";
import { DataContext } from "../../store/GlobalState";

const Customers = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;

  if (!auth.user) return null;
  return (
    <>
      <Head>
        <title>Customer</title>
      </Head>
      <LayoutAdmin>
        <div className="details-orders">
          <h2 className="text-center font-weight-bold">Daftar Akun Customer</h2>
          <div className="recentOrders">
            <div className="cardHeaders">
              <h2>Recent Customers</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <td>NO</td>
                  <td className="text-center">ID</td>
                  <td className="text-center">FOTO</td>
                  <td className="text-center">NAMA</td>
                  <td className="text-center">EMAIL</td>
                  <td className="text-center">ADMIN / USER</td>
                  <td className="text-center">AKSI</td>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td className="text-center">{user._id}</td>
                    <td className="text-center">
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
                    </td>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">
                      {user.role === "admin" ? (
                        user.root ? (
                          <span className="status dibayar">Root</span>
                        ) : (
                          <span className="status bg-warning">Admin</span>
                        )
                      ) : (
                        <span className="status bg-info">User</span>
                      )}
                    </td>
                    <td style={{ cursor: "pointer" }} className="text-center">
                      <Link
                        legacyBehavior
                        id="link"
                        href={
                          auth.user.root && auth.user.email !== user.email
                            ? `/admin/editpengguna/${user._id}`
                            : "#!"
                        }
                      >
                        <a className="btn text-white mr-2">Edit</a>
                      </Link>
                      {auth.user.root && auth.user.email !== user.email ? (
                        <a
                          className="btn text-white bg-danger"
                          aria-hidden="true"
                          title="Hapus"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          onClick={() =>
                            dispatch({
                              type: "ADD_TO_MODAL",
                              payload: [
                                {
                                  data: users,
                                  id: user._id,
                                  nama: user.email,
                                  type: "ADD_USERS",
                                },
                              ],
                            })
                          }
                        >
                          Hapus
                        </a>
                      ) : (
                        <a className="btn bg-danger text-white">Hapus</a>
                      )}
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
};

export default Customers;
