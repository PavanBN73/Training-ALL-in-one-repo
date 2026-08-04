import express,  {type Request,type Response} from "express";

import accountsRoute  from "./routes/accountRoutes.js"

const app = express();
const port = 3030;

app.use("/api/accounts",accountsRoute);

app.use((err:Error,req:Request,res:Response)=>{
    res.status(500).send("Something Went Wrong");
})

app.listen(port,()=>{
    console.log(`Application is running on http://localhost:${port}`)
})