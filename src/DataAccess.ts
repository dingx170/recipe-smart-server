import mongoose from "mongoose"

class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: mongoose.Connection;
    static DB_CONNECTION_STRING: string = 'mongodb://localhost:27017/test'; // 'mongodb://dbAdmin:test@localhost:3000/toDoSample?authSource=admin';

    constructor() {
        DataAccess.connect();
    }

    static connect(): mongoose.Connection {
        if (this.mongooseInstance) {
            return this.mongooseInstance;
        }

        this.mongooseConnection = mongoose.connection;
        this.mongooseConnection.on("open", () => {
            console.log("Connected to MongoDB");
        })

        this.mongooseInstance = mongoose.connect(this.DB_CONNECTION_STRING);
        
        // mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}, function(err) {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //     console.log("Database connected");
        // });

        return this.mongooseInstance;
    }
}

DataAccess.connect();
export {DataAccess};