import {Request, Response} from "express";
import {UserModel} from '../Models/UserModel';

class UserController{

    private static userModel = UserModel.getInstance();

    public static createUser(req : Request, res : Response){
        console.log(req.body);
        
	    UserController.userModel.createUser(req.body, res);

	    console.log("executed create user")
    }

    public static retrieveUser(req : Request, res : Response){
        let filter = req.query.body;
    
        UserController.userModel.retrieveUser(res, {filter});

        console.log("executed retrieve user by condition");
    }

    public static retrieveUserByID(req : Request, res : Response){
        let id = req.params.id;
        console.log('Query single list with uid: ' + id);
        UserController.userModel.retrieveUserByID(res, id);

        console.log("executed retrieve user by id")
    }

    public static updateUser(req : Request, res : Response){
        UserController.userModel.updateUser(req.params.id, req.body, res);
	    console.log("updated user");
    }

    public static async logincheck(req: Request, res : Response){
        let id = req.body.username;
        let password = req.body.password;
        let ans: any;
        try{
            ans = await UserController.userModel.findUser(id, password, res);
        }catch(err){
            // console.log(err);
        }
        
        let vali = ans.password == password;
        console.log(ans.password + " input: " + password +" result is " + vali);
        if(vali){
            req.session.regenerate(function(err) {
                if(err){
                    return res.json({ret_code: 2, ret_msg: 'Login failed'});                
                }
                
                req.session.loginUser = ans.user_id;
                
                res.json({ret_code: 0, ret_msg: 'Login Successful', userid: req.session.loginUser});                           
            });
        }else{
            res.json({ret_code: 1, ret_msg: 'Wrong username or password'});
        }  
    }

    public static getSession(req: Request, res : Response){
        var sess = req.session;
        var loginUser = sess.loginUser;
        var isLogined = !!loginUser;

        res.send({
            isLogined: isLogined,
            id: loginUser || ''
        });
    }

}
export {UserController}