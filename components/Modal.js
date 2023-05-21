import { useRouter } from "next/router";
import React, { useContext } from "react";
import { deleteData } from "../helpers/fetchData";
import { hapusKeranjang } from "../store/Actions";
import { DataContext } from "../store/GlobalState";

const Modal = () => {
  const { state, dispatch } = useContext(DataContext);
  const { modal, auth } = state;

  const router = useRouter();

  const handleDeleteUser = (item) => {
    dispatch(hapusKeranjang(item.data, item.id, item.type));
    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleDeleteCategory = (item) => {
    // dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch(hapusKeranjang(item.data, item.id, item.type));
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const handleDeleteProduct = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
      return router.push("/admin/listProduk");
    });
  };

  const handleHapus = () => {
    if (modal.length !== 0) {
      for (const item of modal) {
        if (item.type === "ADD_TO_CART") {
          dispatch(hapusKeranjang(item.data, item.id, item.type));
        }
        // Hapus User
        if (item.type === "ADD_USERS") handleDeleteUser(item);

        // Hapus Kategori
        if (item.type === "ADD_CATEGORY") handleDeleteCategory(item);

        // Hapus Produk
        if (item.type === "DELETE_PRODUCT") handleDeleteProduct(item);

        dispatch({ type: "ADD_TO_MODAL", payload: [] });
      }
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title text-capitalize"
                id="exampleModalLabel"
              >
                {modal.length !== 0 && modal[0].nama}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Apakah anda ingin menghapus nama item ini ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn bg-danger text-white"
                data-dismiss="modal"
              >
                Tidak
              </button>
              <button
                type="button"
                className="btn text-white"
                data-dismiss="modal"
                onClick={handleHapus}
              >
                Iya
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
