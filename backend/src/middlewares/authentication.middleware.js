import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt=asyncHandler(async(req,_,next)=>{

    try{

    const token=req.cookies?.accessToken || req.header("Authorisation")?.replace("Bearer ","");
    

    if(!token){
        throw new ApiError(409,"some error is there")
    }

    const decoded=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);

    const user=await User.findById(decoded?._id).select("-password -refreshToken")

    console.log(user);

    if(!user){
        throw new ApiError(401,"invalid access token");
    }

    req.user=user;

    next();
}catch(err){
    console.log(err);
    throw new ApiError(401,"some error in authorisation");
}
})