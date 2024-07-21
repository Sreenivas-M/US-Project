const userModel = require('../model/userModel');
const bcrypt = require('bcryptjs');

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
const deleteUser = async (req, res)=>{
    try {
        const {id} = req.params
        const user = await userModel.findByIdAndDelete(id)
        res.status(200).json({msg:"Deleted succesfully"})
    } catch (error) {
        res.status.json({msg:"Something went wrong"})
    }
}


module.exports = {createUser, updateUser, getUser, deleteUser };