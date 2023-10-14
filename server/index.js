const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const registrationModel = require('./models/Registration')
const app = express();
const bcrypt = require('bcrypt');
const jsonwt = require("jsonwebtoken");
const router = express.Router();
const key = require("./secret/myurl")
const db = require('./secret/myurl').mongoURL;
//Attempt to connect to database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log(err));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// app.post('/register',(req,res)=>{
//     registrationModel.create(req.body)
//         .then(result=>res.json(result))
//         .catch(err=>console.log(err));
// })

app.post("/register", (req, res) => {
  const {name,email,password} = req.body;
  registrationModel.findOne({ email:email })
    .then(person => {
      if (person) {
        return res
          .json("Email is already registered in our system");
      } else {
        const newPerson = new registrationModel({
          name: name,
          email: email,
          password: password
        });
        //Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then(person => res.json(person))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// app.post('/login',(req,res)=>{
//   const {email,password} = req.body;
//   registrationModel.findOne({email:email})
//   .then(user=>{
//     if(user){
//       if(user.password===password){
//         res.json("Sucessfully login")
//       }
//       else{
//         res.json("Password is incorrect");
//       }
//     }
//     else{
//       res.json("User doesn't exist");
//     }
//   })
//   .catch(err=>console.log(err));
// })
app.post("/login", (req, res) => {
  const {email,password} = req.body;
  registrationModel.findOne({email:email})
    .then(person => {
      if (!person) {
        return res.json("User not found with this email");
      }
      bcrypt
        .compare(password, person.password)
        .then(isCorrect => {
          if (isCorrect) {
            res.json("Sucessfully login");
            //use payload and create token for user
            // const payload = {
            //   id: person.id,
            //   name: person.name,
            //   email: person.email
            // };
            // jsonwt.sign(
            //   payload,
            //   key.secret,
            //   { expiresIn: 3600 },
            //   (err, token) => {
            //     res.json({
            //       success: true,
            //       token: "Bearer " + token
            //     });
            //   }
            // );
          } else {
            res.json("Password is not correct");
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});


app.listen(8000,()=>console.log("Server is running on port 8000"));