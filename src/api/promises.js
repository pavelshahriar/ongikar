"use strict";

const express = require('express');
const router = express.Router();
const Promise = require('../models/promise');

// GET /promises
router.get(
    '/',
    /**
     * @api {get} /promises GET /promises
     * @apiName GetPromises
     * @apiGroup Promises
     * @apiVersion 0.1.0
     *
     * @apiSuccess {String} _id Id of the User.
     * @apiSuccess {String} created User creation datetime.
     * @apiSuccess {String} updated User update datetime.
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
     *                      created: "2016-04-26T08:49:55.990Z",
     *                      updated: "2016-04-26T08:49:55.990Z",
     *                      username: "xxx",
     *                      email: "yyy@zzz.com"
     *                  }
     *             ]
     *      }
     *
     **/
    (req, res) => {

        let filters = {status: {'$ne':0 }};

        if(req.query.promisor){
            filters.promisor = req.query.promisor;
        }
        
        if(req.query.promisee){
            filters.promisee = req.query.promisee;     
        }
        
        if(req.query.witnesses){
            filters.witnesses = req.query.witnesses;    
        }
        
        if(req.query.beneficiaries){
            filters.beneficiaries = req.query.beneficiaries;
        }
        
        if(req.query.status){
            filters.status = req.query.status;    
        }
        
        if(req.query.creator){
            filters.creator = req.query.creator;
        }
        
        Promise.find(
            filters,
            {title: 1, promisor: 1, promisee: 1, witnesses: 1, beneficiaries: 1, status: 1, creator: 1, created: 1, updated: 1},
            (err, promise) => {
                if(err){
                    if(err.name == "CastError"){
                        let out = {
                            success: false,
                            msg: "Invalid "+ err.path + " value passed"
                        };
                        res.status(404).send(out);
                    }else {
                        res.send(err);
                    }
                }
                else {
                    let out = {
                        success: true,
                        data: promise
                    };
                    res.send(out);
                }
            }
        );
    }
);

// GET /promises/{promiseId}
router.get(
    '/:promiseId',
    (req, res) => {

        Promise.find(
            {_id: req.params.promiseId, status: {'$ne':0 }},
            {title: 1, promisor: 1, promisee: 1, witnesses: 1, beneficiaries: 1, status: 1, creator: 1, created: 1, updated: 1},
            (err, promise) => {
                if(err){
                    res.send(err);
                }
                else if(promise.length == 0){
                    let out = {
                        success: false,
                        msg: "Resource Unavailable"
                    };
                    res.status(404).send(out);
                }
                else {
                    let out = {
                        success: true,
                        data: promise
                    };
                    res.send(out);
                }
            }
        );
    }
);

// POST /promises
router.post(
    '/',
    (req, res) => {
        let data = req.body;
        console.log(data);
        let promise = new Promise(req.body);
        promise.save(
            (err) => {
                if(err){
                    res.send(err);
                }
                else{
                    let out = {
                        success: true,
                        data: {
                            _id: promise._id,
                            title: promise.title,
                            promisor: promise.promisor,
                            promisee: promise.promisee,
                            witnesses: promise.witnesses,
                            beneficiaries: promise.beneficiaries,
                            status: promise.status,
                            creator: promise.creator
                        }
                    };
                    console.log(req.route.path);
                    res.location(req.baseUrl + '/' +promise._id);
                    res.status(201).send(out);
                }
            }
        );
    }
);

// PUT /promises/{promiseId}
router.put(
    '/:promiseId',
    (req, res) => {
        Promise.findOneAndUpdate(
            {_id : req.params.promiseId, status: {'$ne':0 }},
            {title: req.body.title, promisor : req.body.promisor, promisee : req.body.promisee, witnesses : req.body.witnesses, beneficiaries: req.body.beneficiaries, status : req.body.status },
            (err, promise) => {
                if(err){
                    res.send(err);
                }
                else if(promise == null){
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

// DELETE /promises/{promiseId}
router.delete(
    '/:promiseId',
    (req, res) => {
        Promise.findOneAndUpdate(
            {_id : req.params.promiseId, status: {'$ne':0 }},
            {status: 0},
            (err, promise) => {
                if(err){
                    res.send(err);
                }else if(promise == null){
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