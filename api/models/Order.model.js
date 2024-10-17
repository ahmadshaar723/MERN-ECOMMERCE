import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    orderitems:{
        type:Object,
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    phonenumber:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Pending"
    }
},{timestamps: true})
const Order = mongoose.model("Order",orderSchema)
export default Order