const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware so apps can talk with eachg other like pg taliing with opisrgress an express and we need the parser too so we use app.use

app.use(express.json());
app.use(cors());

//post info
    app.post("/", async(req,res)=>{
       try {
           const {name,price,amount,sector,thmnth,smonth,trade} = req.body
        const newInfo = await pool.query(
            "INSERT INTO crypto(id,name,price,amount,sector,thmnth,smonth,trade) VALUES(nextval('crypto_id_seq'),$1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [name,price,amount,sector,thmnth,smonth,trade]
        )
        res.json(newInfo.rows)
       } catch (error) {
        console.log(error)
       } 
    })


//get info 
    app.get("/", async(req,res)=>{
        try {
            const allinfo = await pool.query(
                "SELECT * FROM crypto;"
            )
            res.json(allinfo.rows) //.rows reduces what we get back from the query
        } catch (error) {
            console.log(error)
        }
    }) 
    // so when you reload the server the chanes get updated 


app.listen(5000,()=>{
    console.log("hello")
})