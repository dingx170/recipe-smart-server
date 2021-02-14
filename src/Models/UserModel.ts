import  {Schema} from "mongoose"
import {DataAccess} from '../DataAccess'
import {IUserModel} from '../Interfaces/IUserModel'
import {AllergyType} from '../Enums/AllergyType'
import { ObjectID, ObjectId } from "mongodb"
import { UserTag } from "../Enums/UserTag"


let mongooseConnection = DataAccess.mongooseConnection;


class UserModel {
  private schema: any;
  private model: any;
  private static instance: UserModel;
  private static idGenerator:number = 1001;
 

  private constructor() {
    this.createSchema();
    this.createModel();
  }

  public static getInstance():any{
    if(this.instance == null){
      return new UserModel();
    }return this.instance;
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

  public retrieveUserByID(res: any, myid: any): any {

    let query = this.model.findOne({user_id:myid});
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
    this.model.updateOne({user_id: id}, new_specs, (err) =>{
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

    