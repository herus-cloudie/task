import {Schema , model , models} from 'mongoose'

let UserSchema = new Schema({
    email : {
        type : String
    },
    name: {
        type : String,
        require : true
    },
    role: {
        type : ["USER" , "ADMIN"],
        default : 'USER'
    },
} , {timestamps : true}
)

let User = models.User|| model("User" , UserSchema)

export {User};