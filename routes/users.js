"user strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /users
router.get(
    '/',
    function(req, res){
        User.find(
            {},
            function(err, users) {
                if(err){
                    res.send(err);
                } else {
                    res.send(users);
                }
            }
        );
    }
);

// GET /users/{username}
router.get(
    '/:username',
    function(req, res){
        User.find(
            {username : req.params.username},
            function(err, user){
                if(err){
                    res.send(err);
                } else {
                    res.send(user);
                }
            }

        );
    }
);

// POST /users
router.post(
    '/',
    function(req, res) {
        var user = new User(req.body);
        user.save(
            function(err)
            {
                if (err){
                    res.send(err);
                } else{
                    res.send(user);
                }
            }
        );
    }
);

// PUT /users/{username}
router.put(
    '/:username',
    function(req, res){
        User.findOneAndUpdate(
            {username : req.params.username},
            {password : req.body.password},
            function(err, user)
            {
                if (err){
                    res.send(err);
                } else{
                    res.send(user);
                }
            }
        );
    }
);

// DELETE /users/{username}
router.delete(
    '/:username',
    function(req, res){
        User.findOneAndRemove(
            {username : req.params.username},
            function(err)
            {
                if(err){
                    res.send(err);
                } else {
                    res.send({});
                }
            }
        );
    }
);

module.exports = router;