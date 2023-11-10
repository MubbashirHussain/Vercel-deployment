const mongoose = require('mongoose')

let CourseSchema = mongoose.Schema({    
    'name': String,
    "shortName": String,
    'fee': Number,
})

exports.Courses = mongoose.model('course', CourseSchema)