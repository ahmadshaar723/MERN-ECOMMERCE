import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deleteOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", create);
router.get("/getorders",verifyToken, getOrders);
router.delete("/deleteorder/:orderId/:userId", verifyToken, deleteOrder);
router.put("/updateorder/:orderId/:userId", verifyToken, updateOrder);

export default router;
