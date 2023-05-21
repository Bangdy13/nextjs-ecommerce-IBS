import Head from "next/head";
import React, { useContext, useState } from "react";
import LayoutAdmin from "../../components/componentsadmin/LayoutAdmin";
import { postData, putData } from "../../helpers/fetchData";
import { updateKeranjang } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";

const kategoriProduk = () => {
  const [name, setName] = useState("");
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const [id, setId] = useState("");

  const createKategori = async () => {
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });
    if (!name)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Nama wajib diisi." },
      });
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });

    let res;
    if (id) {
      res = await putData(`categories/${id}`, { name }, auth.token);
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
      dispatch(updateKeranjang(categories, id, res.kategori, "ADD_CATEGORY"));
    } else {
      res = await postData("categories", { name }, auth.token);
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });

      dispatch({
        type: "ADD_CATEGORY",
        payload: [...categories, res.newKategori],
      });
    }

    setName("");
    setId("");

    return dispatch({
      type: "NOTIFY",
      payload: { success: res.msg },
    });
  };

  const handleEditKategori = (kategori) => {
    setId(kategori._id);
    setName(kategori.name);
  };

  return (
    <>
      <Head>
        <title>List Kategori</title>
      </Head>
      <LayoutAdmin>
        <div className="col-md-6 mx-auto my-4 shadow py-4 rounded px-4">
          <h2 className="text-center mb-4">Tambah Kategori Produk</h2>
          <div className="form-group input-group mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buat kategori produk...."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button
              className="btn text-white py-0 ml-2 px-3"
              onClick={createKategori}
            >
              {id ? "Update" : "Create"}
            </button>
          </div>
          <h4 className="mb-3">List Kategori : </h4>
          {categories.length === 0 ? (
            <h5 className="mb-3 text-center text-secondary">
              List Kategori Kosong
            </h5>
          ) : (
            <>
              {categories.map((kategori) => (
                <div className="card my-2 text-capitalize" key={kategori._id}>
                  <div className="card-body d-flex justify-content-between">
                    {kategori.name}
                    <div style={{ cursor: "pointer" }}>
                      <button
                        onClick={() => handleEditKategori(kategori)}
                        className="btn text-white mr-2 "
                      >
                        <a>
                          <i
                            className="fas fa-edit mr-2"
                            aria-hidden="true"
                          ></i>
                          Edit
                        </a>
                      </button>
                      <button
                        className="btn bg-danger text-white"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() =>
                          dispatch({
                            type: "ADD_TO_MODAL",
                            payload: [
                              {
                                data: categories,
                                id: kategori._id,
                                nama: kategori.name,
                                type: "ADD_CATEGORY",
                              },
                            ],
                          })
                        }
                      >
                        <a>
                          <i
                            className="fas fa-trash-alt mr-2"
                            aria-hidden="true"
                          ></i>
                          Hapus
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </LayoutAdmin>
    </>
  );
};

export default kategoriProduk;
