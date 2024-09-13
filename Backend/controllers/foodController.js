
import foodModel from '../models/foodmodel.js'
import fs from 'fs'
//use this fun we add food data
const addfood= async (req,res)=>{

let image_filename = `${req.file.filename}`;

const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price : req.body.price,
    category: req.body.category,
    image : image_filename
})
    try{
        await food.save()
        res.json ({success:true,message:"Food Added"})
    }catch (error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}


//display food item in database
const listfood = async (req,res)=>{
  try{
    const foods = await foodModel.find({});
    // console.log(foods)
    res.json({success:true, data:foods})
  }catch(error){
    res.json({success:false,data:"Error"})
  }
}

//Remove food item 
const removefood = async(req,res)=>{
   try {
       const food = await foodModel.findById(req.body.id); //find food by id of selected food 
       fs.unlink(`uploads/${food.image}`,()=>{})    // delete or unlink food image from uploads folder
       await foodModel.findByIdAndDelete(req.body.id)  // delete food data from database 
       res.json({success:true,message:"Removed succesfully"})
   } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"})
   }

}


export {addfood, listfood,removefood}