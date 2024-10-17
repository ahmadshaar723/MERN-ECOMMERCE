import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true)
      const res = await fetch("/api/product/getproducts?limit=4&category=men");
      const data = await res.json();
      setData(data.products);
      setLoading(false)

    };
    fetchPosts();
  }, []);

  return (
    <section className="bg-[#f0f2f8] dark:bg-gray-800">
      <div className="max_padd_container py-12 xl:py-28 xl:w-[88%]">
        <h3 className="h3 text-black dark:text-white text-center">Popular Products</h3>
        <hr className="h-[3px] dark:via-white via-black md:w-full mx-auto bg-gradient-to-l from-transparent to-transparent mb-16" />
            {loading ? (
                <p className="text-center">Loading...</p>
            ) :(

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((product)=>(
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
            )}
      </div>
    </section>
  );
};

export default PopularProducts;
