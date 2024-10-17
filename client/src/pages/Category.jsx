import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Select } from "flowbite-react";

const Category = ({ category, banner }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setshowMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState()
  const [sort, setSort] = useState('dec')
  useEffect(() => {
    const fetchPosts = async () => {
      setshowMore(true);
      setLoading(true);
      const res = await fetch(
        `/api/product/getproducts?limit=8&category=${category}&sort=${sort}`
      );
      const data = await res.json();
      setData(data.products);
      setLoading(false);
      setTotalProducts(data.totalProducts)
      if (data.products.length < 8) {
        setshowMore(false);

      }
    };
    fetchPosts();
  }, [category,sort]);

  const handleShowMore = async () => {
    const startIndex = data.length;
    try {
      const res = await fetch(
        `/api/product/getproducts?category=${category}&startIndex=${startIndex}&sort=${sort}`
      );
      const data = await res.json();
      if (res.ok) {
        setData((prev) => [...prev, ...data.products]);
        if (data.products.length < 8) {
          setshowMore(false);
        }
      }
    } catch (error) {}
  };

  const handleChange = (e) =>{
    if(e.target.id === 'sort'){
      setSort(e.target.value)
    }
  }

  return (
    <section className="max_padd_container py-2 xl:py-12">
      <div>
        <div>
          <img src={banner} alt="" className="block my-7 mx-auto" />
        </div>
        <div className="flexBetween my-8 mx-2">
          <h5>
            <span className="font-bold">Showing {data.length}</span> out of {totalProducts} products
          </h5>
          <div className="flexBetween max-sm:p-4 gap-x-4 px-8 py-3 ">
          <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select  id="sort" onChange={handleChange}>
              <option value="dec">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div> 
        </div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {showMore && (
          <div className="mt-16 text-center">
            <button className="btn_dark_rounded" onClick={handleShowMore}>
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
