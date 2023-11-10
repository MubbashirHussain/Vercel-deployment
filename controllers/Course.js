const express = require('express')
const mongoose = require('mongoose')
const { SendResponse } = require('../Helpers/Helper')
const { Courses } = require('../model/Course')


const CourseControllers = {
    PostFx: async (req, res) => {
        let { name, shortName, fee } = req.body;
        let obj = { name, shortName, fee };

        let errArr = [];
        if (!obj.name) {
            errArr.push("Required Name");
        }
        if (!obj.shortName) {
            errArr.push("Required Short Name");
        }
        if (errArr.length > 0) {
            res.status(400).send(SendResponse(false, "Validation Error !", errArr));
        } else {
            console.log('Courses')
            const Course = new Courses({ ...obj });
            await Course.save()
            res.status(201).send(SendResponse(true, "Data Added Successfully", obj));

        }

    },
    GetAll: async (req, res) => {
        try {

            let { pageNo, pageSize } = req.query
            let skipVal = parseInt((pageNo - 1) * pageSize);

            if(req.query && pageNo && pageSize){
                let Data = await Courses.find().skip(skipVal).limit(pageSize)
                res.send(Data)
            }else{
                let Data = await Courses.find()
                res.send(Data)
            }
            // let Data = await Courses.find()
            // res.status(200).send(Data)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    GetbyId: async (req, res) => {
        try {
            let Data = await Courses.findById(req.params.id).exec()
            res.send(Data)
        } catch (err) {
            console.log(err)
            res.status(404).send(err)
        }
    },
    Replace: async (req, res) => {
        try {
            let doc = await Courses.findOneAndReplace({ _id: req.params.id }, { ...req.body }, { returnDocument: 'after' })
            res.send(doc)
        } catch (err) {
            res.status(400).send(err)
        }
    },
    Update: async (req, res) => {
        try {
            let Products = await Courses.findByIdAndUpdate(req.params.id, { ...req.body }, { returnDocument: 'after' })
            res.send(Products)
        } catch (err) {
            res.send(err)
        }
    },
    Delete: async (req, res) => {
        try {
            let Products = await Courses.findByIdAndDelete(req.params.id)
            res.send(Products)
        } catch (err) {
            res.send(err)
        }
    },

}

module.exports = CourseControllers

