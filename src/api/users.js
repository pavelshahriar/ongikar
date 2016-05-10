"use strict";

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users
router.get(
    '/',
    /**
     * @api {get} /users GET /users
     * @apiName GetUsers
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} _id Id of the User.
     * @apiSuccess {String} created_at User creation datetime.
     * @apiSuccess {String} updated_at User update datetime.
     * @apiSuccess {String} username User name.
     * @apiSuccess {String} email User email.
     *
     * @apiSuccessExample Success-Response:
     *      HTTP/1.1 200 OK
     *
     *      {
     *          success: true,
     *          data :
     *              [
     *                  {
     *                      _id : "571f2bb37cff2103008ded7c",
     *                      created_at: "2016-04-26T08:49:55.990Z",
     *                      updated_at: "2016-04-26T08:49:55.990Z",
     *                      username: "xxx",
     *                      email: "yyy@zzz.com"
     *                  }
     *             ]
     *      }
     *
     **/
    (req, res) => {
        User.find(
            {},
            {username: 1, email: 1, created_at: 1, updated_at: 1},
            (err, users) => {
                if(err){
                    res.send(err);
                }
                else {
                    let out = {
                        success: true,
                        data: users
                    };
                    res.send(out);
                }
            }
        );
    }
);

// GET /users/{username}
router.get(
    '/:username',
    /**
     * @api {get} /users/:username GET /users/username
     * @apiName GetUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiParam {String} username Users unique username.
     *
     * @apiSuccess {String} _id Id of the User.
     * @apiSuccess {String} created_at User creation datetime.
     * @apiSuccess {String} updated_at User update datetime.
     * @apiSuccess {String} username User name.
     * @apiSuccess {String} email User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
     *      {
     *          success: true,
     *          data :
     *              [
     *                  {
     *                      _id : "571f2bb37cff2103008ded7c",
     *                      created_at: "2016-04-26T08:49:55.990Z",
     *                      updated_at: "2016-04-26T08:49:55.990Z",
     *                      username: "xxx",
     *                      email: "yyy@zzz.com"
     *                  }
     *             ]
     *      }
     **/
    (req, res) => {
        User.find(
            {username : req.params.username},
            {username: 1, email: 1, created_at: 1, updated_at: 1},
            (err, user) => {
                if(err){
                    res.send(err);
                }
                else if(user.length == 0){
                    let out = {
                        success: false,
                        msg: "Resource Unavailable"
                    };
                    res.status(404).send(out);
                }
                else{
                    let out = {
                        success: true,
                        data: user
                    };
                    res.send(out);
                }
            }

        );
    }
);

// POST /users
router.post(
    '/',
    /**
     * @api {post} /users POST /users
     * @apiName PostUsers
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiParam {String} username  Mandatory username of the new user.
     * @apiParam {String} password  Mandatory password of the new user.
     * @apiParam {String} email Mandatory email of the new user.
     *
     * @apiSuccess {String} _id Id of the new user.
     * @apiSuccess {String} created_at New User creation datetime.
     * @apiSuccess {String} updated_at New User update datetime.
     * @apiSuccess {String} username New User name.
     * @apiSuccess {String} email New User email.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 CREATED
     *     {
     *          success: true,
     *          data :
     *              {
     *                  _id: "571f2bb37cff2103008ded7c",
     *                  created_at: "2016-04-26T08:49:55.990Z",
     *                  updated_at: "2016-04-26T08:49:55.990Z",
     *                  username: "xxx",
     *                  email: "yyy@zzz.com",
     *              }
     *     }
     **/
    (req, res) => {
        let user = new User(req.body);
        user.save(
            (err) => {
                if(err){
                    res.send(err);    
                }
                else{
                    let out = {
                        success: true,
                        data: {
                            _id: user._id,
                            created_at: user.created_at,
                            updated_at: user.updated_at,
                            username: user.username,
                            email: user.email
                        }
                    };
                    console.log(req.route.path);
                    res.location(req.baseUrl + '/' +user.username);
                    res.status(201).send(out);
                }
            }
        );
    }
);

// PUT /users/{username}
router.put(
    '/:username',
    /**
     * @api {put} /users/:username PUT /users/username
     * @apiName PutUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiParam {String} username Users unique username.
     *
     * @apiParam {String} username  New username of the user.
     * @apiParam {String} password  New password of the user.
     * @apiParam {String} email New email of the user.
     *
     * @apiError ResourceUnavailable Resource Unavailable.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *          success: false,
     *          msg: "ResourceUnavailable"
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *          success: true
     *     }
     **/
    (req, res) => {
        User.findOneAndUpdate(
            {username : req.params.username},
            {username : req.body.username, password: req.body.password, email: req.body.email},
            (err, user) => {
                if(err){
                    res.send(err);
                }
                else if(user == null){
                    let out = {
                        success: false,
                        msg: "Resource Unavailable"
                    };
                    res.status(404).send(out);
                }
                else{
                    let out = {
                        success: true
                    };
                    res.status(200).send(out);
                }
            }
        );
    }
);

// DELETE /users/{username}
router.delete(
    '/:username',
    /**
     * @api {delete} /users/:username DELETE /users/username
     * @apiName DeleteUser
     * @apiGroup Users
     * @apiVersion 0.1.0
     *
     * @apiParam {String} username Users unique username.
     *
     * @apiError ResourceUnavailable Resource Unavailable.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *          success: false,
     *          msg: "ResourceUnavailable"
     *     }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 NO CONTENT
     ***/
    (req, res) => {
        User.findOneAndRemove(
            {username : req.params.username},
            (err, user) => {
                if(err){
                    res.send(err);
                }else if(user == null){
                    let out = {
                        success: false,
                        msg: "Resource Unavailable"
                    };
                    res.status(404).send(out);
                }
                else{
                    let out = {
                        success: true
                    };
                    res.status(204).send(out);
                }
            }
        );
    }
);

module.exports = router;