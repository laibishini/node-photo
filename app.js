var express = require("express");
var router = require('./controller/router.js')
var app = express();


app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbum);
app.get("/up",router.showUp);
app.post("/up",router.dopost);

app.use(function(request,response){
    response.render("err")

})



app.listen(3000);

//http://127.0.0.1:3000/