
//  ALL authentication process exicute in this part
//  it check authenrication


import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next)=>{
  const {token}= req.headers;  // Acess token through headers 
  if(!token){
    return res.json({
        success:false,
        message:"Not Authorised login again"
    })
  }
  try {
    const token_decode = jwt.verify(token,process.env.JWT_SECRET)  // yaha se token ka data store karenge
     req.body.userId = token_decode.id;
     next() // redirect next midleware
  } catch (error) {
    console.log(error);
    res.json({
        success:false,
        message:"Error"
    })
  }
}
export default authMiddleware;