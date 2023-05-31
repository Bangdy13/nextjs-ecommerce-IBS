import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DetailPesanan from "../../components/DetailPesanan";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { DataContext } from "../../store/GlobalState";

const Detailpesanan = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();

  const [detailPesanan, setDetailPesanan] = useState([]);

  useEffect(() => {
    const newArray = orders.filter((order) => order._id === router.query.id);
    setDetailPesanan(newArray);
  }, [orders, router.query.id]);

  if (!auth.user) return null;

  return (
    <>
      <Head>
        <title>Detail Pesanan</title>
      </Head>
      <Navbar />
      <div className=" heading2 shadow px-4" style={{ margin: "6.5rem" }}>
        <h1 className="text-center font-weight-bold">
          {auth.user.role === "user"
            ? "Detail Pesanan"
            : "Detail Pesanan Pelanggan"}
        </h1>
        <div className="my-4">
          <button
            type="button"
            className="btn_bayar"
            onClick={() => router.push("/orderan")}
          >
            <i className="fas fa-angles-left" aria-hidden="true"></i> Kembali
          </button>
        </div>
        <DetailPesanan
          detailPesanan={detailPesanan}
          state={state}
          dispatch={dispatch}
        />
      </div>
      <Footer />
    </>
  );
};

export default Detailpesanan;
