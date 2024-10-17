import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Modal, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setshowMore] = useState(true);
  const [showModal, setshowModal] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/order/getorders`);
        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
          if (data.orders.length < 9) {
            setshowMore(false);
          }
        }
      } catch (error) {}
    };
    if (currentUser.isAdmin) {
      fetchOrders();
    }
  }, [currentUser._id,orders]);

  const handleShowMore = async () => {
    const startIndex = orders.length;
    try {
      const res = await fetch(`/api/order/getorders?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setOrders((prev) => [...prev, ...data.orders]);
        if (data.orders.length < 9) {
          setshowMore(false);
        }
      }
    } catch (error) {}
  };

  const handleDeleteOrder = async () => {
    setshowModal(false);
    try {
      const res = await fetch(
        `/api/order/deleteorder/${orderIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setOrders((prev) =>
          prev.filter((order) => order._id !== orderIdToDelete)
        );
      }
    } catch (error) {}
  };

  const handleUpdateStatus = async (order)=>{
    const status = (order.status==="Pending" ? "Sending":order.status==="Sending"?"Done":"Pending")
   
    
    
    try {
      const res = await fetch(`/api/order/updateorder/${order._id}/${currentUser._id}`,{
        method:"PUT",
        headers:{
          "Content-Type": "application/json",

        },
        body:JSON.stringify({status:status}),
      })
      const data = await res.json()
      console.log(data);
      if(!res.ok){
        console.log(data.message);
        
      }
      
      if(res.ok){
        orders.map((o)=>{if(o._id===order._id)o.status=data.status})
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && orders.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="text-center">Date updated</Table.HeadCell>
              <Table.HeadCell className="text-center">User Name</Table.HeadCell>
              <Table.HeadCell className="text-center">Phone Number</Table.HeadCell>
              <Table.HeadCell className="text-center">Address</Table.HeadCell>
              <Table.HeadCell className="text-center">Amount</Table.HeadCell>
              <Table.HeadCell className="text-center">Status</Table.HeadCell>
              <Table.HeadCell className="text-center">Delete</Table.HeadCell>
            </Table.Head>
            {orders.map((order) => (
              <Table.Body key={order._id} className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center">
                {/* <Link to={`/order/${order._id}`}> */}
                    {new Date(order.updatedAt).toLocaleDateString()}
                    {/* </Link> */}
                  </Table.Cell>
                  <Table.Cell className="text-center">{order.username}</Table.Cell>
                  <Table.Cell className="text-center">{order.phonenumber}</Table.Cell>
                  <Table.Cell className="text-center">{order.address}</Table.Cell>
                  <Table.Cell className="text-center">{order.amount}</Table.Cell>
                  <Table.Cell className={`text-center ${order.status==="Pending" ? "text-orange-500":order.status==="Sending"?"text-yellow-300":"text-green-500"}`}><span onClick={()=>{handleUpdateStatus(order)}} className="cursor-pointer">{order.status}</span></Table.Cell>
                  <Table.Cell className="text-center">
                    <span
                      onClick={() => {
                        setshowModal(true);
                        setOrderIdToDelete(order._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >Delete</span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no orders yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setshowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this order?
            </h3>
            <div className="flex justify-between">
              <Button color="failure" onClick={handleDeleteOrder}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setshowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashOrders;
