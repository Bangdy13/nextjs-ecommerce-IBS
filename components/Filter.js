import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import filterSearch from "../helpers/filterSearch";

const Filter = ({ state }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [kategori, setKategori] = useState("");

  const { categories } = state;

  const router = useRouter();

  const handleCategory = (e) => {
    setKategori(e.target.value);
    filterSearch({ router, kategori: e.target.value });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : "all" });
  }, [search]);

  return (
    <>
      <div className="mb-3 input-group mx-0">
        <div className="input-group-prepend col-md-2 px-0 mt-2">
          <select
            className="custom-select text-capitalize"
            name="kategori"
            value={kategori}
            onChange={handleCategory}
          >
            <option value="all">All Produk</option>

            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <form autoComplete="off" className="mt-2 col-md-8 px-0">
          <input
            type="text"
            className="form-control"
            list="title_product"
            value={search.toLowerCase()}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <div className="input-group-prepend col-md-2 px-0 mt-2">
          <select
            className="custom-select text-capitalize"
            value={sort}
            onChange={handleSort}
          >
            <option value="-createdAt">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="-terjual">Best Sales</option>
            <option value="-newharga">Price: Hight-Low</option>
            <option value="newharga">Price: Low-Hight</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Filter;
