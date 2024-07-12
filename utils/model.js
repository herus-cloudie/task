import {Schema , model , models} from 'mongoose'

let UserSchema = new Schema({
    email : {
        type : String,
        require : true
    },
    name: {
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    },
    role: {
        type : ["USER" , "ADMIN"],
        default : 'USER'
    },
} , {timestamps : true}
)

let ExchangeUser = models.ExchangeUser|| model("ExchangeUser" , UserSchema)

export default ExchangeUser;