const LocalStrategy = require("passport-local").Strategy;


const User = require("../models/model");


module.exports = function(passport){
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email,password,done) => {
            // Match user 
            let query = {email:email, password:password};
            User.findOne(query)
            .then(user => {
                
                if(!user){
                    return done(null,false, { message: "That email is not registered"});
                }
                // if(!user.validPassword(password)){
                //     return done(null,false, { message: "Incorrect password."});
                // }
                
                return done(null,user);
            })
            .catch(err => console.log(err))
        })
    );
    passport.serializeUser( (user, done) => {
        done(null, user);
      });
      
    passport.deserializeUser( (user, done) => {
        
          done(null, user.firstname)
          
    });
}