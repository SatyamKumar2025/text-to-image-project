import userModel from "../models/useModel.js";
 
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
const registerUser = async (req,res)=>
{
try{
const {name,email,password} = req.body;
if(!name || !email || !password)
{
  return res.json({sucess:false,message:'Missing Details'});
}

const existingUser = await userModel.findOne({email});

if(existingUser)
{
  return res.json({sucess:false,message:'User Already Exists'})
}

const salt= await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt);

const userData = {
  name,
  email,
  password:hashedPassword
}

const newUser=new userModel(userData);
const user = await newUser.save();

const token = jwt.sign({id: user._id},process.env.JWT_SECRET);

res.json({sucess:true,token,user:{name:user.name}});

}catch(error)
{
console.log(error)
res.json({sucess:false,message:error.message})}
}

const loginUser = async (req,res)=>
{
try {
  const {email,password}=req.body;
  const user=await userModel.findOne({email});
  if(!user)
  {
    return res.json({sucess:false,message:'User Does Not Exists'})
  }
  const isMatched =await bcrypt.compare(password,user.password);

  if(isMatched)
  {
    const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
    res.json({sucess:true,token,user:{name:user.name},message:'Login Sucessfull'})
    

  }else
  {
    res.json({sucess:false,message :'Invalid Credentials'})
  }

} catch (error) {

  console.log(error)
  res.json({sucess:false,message:error.message})
  
}
}

const userCredit = async (req,res)=>
{
  try {
    const {userId} = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    console.log("User Found:", user);
    res.json({success: true, credits: user.creditBalance, user:{name:user.name, email:user.email}})
    console.log(user.creditBalance)

  } catch (error) {
    console.log(error.message)
    res.json({success:false, message:error.message})
  }
}

export {registerUser,loginUser,userCredit}

 


