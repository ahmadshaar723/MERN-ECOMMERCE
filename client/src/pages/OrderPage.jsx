import { Table, Modal, Button, TextInput, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  const [error, seterror] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order/getorders?orderId=${orderId}`);
        const data = await res.json();
        if (res.ok) {
          console.log(data.orders[0]);
          console.log(order);
          setOrder(data.orders[0]);

          console.log(order);
        }
      } catch (error) {}
    };
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/product/getproducts?limit=100`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
        }
      } catch (error) {}
    };
    if (currentUser.isAdmin) {
      fetchOrder();
      fetchProducts();
    }
    console.log(order);
  },[]);

  return (
    <div className="table-auto w-3/4 overflow-x-scroll md:mx-auto py-10 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 min-h-screen">
      <Table>
        <Table.Head>
          <Table.HeadCell>Product image</Table.HeadCell>
          <Table.HeadCell className="text-center">Name</Table.HeadCell>
          <Table.HeadCell className="text-center">Price</Table.HeadCell>
          <Table.HeadCell className="text-center">Quantity</Table.HeadCell>
          <Table.HeadCell className="text-center">Total</Table.HeadCell>
        </Table.Head>

        {products.map((product) => {
          console.log(order);

          if (
            order.orderitems.find((item) => item.id === product._id) !=
            undefined
          ) {
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
                </Table.Row>
              </Table.Body>
            );
          }
        })}
      </Table>
    </div>
  );
};

export default OrderPage;
