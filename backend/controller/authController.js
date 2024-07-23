const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const TOKEN = process.env.TOKEN

const createUser = async(req,res) =>{
    try {
        const {name, email, password, number} = req.body;
        const hasPass = bcrypt.hashSync(password, 10);
        const user = await userModel.create({
            name:name,
            email:email,
            password: hasPass,
            number:number

        });
        user.save();
        res.status(200).json({user});
        
    } catch (error) {
        console.error(error)
    }
}
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User not found!" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials!" });
      }
      const token = jwt.sign({user}, TOKEN, { expiresIn : "1d"})
  
      res.status(200).json({ token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  };
  

const updateUser = async (req, res)=>{
    try {
        const {id} = req.params.id
        const {name, email, number} = req.body;

        const user = await userModel.findByIdAndUpdate(id,{
            name:name,
            email:email,
            number:number
        }, {new:true})
        res.status(200).json({msg:"Update succesfully"})
    } catch (error) {
        res.status.json({msg:"Something went wrong"})
    }
}
const getUser = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(200).json({msg:"Something went wrong"})
    }
}
const getAllUser = async (req, res) => {
    const search = req.query.search || "";
    const page = parseInt(req.params.page) || 1;
    const perPage = parseInt(req.params.perPage) || 10;
    const searchRegex = new RegExp(search, "i");
    try {
      const count = await userModel.countDocuments({
        $or: [{ name: { $regex: searchRegex } }]
      });
  
      const users = await userModel.find({
        $or: [{ name: { $regex: searchRegex } }]
      })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort({ createdAt: 1 });
  
      res.status(200).json({ users, count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json({msg:"Deleted succesfully"})
    } catch (error) {
        res.status.json({msg:"Something went wrong"})
    }
}


module.exports = {createUser, updateUser, getUser, deleteUser, loginUser, getAllUser };