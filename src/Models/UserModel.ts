import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IUserModel} from '../Interfaces/IUserModel'
import {AllergyType} from '../Enums/AllergyType'
import { ObjectID, ObjectId } from "mongodb"
import { UserTag } from "../Enums/UserTag"
const assert = require('assert').strict;

let mongooseConnection = DataAccess.mongooseConnection;
// let mongooseObg = DataAccess.mongooseInstance;

class UserModel {
  public schema: any;
  public model: any;
  public static idGenerator:number = 1001;

  public constructor() {
    this.createSchema();
    this.createModel();
  }

  public createSchema(): void {
    this.schema = new Schema(
      {
        user_id: Number,
        user_name: String,
        password: String,
        email: String,
        photo: Buffer,
        restrictions: [
          {
            type: String,
            enum: AllergyType
          }
        ],
        userTags:{
            type:String,
            enum: UserTag
        }
      }, {collection: 'users'}
    );
  }

  public createModel(): void {
    this.model = mongooseConnection.model<IUserModel>("User", this.schema);
  }

  public retrieveUserByID(res: any, myid: ObjectID): any {

    let query = this.model.findOne({id:myid});
    query.exec( (err, item) => {
        if(err){
          console.log(err);
          return;
        }
        res.json(item);
      });
  }

  // finding user by email and username combination
  public retrieveUser(response: any, filter: Object): any { 
    let query = this.model.find(filter);
    query.exec( (err, item) => {
      if(err){
        console.log(err);
        
        return;
      }
      response.json(item);
    });
  }

  // creating user
  public createUser(user_specs: any, res: any): any{

    
    user_specs.user_id = UserModel.idGenerator;
    
    this.model.create([user_specs], (err)=>{
      if(err){
        console.log('object creation failed.');
      }
      
    });
    res.send(UserModel.idGenerator.toString());
    UserModel.idGenerator++;

    // const newUser = new this.model(user_specs);
    // newUser.save((err, ret) =>{
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     res.send(ret.id);
    // })
  }

  //update user
  public updateUser(id: any, new_specs: any, res: any): any{
    this.model.updateOne({_id: id}, new_specs, (err) =>{
        if(err){
            console.log(err);
            console.log('update behavior failed.')
            return;
        }
        res.send("updated successfully.");
    })

  }
}

export {UserModel};

    