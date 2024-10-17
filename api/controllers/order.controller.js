import Order from "../models/Order.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (
    !req.body.username ||
    !req.body.amount ||
    !req.body.phonenumber ||
    !req.body.address ||
    !req.body.orderitems
  ) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const newOrder = new Order({ ...req.body });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to see all orders"));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const ordersToAmount=await Order.find({});
    let totalAmount=0;
    ordersToAmount.map((order)=>{
      totalAmount+=order.amount
    })
   
    
    const orders = await Order.find({
      ...(req.query.orderId && {_id:req.query.orderId})
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalOrders = await Order.countDocuments();
    const now = new Date();
    const oneMothAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthOrders = await Order.countDocuments({
      createdAt: { $gte: oneMothAgo },
    });
    res.status(200).json({
      orders,
      totalOrders,
      lastMonthOrders,
      totalAmount,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this order"));
  }
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this order"));
  }
  try {
    await Order.findByIdAndDelete(req.params.orderId);
    res.status(200).json("The order has been deleted");
  } catch (error) {
    next(error);
  }
};
