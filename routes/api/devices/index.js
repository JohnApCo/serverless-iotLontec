const AWS = require('aws-sdk');

const { validationResult } = require('express-validator');
const { newCounterValidation } = require('./validator.js')


const { v4 } = require("uuid");
AWS.config.update({region: "us-east-2"})
const userRouter = require("express").Router();
const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

userRouter.route("/counters")
    .get(index)  // Get All Books
    .post(newCounterValidation, store); // Greate a New Book

userRouter.route("/counters/:uid")
    .get(show)  // Get One Book by IDs
    .put(newCounterValidation,update) // Update a Book by Id
    .delete(remove);  // Delete a Book by id

    
function index(req,res){
    
    const params = {
        TableName: "DevicesTable"
    }
    try{
        documentClient.scan(params, function (err,data){
            if (err){
                res.json(err);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        res.json(err);
    }
}

function store(req,res){
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors){
        res.json(result);
    }else{
        const { name, codTarjeta, nSensor } = req.body;
        const id = v4();
        const newCounter = {
        id,
        name,
        codTarjeta,
        nSensor
        };
        const params = {
            TableName: "DevicesTable",
            Item: newCounter
        }
        try{
            documentClient.put(params, function (err){
                if (err){
                    res.json(err);
                }else{
                    res.json(newCounter)
                }
            });
        } catch (err){
            res.json(err);
        }
    }
}

function show(req,res){
    const id = req.params.uid;
    const params = {
        TableName: "DevicesTable",
        Key: { id }
    }
    try{
        documentClient.get(params, function (err,data){
            if (err){
                res.json(err);
            }else{
                res.json(data)
            }
        });
    } catch (err){
        res.json(err);
    }
}

function update(req,res){
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();
    if (hasErrors){
        res.json(result);
    }else{
        const id = req.params.uid;
        const { name, codTarjeta, nSensor } = req.body;
        const params = {
        TableName: "DevicesTable",
        Key: { id },
        UpdateExpression: "set name = :name, codTarjeta = :codTarjeta, nSensor = :nSensor ",
        ConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":name": name,
            ":codTarjeta": codTarjeta,
            ":nSensor": nSensor,
            ":id": id
        },
        ReturnValues: "ALL_NEW",
        }
        try{
            documentClient.update(params, function (err, data){
                if (err){
                    res.json(err);
                }else{
                    res.json(data)
                }
            });
        } catch (err){
            res.json(err);
        }
    }
}

function remove(req,res){
    const id = req.params.uid;
    const params = {
        TableName: "DevicesTable",
        Key: { id }
    }
    try{
        documentClient.delete(params, function (err){
            if (err){
                console.log(err, err.stack);
            }else{
                res.json({id,removed:"OK"})
            }
        });
    } catch (err){
        console.log(err);
    }
}


module.exports = userRouter;