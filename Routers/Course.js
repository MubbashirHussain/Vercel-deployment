const express = require('express')
const route = express.Router()
const CourseControllers = require('../controllers/Course')

route.post('/', CourseControllers.PostFx)
    .get('/', CourseControllers.GetAll)
    .get('/:id', CourseControllers.GetbyId)
    .put('/:id', CourseControllers.Replace)
    .patch('/:id', CourseControllers.Update)
    .delete("/:id", CourseControllers.Delete)

module.exports = route;