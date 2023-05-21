import React, { useContext, useEffect, useRef } from "react";
import { patchData } from "../helpers/fetchData";
import { updateKeranjang } from "../store/Actions";
import { DataContext } from "../store/GlobalState";

const BayarBtn = ({ order }) => {
  const refBayarBtn = useRef();
  const { state, dispatch } = useContext(DataContext);
  const { auth, orders } = state;

  useEffect(() => {
    paypal
      .Buttons({
        // Mengatur transaksi ketika tombol pembayaran diklik
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: order.total,
                },
              },
            ],
          });
        },
        // Selesaikan transaksi setelah persetujuan pembayar
        onApprove: function (data, actions) {
          dispatch({ type: "NOTIFY", payload: { loading: true } });
          return actions.order.capture().then(function (details) {
            patchData(
              `order/bayar/${order._id}`,
              {
                IDpembayaran: details.payer.payer_id,
              },
              auth.token
            ).then((res) => {
              if (res.err)
                return dispatch({
                  type: "NOTIFY",
                  payload: { error: res.err },
                });
              dispatch(
                updateKeranjang(
                  orders,
                  order._id,
                  {
                    ...order,
                    paid: true,
                    dateOfBayar: details.create_time,
                    IDpembayaran: details.payer.payer_id,
                    metode: "Cash on Delivery",
                  },
                  "ADD_TO_ORDER"
                )
              );
              return dispatch({
                type: "NOTIFY",
                payload: { success: res.msg },
              });
            });
          });
        },
      })
      .render(refBayarBtn.current);
  }, []);
  return <div ref={refBayarBtn}></div>;
};

export default BayarBtn;
