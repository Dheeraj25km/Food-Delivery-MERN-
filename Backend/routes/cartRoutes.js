
//  Carete three routes for cart using three component from cartController
 
import express from "express"

import {addCart,removeFromCart,getCart} from "../controllers/cardController.js"

// import or connect middleware and add middleware between these three route
import authMiddleware from "../middlewares/auth.js";

const cartRouter = express.Router();


// carete three API endpoint
cartRouter.post("/add",authMiddleware,addCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.post("/get",authMiddleware,getCart)

export default cartRouter;