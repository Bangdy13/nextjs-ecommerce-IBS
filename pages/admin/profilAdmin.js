import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import LayoutAdmin from "../../components/componentsadmin/LayoutAdmin";
import { patchData } from "../../helpers/fetchData";
import { uploadFoto } from "../../helpers/uploadFoto";
import validation from "../../helpers/validation";
import { DataContext } from "../../store/GlobalState";

const profilAdmin = () => {
  const { state, dispatch } = useContext(DataContext);
  const { auth, notify } = state;

  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialState);
  const { avatar, name, password, cf_password } = data;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  if (!auth.user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUpdateProfil = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = validation(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }
    if (name !== auth.user.name || avatar) updateInfo();
  };

  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.msg } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  const ubahAvatar = (e) => {
    const file = e.target.files[0];
    if (!file)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "File tidak ada." },
      });
    // Validasi ukuran foto
    if (file.size > 1024 * 1024)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Ukuran gambar harus maksimal 1mb." },
      });
    // Validasi format foto
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Format gambar salah." },
      });

    setData({ ...data, avatar: file });
  };

  const updateInfo = async () => {
    var media;
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    if (avatar) media = await uploadFoto([avatar]);
    patchData(
      "user",
      {
        name,
        avatar: avatar ? media[0].url : auth.user.avatar,
      },
      auth.token
    ).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      dispatch({
        type: "AUTH",
        payload: {
          token: auth.token,
          user: res.user,
        },
      });
      dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
  };

  return (
    <>
      <Head>
        <title>Profil Admin</title>
      </Head>
      <LayoutAdmin>
        <div className="profil-page heading2 ">
          <section className="row mb-5">
            <div className="col-md-5 shadow px-4 py-4 g-3 mx-auto">
              <h5 className="text-center text-uppercase font-weight-bold">
                {auth.user.role !== "admin" ? "Profile Saya" : "Profile Admin"}
              </h5>
              <div className="avatar text-center">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                  alt="avatar"
                />
                <span>
                  <i className="fas fa-camera"></i>
                  <p>Ubah Foto</p>
                  <input
                    type="file"
                    name="file"
                    id="file_up"
                    onChange={ubahAvatar}
                    accept="image/*"
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="name">Username</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  className="form-control"
                  placeholder="Your name"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={auth.user.email}
                  className="form-control"
                  disabled={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  placeholder="Your new password"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cf_password">Confirm New Password</label>
                <input
                  type="password"
                  name="cf_password"
                  value={cf_password}
                  className="form-control"
                  placeholder="Your confirm new password"
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn text-white w-100 py-2"
                disabled={notify.loading}
                onClick={handleUpdateProfil}
              >
                Update Profile
              </button>
            </div>
          </section>
        </div>
      </LayoutAdmin>
    </>
  );
};

export default profilAdmin;
