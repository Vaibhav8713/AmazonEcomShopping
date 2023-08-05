const express = require('express');
const router = new express.Router();
const Products = require('../models/productsSchema');
const USER = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const authenicate = require('../middleware/authenticate');

//get productsdata api
router.get('/getproducts', async(req, res)=>{
    try {
        const productsdata = await Products.find();
        return res.status(201).send(productsdata);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

// get individual data
router.get('/getproductsone/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const individualdata = await Products.findOne({id: id});
        return res.status(201).json(individualdata);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
})

//reqister data
router.post("/register", async(req, res)=>{

    const {fname, email, mobile, password, cpassword} = req.body;

    if(!fname || !email || !mobile || !password || !cpassword){
        return res.status(422).json({error: "fill all the data"});
        console.log(fname, email, mobile, password, cpassword);
    }

    try {
        const preuser = await USER.findOne({email: email});
        if(preuser){
            return res.status(422).json({error: "user already registered"});
        }
        else if(password !== cpassword){
            return res.status(422).json({error: "password and cpassword does not match"});
        }
        else{
            const finalUser = new USER({fname, email, mobile, password, cpassword});
            // -> at this step (before saving data in the database) -> password hashing process will occur
            const storedata = await finalUser.save();
            return res.status(201).json(storedata);
        }
    } catch (error) {
        return res.status(400).send( "error in catch at the time of registration backend" + error.message);
    }
})

// login user api
router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "fill all the data"})
    }

    try {
        const userlogin = await USER.findOne({email: email});
        if(!userlogin){
            return res.status(400).json({error: "user not registered"})
        }

        const isMatch = await bcrypt.compare(password, userlogin.password);

        // middleware = token generation (in the userSchema)
        const token = await userlogin.generateAuthToken();

        //after generating token -> genrate cookie
        res.cookie("Amazonweb", token, {
            expires: new Date(Date.now() + 90*24*4*15*60*1000),
            httpOnly: true
        })

        
        if(!isMatch){
            return res.status(401).json({error: "incorrect password"})
        }

        return res.status(201).json({userlogin})
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
})


// adding the data into the cart
router.post("/addcart/:id", authenicate, async(req, res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id: id});
        console.log("=> cart value : " +  cart);

        const UserContact = await USER.findOne({_id: req.userID});
        console.log("=> userContact = " + UserContact);

        if(UserContact){
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log("=> cartData = " + cartData);
            return res.status(201).json(UserContact);
        }
        else{
            return res.status(401).json({error: "invalid user"});
        }
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
})

router.get("/loggedinUser", authenicate, async(req, res)=>{
    try {
        const UserContact = await USER.findOne({_id: req.userID});
        if(UserContact){
            return res.status(201).json(UserContact);
        }
        else{
            return res.status(401).json({error: "invalid user"});
        }
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
});

// get cart details //
router.get("/cartdetails", authenicate, async(req, res) => {
    try {
        const buyuser = await USER.findOne({_id: req.userID});
        if(!buyuser){
            return res.status(401).json({error: error.message + " buy user not found "});
        }
        return res.status(201).json(buyuser);
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
})


// get valid user //
router.get("/validuser", authenicate, async(req, res) => {
    try {
        const validuserone = await USER.findOne({_id: req.userID});
        return res.status(201).json(validuserone);
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
})

// remove item from cart
router.delete("/remove/:id", authenicate, async(req, res)=>{
    try {
        const {id} = req.params;
        // req.rootUser.carts = req.rootUser.carts.filter((curval)=>{
        //     return curval.id != id;
        // })
        var index = -1;
        for(var i=0; i<req.rootUser.carts.length; i++){
            if(req.rootUser.carts[i].id === id){
                index=i;
                break;
            }
        }
        console.log("=> index = " + index);
        req.rootUser.carts.splice(index, 1); //deleting cart item 
        await req.rootUser.save();
        console.log("=> item removed");
        return res.status(201).json(req.rootUser);
    } catch (error) {
        return res.status(401).json({error: error.message});
    }
})


// for user logout
router.get("/logout", authenicate, async(req, res) => {
    try {

        //deleting the current token
        req.rootUser.tokens = req.rootUser.tokens.filter((currEle)=>{
            return currEle.token !== req.token;
        })

        //deleting the cookie
        res.clearCookie("Amazonweb", {path:"/"});

        req.rootUser.save();
        console.log("user loggedOut");

        return res.status(201).json(req.rootUser.tokens);
    } catch (error) {
        console.log("=> error while logging out at the router component at the backend(server)")
        return res.status(401).json({error: error.message});
    }
})

module.exports = router;