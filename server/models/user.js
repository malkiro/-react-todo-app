const mongoose = require("mongoose") //import mangoose
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema; 

const userShema = new Schema({
    //Athule api template eka hadanawa
    name : {
        type : String,
        required : true //database ekata user obj ekak danakota name mandatory (This like a validation)
    },
    email : {
        type : String,
        required : true,
        unique: true,
        trim: true
    },
    age : {
        type : Number,
        required : true
    },
    password:{
        type : String,
        trim: true,
        required : true,
    }
})

//Password eka encrypt karanawa
userShema.pre("save", async function (next){
    const user = this; //this --> user variable ekata dn me save wena yana userwa tak gala load karanawa

    //Userge password eka wenas wunada balanawa
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8) //hash -> special allgorithem ekk | 8 times normally use karanawa (ayeth katawath ganna ba ethakota) | awai wela inna wenwa tikak
    }
    next()
})

//Static/Statics Method -> user knkwa create karanne nathuwa user module eka haraha collection eka access karanna puluwan method ekk
// userShema.statics.findByCredentials = async (email,password)=>{
//     const user = await User.findOne({email})

//     if(!user){
//         throw new Error()
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if(!isMatch){
//         throw new Error()
//     }

//     return user;
// }

userShema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    
    if(!user){
        throw new Error()
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch){
        throw new Error()
    }
    return user;
}


const User = mongoose.model("User", userShema) // Api hadapu Schema eka use karala model eka hadagnnawa ("Collection name", Schema name)

module.exports = User //User wa wena thanaka use karanna puluwan ekawa export karoth witharai