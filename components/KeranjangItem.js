import Link from "next/link";
import { kurang, tambah } from "../store/Actions";

const KeranjangItem = ({ item, dispatch, cart }) => {
  return (
    <tr className="cart">
      <td style={{ width: "100px", overflow: "hidden" }}>
        <Link legacyBehavior id="link" href={`/detailproduk/${item._id}`}>
          <img
            src={item.foto[0]?.url}
            alt={item.foto[0]?.url}
            className="img-thumbnail w-100"
            style={{ minWidth: "80px", height: "90px", cursor: "pointer" }}
          />
        </Link>
      </td>
      <td style={{ minWidth: "100px" }} className="w-100 align-middle">
        <h6 style={{ fontSize: "16px", fontWeight: "normal" }}>{item.nama}</h6>
        <h6
          className="product_new_price"
          id="rupiah"
          style={{ fontSize: "14px", fontWeight: "normal" }}
        >
          Rp.
          {item.quantity * item.newharga}
        </h6>
        {/* <h6 style={{ fontSize: "14px", fontWeight: "normal" }}>{item.size}</h6> */}
      </td>
      <td className="align-middle text-center" style={{ minWidth: "270px" }}>
        <button
          className="btn-min"
          onClick={() => dispatch(kurang(cart, item._id))}
          disabled={item.quantity === 1 ? true : false}
        >
          {" "}
          -{" "}
        </button>
        <span className="px-3">{item.quantity}</span>
        <button
          className="btn-plus"
          onClick={() => dispatch(tambah(cart, item._id))}
          disabled={item.quantity === item.persediaan ? true : false}
        >
          {" "}
          +{" "}
        </button>
      </td>
      <td
        className="align-middle"
        style={{ minWidth: "50px", cursor: "pointer" }}
      >
        <i
          className="fas fa-trash-alt text-danger"
          aria-hidden="true"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: "ADD_TO_MODAL",
              payload: [
                {
                  data: cart,
                  id: item._id,
                  nama: item.nama,
                  type: "ADD_TO_CART",
                },
              ],
            })
          }
        ></i>
      </td>
    </tr>
  );
};

export default KeranjangItem;
