const express = require('express');
const router = express.Router();
const Project = require('../Models/Projectt');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using GET "/api/auth/getuser", Login required

router.get('/fetchprojects', fetchuser, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id });
        res.json(projects)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }

})

//Route 2:Add a new Note using POST "/api/auth/addproject", Login required
router.post('/addproject', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, task } = req.body;
        //If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const project = new Project({
            title, description, task, user: req.user.id
        })
        const savedproject = await project.save()
        res.json(savedproject)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
})

//Route 3:Update the existed Project using PUT "/api/project/updateproject", Login required
router.put('/updateproject/:id', fetchuser, async (req, res) => {
    const { title, description, task } = req.body;
    try {
        //NewProject object creation
        const newProject = {};
        if (title) { newProject.title = title };
        if (description) { newProject.description = description };
        if (task) { newProject.task = task };

        //find the project be updated and update it
        let project = await Project.findById(req.params.id);
        if (!project) { return res.status(404).send("Not Found") }

        if (project.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        project = await Project.findByIdAndUpdate(req.params.id, { $set: newProject }, { new: true });
        res.send({ project });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }


})

//Route 4:Delete the existed Project using DELETE "/api/project/deleteproject", Login required
router.delete('/deleteproject/:id', fetchuser, async (req, res) => {

    try {
        //find the project be deleted and delete it
        let project = await Project.findById(req.params.id);
        if (!project) { return res.status(404).send("Not Found") }
        //allowed only if user really owns that project
        if (project.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        project = await Project.findByIdAndDelete(req.params.id);
        res.send({ "Success": "This project has been deleted", project: project });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }


})


module.exports = router