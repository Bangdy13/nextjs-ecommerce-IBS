import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../store/GlobalState";
import DetailOrderan from "../../../components/componentsadmin/content/DetailOrderan";
import LayoutAdmin from "../../../components/componentsadmin/LayoutAdmin";

const Detailpesanan = () => {
  const { state, dispatch } = useContext(DataContext);
  const { orders, auth } = state;

  const router = useRouter();

  const [detailPesanan, setDetailPesanan] = useState([]);

  useEffect(() => {
    const newArray = orders.filter((order) => order._id === router.query.id);
    setDetailPesanan(newArray);
  }, [orders]);

  if (!auth.user) return null;

  return (
    <>
      <Head>
        <title>Detail Pesanan</title>
      </Head>
      <LayoutAdmin>
        <div className="my-4 heading2 shadow px-4">
          <h1 className="text-center font-weight-bold mb-5">
            {auth.user.role === "user"
              ? "Detail Pesanan"
              : "Detail Pesanan Pelanggan"}
          </h1>
          <DetailOrderan
            detailPesanan={detailPesanan}
            state={state}
            dispatch={dispatch}
          />
        </div>
      </LayoutAdmin>
    </>
  );
};

export default Detailpesanan;
