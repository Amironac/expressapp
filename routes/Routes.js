const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/model");

let {ensureAuthenticated,forwardAuthenticated} = require("../config/auth")

router.get("/" , forwardAuthenticated,(req,res) => res.render("choose"));
router.get("/dashboard" ,ensureAuthenticated, (req,res) => res.render("dashboard", {
    user: req.user
}));

router.get("/register" , (req,res) => res.render("register"));
router.get("/login" , (req,res) => res.render("login"))





router.post("/register", (req,res) => {
    let {firstname , lastname , email, password,confirmpassword,gender,ethnicity} = req.body;
    let errors = [];
    if(!firstname ){
        errors.push({msg : "Fill out required fields please"})
    }
    else{
    User.findOne({raw:true , where : {email: email}})
            .then( items => {
                if(items){
                    errors.push({msg : "This email is already used"})
                    console.log("That email is already used")
                    res.render("register", {errors})
                }
                else{
                    User.create({
                        firstname,
                        lastname,
                        email,
                        password,
                        confirmpassword,
                        gender,
                        ethnicity
                    })
                    .then(() => res.redirect("/"))
                    .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err))
        
    }
})

//Login handle
router.post("/login" , (req,res,next) =>{
    
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login"
    })(req,res,next);

});

//Logout handle

router.get("/logout", (req,res) => {
    req.logout();
    res.redirect("/login")
})

module.exports = router;