const express = require("express") //import express
const router = express.Router(); //express gava inna router eka gaththa (Router eka thamai routing process eka manage karanne)
const User = require("../models/user") //model eke user import


router.post("/users/login", async (req,res)=>{
    try {
    const user = await User.findByCredentials(req.body.email,req.body.password)
    res.send(user)
} catch (error) {
    res.status(401).send()
}
})

router.post("/users", async (req, res)=>{ //("path", async function)   //localhost:3000/users
    // Manually Setup
    // const user = new User({
    //     name: "test",
    //     email: "test@gmail.com",
    //     age: 25
    // })

    console.log(req.body)
    const user = new User(req.body)

    try {
        await user.save() //mongoose walin db connect karagena meka write kara gnnawa. Habai mekata tikak wela yana nisa apita wait karanna await keyword eka use kara
        res.status(201).send(user) //Database eken ena response eka (Backend to Frontend)
    } catch (error) {
        res.status(400).send(error)
    }

    //await user.save()
    
});

router.get("/users", async (req, res)=>{ //path eka same wunata kmk na method eka wena nisa
    //const users = await User.find({}) //{} kiyanne all users. Methana await kara poddak idala me data tika aragena ynna kiyanna
     
    try {
        const users = await User.find({}) //find all users
        //const users = await User.find({_id:"6423b9ac89bb9c6132dcf185"}) //find one user
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/users/:id", async (req, res)=>{
    const _id = req.params.id //request eke ena param id eka const _id variable ekata dagaththa

    try {
    const user = await User.findById(_id) //database ekakth ekka katha karana nisa await kara

        //Id eka thiyena User avaibleda kyla check karanawa
        // if(user){} //User knk innawa nm meya JS waladi true widihata thamai ganne
        if(!user){ //User knk nathinm aluthata yawa
            return res.status(404).send();
        }

        res.status(200).send(user); 
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/users/:id", async (req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body,{
            new:true //update karapu userwa thama return karanne
        });

        if(!updatedUser){
            return res.status(404).send();
        }
        res.status(200).send(updatedUser); 
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/users/:id", async (req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id)

        if(!deletedUser){
            return res.status(404).send();
        }
        res.status(200).send(deletedUser); 
    } catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router //export router (2nd line)
