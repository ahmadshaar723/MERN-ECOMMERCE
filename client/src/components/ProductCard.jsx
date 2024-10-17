import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg dark:shadow-slate-700 dark:bg-gray-900">
      <div className="relative flexCenter group overflow-hidden transition-all duration-100">
        <Link
          to={`/product/${product.slug}`}
          className="h-12 w-12 bg-white rounded-full flexCenter absolute top-1/2 bottom-1/2 !py-2 z-20 transition-all duration-700"
        >
          <FaSearch className="scale-125 hover:rotate-90 transition-all duration-100 dark:text-gray-800" />
        </Link>
        <img
          src={product.image}
          alt={product.name}
          className="w-full block object-cover group-hover:scale-110 transition-all duration-1000"
        />
      </div>
      <div className="p-4 overflow-hidden">
        <h4 className="my-[6px] medium-16 line-clamp-2 text-gray-30">
          {product.name}
        </h4>
        <div className="flex gap-5">
          <div className="bold-16">{product.new_price}$</div>
          <div className="text-[#ff813f] bold-16 line-through">
            {product.old_price}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
