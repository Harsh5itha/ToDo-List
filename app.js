//jshint esversion:6
const express = require("express");
// const https = require("https");
// const request = require("request");
const bodyparser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();
let items = ["Buy","Cook","Eat"];
let workitems = [];

app.set("view engine", "ejs");

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get ("/", function(req, res){
  // res.sendFile(__dirname+"/signup.html");
  let day = date.getDate();
  res.render("list", {
    listtitle: day,
    newlistitems: items
  });
});

app.post("/", function(req, res){
  let item = req.body.newitem;
  if (req.body.list === "Work"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {
    listtitle: "Work List",
    newlistitems: workitems
  });
});

app.post("/work", function(req, res){
  let item = req.body.newitem;
  workitems.push(item);
  console.log(req.body);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
