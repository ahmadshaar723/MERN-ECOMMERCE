import { Table, Modal, Button, TextInput, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { updateSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

const CartPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userProducts, setUserProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [publishError, setPublishError] = useState(null);

  //   const [total, setTotal] = useState(0)
  var total = 0;
  const [formData, setFormData] = useState({
    userid: currentUser._id,
    
    username: currentUser.username,
    orderitems: currentUser.cartData,
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product/getproducts?limit=100`);
        const data = await res.json();
        if (res.ok) {
          setUserProducts(data.products);
        }
      } catch (error) {}
    };

    fetchProducts();
  }, []);
  if (!currentUser) {
    navigate("/sign-in");
  }
  const addToCart = async (product) => {
    const res = await fetch(`/api/user/addtocart/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: product }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateSuccess(data));
    }
  };

  const removeFromCart = async (product) => {
    const res = await fetch(`/api/user/removefromcart/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: product }),
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(updateSuccess(data));
    }
  };
  console.log(formData);

  const handlerSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message)
        return
      }
      const fetchUser = async () => {
        const res = await fetch(`/api/user/emptycart/${currentUser._id}`, {
          method: "PUT",
          body: JSON.stringify("formData"),
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(updateSuccess(data));
          setPublishError(null)
        }
      };
      if (res.ok) {
        navigate("/");
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (currentUser.count === 0) {
    return (
      <div className="min-h-screen pt-10">
        <h3 className="h3 text-center">No products in yuor cart!.</h3>
      </div>
    );
  }
  return (
    <>
      <div className="table-auto w-3/4 overflow-x-scroll md:mx-auto py-10 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 min-h-screen">
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Product image</Table.HeadCell>
            <Table.HeadCell className="text-center">Name</Table.HeadCell>
            <Table.HeadCell className="text-center">Price</Table.HeadCell>
            <Table.HeadCell className="text-center">Quantity</Table.HeadCell>
            <Table.HeadCell className="text-center">Total</Table.HeadCell>
            <Table.HeadCell className="text-center">Remove</Table.HeadCell>
            <Table.HeadCell className="text-center">Add</Table.HeadCell>
          </Table.Head>
          {userProducts.map((product) => {
            if (
              currentUser.cartData.find((item) => item.id === product._id) !=
              undefined
            ) {
              let quantity = currentUser.cartData.find(
                (item) => item.id === product._id
              ).count;
              // setTotal(total+(quantity*product.new_price))
              // console.log(total);
              total = total + quantity * product.new_price;

              return (
                <Table.Body key={product.slug} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-10 object-contain bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold text-sm">
                      {product.name}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold text-sm">
                      {product.new_price}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold text-sm">
                      {quantity}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold text-sm">
                      {quantity * product.new_price}
                    </Table.Cell>
                    <Table.Cell className="text-red-500 text-2xl flex  justify-center items-center pt-6">
                      <MdOutlineRemoveCircle
                        className="cursor-pointer"
                        onClick={() => removeFromCart(product._id)}
                      />
                    </Table.Cell>
                    <Table.Cell className="text-green-500 text-2xl text-center">
                      <span>
                        <MdAddCircle
                          className=" cursor-pointer "
                          onClick={() => addToCart(product._id)}
                        />
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            }
          })}
        </Table>
        {currentUser.count > 0 && (
          <div className=" my-16 p-8  rounded-md  w-full max-w-[666px]">
            <div className="flex flex-col gap-10">
              <h4 className="bold-20">Summary</h4>
              <div>
                <div className="flexBetween py-4">
                  <h4 className="medium-16">Subtotal:</h4>
                  <h4 className="text-gray-30 font-semibold">${total}</h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                  <h4 className="medium-16">Shipping Fee:</h4>
                  <h4 className="text-gray-30 font-semibold">Free</h4>
                </div>
                <hr />
                <div className="flexBetween py-4">
                  <h4 className="bold-18">Total:</h4>
                  <h4 className="bold-18">${total}</h4>
                </div>
              </div>
            </div>
            <div className="py-5">
              <h3 className="bold-20">Please fill your information:</h3>
              <form
                onSubmit={handlerSubmit}
                className="py-3 flex flex-col gap-3"
              >
                <TextInput
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={currentUser.username}
                />
                <TextInput
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address: e.target.value,
                      amount: total,
                    });
                  }}
                  placeholder="Your address"
                />
                <TextInput
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      phonenumber: e.target.value,
                      amount: total,
                    });
                  }}
                  placeholder="Your phone number"
                />

                <button type="submit" className="btn_dark_rounded w-44">
                  Order
                </button>
                {publishError && (
                  <Alert className="mt-5" color="failure">
                    {" "}
                    {publishError}
                  </Alert>
                )}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
