"user strict";

var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /users
router.get(
    '/',
    /**
     * @api {get} /users List Of All Users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} id Id of the User.
     * @apiSuccess {String} created_at User creation datetime.
     * @apiSuccess {String} updated_at User update datetime.
     * @apiSuccess {String} username User name.
     * @apiSuccess {String} password User password.
     * @apiSuccess {String} email User email.
     * @apiSuccess {Integer} __v Mongo version.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     *
     *     [
     *          {
     *              _id: "571f2bb37cff2103008ded7c",
     *              created_at: "2016-04-26T08:49:55.990Z",
     *              updated_at: "2016-04-26T08:49:55.990Z",
     *              username: "pavel",
     *              password: "MEDAB0$$",
     *              email: "shout@pavelshahriar.com",
     *              __v: 0
     *          }
     *     ]
     **/
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
    /**
     * @api {get} /users/:username Get info of a specific User
     * @apiName GetUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} id Id of the User.
     * @apiSuccess {String} created_at User creation datetime.
     * @apiSuccess {String} updated_at User update datetime.
     * @apiSuccess {String} username User name.
     * @apiSuccess {String} password User password.
     * @apiSuccess {String} email User email.
     * @apiSuccess {Integer} __v Mongo version.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     *     {
     *          _id: "571f2bb37cff2103008ded7c",
     *          created_at: "2016-04-26T08:49:55.990Z",
     *          updated_at: "2016-04-26T08:49:55.990Z",
     *          username: "pavel",
     *          password: "MEDAB0$$",
     *          email: "shout@pavelshahriar.com",
     *          __v: 0
     *     }
     **/
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
    /**
     * @api {post} /users Create a new User
     * @apiName PostUsers
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} username New username.
     * @apiSuccess {String} password New user password.
     * @apiSuccess {String} email New user email.
     *
     * @apiSuccess {String} id Id of the new user.
     * @apiSuccess {String} created_at New User creation datetime.
     * @apiSuccess {String} updated_at New User update datetime.
     * @apiSuccess {String} username New User name.
     * @apiSuccess {String} password New User password.
     * @apiSuccess {String} email New User email.
     * @apiSuccess {Integer} __v Mongo version.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     *     {
     *          _id: "571f2bb37cff2103008ded7c",
     *          created_at: "2016-04-26T08:49:55.990Z",
     *          updated_at: "2016-04-26T08:49:55.990Z",
     *          username: "pavel",
     *          password: "MEDAB0$$",
     *          email: "shout@pavelshahriar.com",
     *          __v: 0
     *     }
     **/
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
    /**
     * @api {put} /users Edit an existing User
     * @apiName PutUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} username Editing username.
     * @apiSuccess {String} password Editing password.
     * @apiSuccess {String} email Editing email.
     *
     * @apiSuccess {String} id Id of the user.
     * @apiSuccess {String} created_at User creation datetime.
     * @apiSuccess {String} updated_at New User update datetime.
     * @apiSuccess {String} username Edited User name.
     * @apiSuccess {String} password Edited User password.
     * @apiSuccess {String} email Edited User email.
     * @apiSuccess {Integer} __v Mongo version.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     *     {
     *          _id: "571f2bb37cff2103008ded7c",
     *          created_at: "2016-04-26T08:49:55.990Z",
     *          updated_at: "2016-04-26T08:49:55.990Z",
     *          username: "pavel",
     *          password: "MEDAB0$$",
     *          email: "shout@pavelshahriar.com",
     *          __v: 0
     *     }
     **/
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
    /**
     * @api {delete} /users/:username Delete an existing user
     * @apiName DeleteUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     ***/
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