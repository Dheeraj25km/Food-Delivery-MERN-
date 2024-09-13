import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, placeorder, updateOrderStatus, userOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter = express.Router();
// create API's
orderRouter.post("/place",authMiddleware,placeorder)
orderRouter.post("/verify",verifyOrder)

orderRouter.post("/userorder",authMiddleware,userOrder)  // convert auth token to userId use authMiddlewares

// get all myorder data on Admin order pannel
orderRouter.get("/list",listOrders)

orderRouter.post("/status",updateOrderStatus)

export default  orderRouter;