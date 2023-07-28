import React, { useContext, useState } from 'react'
import projectContext from "../context/projects/projectContext"

const AddProject = (props) => {
    const context = useContext(projectContext);
    const { AddProject } = context;

    const [project, setProject] = useState({ title: "", description: "", task: "" })

    const handleClick = (e) => {
        e.preventDefault();
        AddProject(project.title, project.description, project.task);
        setProject({ title: "", description: "", task: "" })
        props.showAlert("Added successfully", "success");
    }

    const onChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container'>
                <h1>Add a Project</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Project Title</label>
                        <input type="text" className="form-control" value={project.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea type="text" className="form-control" value={project.description} id="description" name="description" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="task" className="form-label">Add tasks</label>
                        <textarea type="text" className="form-control" value={project.task} id="task" name="task" onChange={onChange} minLength={5} required />
                    </div>
                    <button disabled={project.title.length < 5 || project.description.length < 5} type="submit" className="btn btn-outline-success" onClick={handleClick}>Add project</button>
                </form>
            </div>

        </>
    )
}


export default AddProject
