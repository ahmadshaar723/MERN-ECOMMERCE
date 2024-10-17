import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

import { AiFillProduct } from "react-icons/ai";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  const [lastMonthProducts, setLastMonthProducts] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          console.log(users);
          
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/product/getproducts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
          setTotalProducts(data.totalProducts);
          setLastMonthProducts(data.lastMonthProducts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order/getorders?limit=5");
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
          setTotalSales(data.totalAmount);
          setLastMonthOrders(data.lastMonthOrders);
          setTotalOrders(data.totalOrders);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchProducts();
      fetchOrders();
    }
  },[]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex sm:gap-12 gap-2 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 sm:w-56 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-lg">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 sm:w-56 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-lg">Total Products</h3>
              <p className="text-2xl">{totalProducts}</p>
            </div>
            <AiFillProduct className="bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthProducts}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 sm:w-56 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-lg">Total Orders</h3>
              <p className="text-2xl">{totalOrders}</p>
            </div>
            <FaFileInvoiceDollar className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthOrders}
            </span>
            <div className="text-gray-500">Last Month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 sm:w-56 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="flex flex-col gap-10 sm:gap-4">
              <h3 className="text-gray-500 text-lg">Total Amount Sales:</h3>
              <p className="text-2xl">{totalSales}$</p>
            </div>
            <FaSackDollar  className="bg-rose-700 text-white rounded-full text-5xl p-3 shadow-lg" />
            
          </div>
          
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
      <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent users</h1>
                <Link to={'/dashboard?tab=users'}><Button outline gradientDuoTone='purpleToPink'>See all</Button></Link>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>User image</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                </Table.Head>
                {users && users.map((user)=>(
                    <Table.Body key={user._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <img src={user.profilePicture} alt="user" className="w-10 h-10 rounded-full bg-gray-500" />
                            </Table.Cell>
                            <Table.Cell>
                                {user.username}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent products</h1>
                <Link to={'/dashboard?tab=products'}><Button outline gradientDuoTone='purpleToPink'>See all</Button></Link>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Product image</Table.HeadCell>
                    <Table.HeadCell>Product name</Table.HeadCell>
                    <Table.HeadCell>Product category</Table.HeadCell>
                </Table.Head>
                {products && products.map((product)=>(
                    <Table.Body key={product._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                <img src={product.image} alt="product" className="w-14 h-10 object-contain bg-gray-500" />
                            </Table.Cell>
                            <Table.Cell className="w-96">
                                <p className="line-clamp-2">{product.name}</p>
                            </Table.Cell>
                            <Table.Cell className="w-5">
                                {product.category}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-slate-800">
            <div className="flex justify-between p-3 text-sm font-semibold">
                <h1 className="text-center p-2">Recent orders</h1>
                <Link to={'/dashboard?tab=orders'}><Button outline gradientDuoTone='purpleToPink'>See all</Button></Link>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Order date</Table.HeadCell>
                    <Table.HeadCell>User name</Table.HeadCell>
                </Table.Head>
                {orders && orders.map((order)=>(
                    <Table.Body key={order._id} className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="w-96">
                                <p className="line-clamp-2">{new Date(order.updatedAt).toLocaleDateString()}</p>
                            </Table.Cell>
                            <Table.Cell>
                                {order.username}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
