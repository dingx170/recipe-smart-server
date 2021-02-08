import {ObjectId, Date, Document} from "mongoose"
import {AllergyType} from '../Enums/AllergyType'
import {UserTag} from '../Enums/UserTag'

interface IUserModel extends Document {
    
    user_id: Number,
    name: String;
    password:String,
    email: String,
    photo: Buffer,
    restrictions: [AllergyType],
    userTags: [UserTag]
}

export {IUserModel};