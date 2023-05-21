import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import LayoutAdmin from "../../../components/componentsadmin/LayoutAdmin";
import { DataContext } from "../../../store/GlobalState";
import { uploadFoto } from "../../../helpers/uploadFoto";
import { getData, postData, putData } from "../../../helpers/fetchData";
import { useRouter } from "next/router";

const CreateProduk = () => {
  const initialState = {
    nama: "",
    diskon: "",
    newharga: 0,
    oldharga: 0,
    umur: "",
    size: "",
    persediaan: 0,
    deskripsi: "",
    detailsize: "",
    kategori: "",
  };
  const [product, setProduct] = useState(initialState);
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;

  const {
    nama,
    diskon,
    newharga,
    oldharga,
    umur,
    size,
    persediaan,
    deskripsi,
    detailsize,
    kategori,
  } = product;

  const [foto, setFoto] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (id) {
      setEdit(true);
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setFoto(res.product.foto);
      });
    } else {
      setEdit(false);
      setProduct(initialState);
      setFoto([]);
    }
  }, [id]);

  const handleInputProduk = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadProduk = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newFoto = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File gambar tidak ada." },
      });
    files.forEach((file) => {
      if (file.size > 1024 * 1024) return (err = "Ukuran gambar maksimal 1MB.");
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg"
      )
        return (err = "Format gambar salah.");

      num += 1;
      if (num <= 5) newFoto.push(file);
      return newFoto;
    });
    if (err)
      return dispatch({
        type: "NOTIFY",
        payload: { error: err },
      });

    const imgCount = foto.length;
    if (imgCount + newFoto.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Pilih 5 gambar" },
      });
    setFoto([...foto, ...newFoto]);
  };

  const deleteImage = (index) => {
    const newArray = [...foto];
    newArray.splice(index, 1);
    setFoto(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Authentication is not valid." },
      });
    if (
      !nama ||
      !diskon ||
      !newharga ||
      !oldharga ||
      !umur ||
      !size ||
      !persediaan ||
      !deskripsi ||
      !detailsize ||
      kategori === "all" ||
      foto.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Mohon isikan semua form dengan benar !." },
      });
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });
    let media = [];
    const imgNewURL = foto.filter((img) => !img.url);
    const imgOldURL = foto.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await uploadFoto(imgNewURL);

    let res;
    if (edit) {
      res = await putData(
        `product/${id}`,
        { ...product, foto: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    } else {
      res = await postData(
        "product",
        { ...product, foto: [...imgOldURL, ...media] },
        auth.token
      );
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    }
    router.push("/admin/listProduk");

    return dispatch({
      type: "NOTIFY",
      payload: { success: res.msg },
    });
  };

  return (
    <>
      <Head>
        <title>Tambah Produk</title>
      </Head>
      <LayoutAdmin>
        <div className="product_manager m-4 p-3 shadow">
          <h2 className="text-center mb-3 font-weight-bold">
            Form Tambah Data Produk
          </h2>
          <form className="row form-group rounded mt-5" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="nama">Nama produk</label>
              <input
                type="text"
                name="nama"
                value={nama}
                placeholder="Nama produk"
                className="d-block mb-4 w-100 p-2 rounded form-control"
                onChange={handleInputProduk}
              />
              <div className="row mb-2">
                <div className="col-sm-6">
                  <label htmlFor="oldHarga">Harga lama</label>
                  <input
                    type="number"
                    name="oldharga"
                    value={oldharga}
                    placeholder="Harga lama produk"
                    className="d-block w-100 p-2 rounded form-control"
                    onChange={handleInputProduk}
                  />
                  <label htmlFor="newHarga" className="mt-2">
                    Harga baru
                  </label>
                  <input
                    type="number"
                    name="newharga"
                    value={newharga}
                    placeholder="Harga baru produk"
                    className="d-block w-100 p-2 rounded form-control"
                    onChange={handleInputProduk}
                  />
                  <label htmlFor="diskon" className="mt-2">
                    Diskon{" "}
                  </label>

                  <input
                    type="text"
                    name="diskon"
                    value={diskon}
                    placeholder="diskon"
                    className="d-block w-100 p-2 rounded form-control"
                    onChange={handleInputProduk}
                  />
                </div>
                <div className="col-sm-6 mb-2">
                  <label htmlFor="persediaan">Stok produk</label>
                  <input
                    type="number"
                    name="persediaan"
                    value={persediaan}
                    placeholder="Jumlah stok"
                    className="d-block w-100 p-2 rounded form-control"
                    onChange={handleInputProduk}
                  />
                  <label htmlFor="umur" className="mt-2">
                    Umur{" "}
                    <span className="text-danger" style={{ fontSize: "12px" }}>
                      *(gunakan tanda "-")
                    </span>
                  </label>

                  <input
                    type="text"
                    name="umur"
                    value={umur}
                    placeholder="Contoh 4 - 7...."
                    className="d-block w-100 p-2 rounded form-control"
                    onChange={handleInputProduk}
                  />
                </div>
              </div>
              <label htmlFor="size">
                Ukuran{" "}
                <span className="text-danger" style={{ fontSize: "12px" }}>
                  *(gunakan tanda "-")
                </span>
              </label>
              <input
                type="text"
                name="size"
                value={size}
                placeholder="Contoh S - M - L - XL...."
                className="d-block mb-3 w-100 p-2 rounded form-control"
                onChange={handleInputProduk}
              />
              <div style={{ fontSize: "17px" }}>Deskripsi</div>
              <textarea
                className="d-block my-2 w-100 p-2 rounded form-control"
                name="deskripsi"
                id="deskripsi"
                cols="30"
                rows="4"
                value={deskripsi}
                placeholder="Deskripsi produk...."
                onChange={handleInputProduk}
              />
              <div style={{ fontSize: "17px" }}>Detail ukuran</div>
              <textarea
                className="d-block my-2 w-100 p-2 rounded form-control"
                name="detailsize"
                id="detailsize"
                cols="30"
                rows="6"
                value={detailsize}
                placeholder="Detail ukuran produk...."
                onChange={handleInputProduk}
              />
              <div style={{ fontSize: "17px" }}>Pilih kategori</div>
              <div className="input-group-prepend px-0 my-2">
                <select
                  className="custom-select text-capitalize"
                  name="kategori"
                  id="kategori"
                  value={kategori}
                  onChange={handleInputProduk}
                >
                  <option value="all">All kategori</option>
                  {categories.map((c) => (
                    <option value={c._id} key={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn text-white py-2 px-3">
                {edit ? "Update" : "Simpan"}
              </button>
            </div>
            <div className="col-md-6">
              <label htmlFor="file">Upload gambar</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <span className="input-group-text">Upload</span>
                </div>
                <div className="custom-file border rounded ">
                  <input
                    type="file"
                    className="custom-file-input"
                    onChange={handleUploadProduk}
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="row img-up mx-0">
                {foto.map((img, index) => (
                  <div key={index} className="file_img my-1">
                    <img
                      src={img.url ? img.url : URL.createObjectURL(img)}
                      alt=""
                      className="img-thumbnail rounded"
                    />
                    <span onClick={() => deleteImage(index)}>X</span>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default CreateProduk;
