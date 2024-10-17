import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { create, deleteProduct, getProducts, updateProduct } from '../controllers/product.controller.js'
const router=express.Router()

router.post('/create',verifyToken,create)
router.get('/getproducts',getProducts)
router.delete('/deleteproduct/:productId/:userId',verifyToken,deleteProduct)
router.put('/updateproduct/:productId/:userId',verifyToken,updateProduct)


export default router;