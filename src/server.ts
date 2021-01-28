import express, {Application, Request, Response} from "express";
import * as bodyParser from 'body-parser';

const app : Application = express();

const port : number = 8080; // default port to listen

app.use(bodyParser.json());

// route handler for default home page
app.get("/", (req : Request, res : Response) => {
    res.send("Hello from server! Hello world!")
});

app.post("/myrecipe", (req : Request, res : Response) => {
    res.send(req.body);
});

// start Express server
app.listen(port, () => {
    console.log("Server is running.");
});
