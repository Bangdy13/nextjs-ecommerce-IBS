export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_TO_CART: "ADD_TO_CART",
  ADD_TO_MODAL: "ADD_TO_MODAL",
  ADD_TO_ORDER: "ADD_TO_ORDER",
  ADD_USERS: "ADD_USERS",
  ADD_CATEGORY: "ADD_CATEGORY",
};

export const addKeranjang = (product, cart) => {
  if (product.persediaan === 0)
    return {
      type: "NOTIFY",
      payload: { error: "Produk ini sudah habis stock." },
    };

  const check = cart.every((item) => {
    return item._id !== product._id;
  });
  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "Produk telah ditambahkan ke keranjang." },
    };

  return {
    type: "ADD_TO_CART",
    payload: [...cart, { ...product, quantity: 1 }],
  };
};

export const kurang = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });
  return { type: "ADD_TO_CART", payload: newData };
};
export const tambah = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_TO_CART", payload: newData };
};

export const hapusKeranjang = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};

export const updateKeranjang = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};
