import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import LayoutAdmin from "../../../components/componentsadmin/LayoutAdmin";
import { patchData } from "../../../helpers/fetchData";
import { updateKeranjang } from "../../../store/Actions";
import { DataContext } from "../../../store/GlobalState";

const EditPengguna = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, users } = state;
  const [editPengguna, setEditPengguna] = useState([]);
  const [cekAdmin, setCekAdmin] = useState(false);
  const [num, setNum] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    users.forEach((user) => {
      if (user._id === id) {
        setEditPengguna(user);
        setCekAdmin(user.role === "admin" ? true : false);
      }
    });
  }, [users]);

  const handleEdit = () => {
    let role = cekAdmin ? "admin" : "user";
    if (num % 2 !== 0) {
      dispatch({ type: "NOTIFY", payload: { loading: true } });
      patchData(`user/${editPengguna._id}`, { role }, auth.token).then(
        (res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch(
            updateKeranjang(
              users,
              editPengguna._id,
              {
                ...editPengguna,
                role,
              },
              "ADD_USERS"
            )
          );
          return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
        }
      );
    }
    router.push("/admin/dashboard");
  };

  const handleCheck = () => {
    setCekAdmin(!cekAdmin);
    setNum(num + 1);
  };

  return (
    <>
      <Head>
        <title>Edit Pengguna</title>
      </Head>
      <LayoutAdmin>
        <div className="heading2 profil-page edit-user my-3">
          <div className="col-md-4 mx-auto my-5 rounded shadow py-2">
            <h3 className="font-weight-bold text-center mb-3">Edit Pengguna</h3>
            <div className="form-group">
              <label htmlFor="text">Username</label>
              <input
                type="text"
                className="form-control"
                id="nama"
                aria-describedby="nama"
                name="name"
                defaultValue={editPengguna.name}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                defaultValue={editPengguna.email}
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                id="isAdmin"
                checked={cekAdmin}
                style={{ width: "15px", height: "15px" }}
                onChange={handleCheck}
              />
              <label
                htmlFor="isAdmin"
                style={{ transform: "translate(4px, -2px)" }}
              >
                isAdmin
              </label>
              <button
                type="submit"
                className="w-100 text-uppercase button-sign"
                onClick={handleEdit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default EditPengguna;
