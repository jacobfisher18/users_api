const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.get("/users", (req, res) => {
    //find({}) gets all records from the db
    User.find({}).then((users) => {
        res.send(users);
    });
});

router.post("/users", (req, res) => {
    //use mongoose to add user to db
    User.create(req.body).then(function(user){
        res.send(user);
    });
});

router.put("/users/:id", (req, res) => {
    //use mongoose to update user in db based on id
    User.findByIdAndUpdate({_id: req.params.id}, req.body).then((user) => {
        User.findOne({_id: req.params.id}).then((user) => {
            res.send(user);
        });
    });
});

router.delete("/users/:id", (req, res) => {
    //use mongoose to remove user from db based on id
    User.findByIdAndRemove({_id: req.params.id}).then( (user) => {
        res.send(user);
    });
});

module.exports = router;