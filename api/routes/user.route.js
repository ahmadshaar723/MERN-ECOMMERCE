import express from "express";
import {
  deleteUser,
  signout,
  test,
  getUsers,
  getUser,
  addToCart,
  removeFromCart,
  emptyCart
} from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);
router.get('/:userId',getUser)
router.post("/signout", signout);
router.put("/addtocart/:userId",addToCart)
router.put("/removefromcart/:userId",removeFromCart)
router.put("/emptycart/:userId",emptyCart)
export default router;
