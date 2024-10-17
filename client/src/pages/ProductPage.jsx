import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import ProductHd from "../components/ProductHd";
import { MdStar } from "react-icons/md";
import LatestProduct from "../components/LatestProduct";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../redux/user/userSlice";
const ProductPage = () => {
  const { productSlug } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/getproducts?slug=${productSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        }
        if (res.ok) {
          setLoading(false);
          setError(false);
          setProduct(data.products[0]);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchProduct();
  }, [productSlug]);

  const addToCart = async () => {
    if(!currentUser){
      return navigate('/sign-in')
    }
    const res = await fetch(`/api/user/addtocart/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: product._id }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateSuccess(data));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <>
      <section className="max_padd_container py-8">
        <div className="flex items-center justify-center">
          <ProductHd product={product} />
        </div>
        <div className="flex flex-col gap-14 lg:flex-row py-3  justify-center">
          <div className="w-full sm:w-80">
            <img src={product.image} alt="" className="rounded-md" />
          </div>
          <div className="flex flex-col xl:flex-[1.7] ">
            <h3 className="h3">{product.name}</h3>
            <div className="flex gap-x-2 text-[#ff813f] medium-22 pt-5">
              <MdStar />
              <MdStar />
              <MdStar />
              <MdStar />
            </div>
            <div className="flex gap-x-6 medium-20 my-4">
              <div className="line-through">{product.old_price}</div>
              <div className="text-[#ff813f]">{product.new_price}</div>
            </div>
            <div>
              <h3 className="text-xl font-semibold capitalize">
                Category: {product.category}
              </h3>
            </div>
            <div className="flex flex-col gap-y-3 mb-4 max-w-[555px] pt-5 sm:pt-32    ">
              <button
                className="btn_dark_rounded !rounded-none uppercase regular-14 tracking-widest"
                onClick={addToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <LatestProduct />
    </>
  );
};

export default ProductPage;
