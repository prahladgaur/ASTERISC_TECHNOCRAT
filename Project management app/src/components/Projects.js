import React, { useContext, useEffect, useRef, useState } from 'react'
import projectContext from "../context/projects/projectContext"
import { useNavigate } from 'react-router-dom';
import AddProject from './AddProject';


const Projects = (props) => {
    const context = useContext(projectContext);
    let navigate = useNavigate();
    const { getProjects, editProject } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) { getProjects() }
        else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [project, setProject] = useState({ id: "", etitle: "", edescription: "", etask: "" })



    const handleClick = (e) => {
        // console.log("updating the note..."+ note)
        editProject(project.id, project.etitle, project.edescription, project.etask)
        refClose.current.click();
        props.showAlert("Updated successfully", "success");

    }

    const onChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddProject showAlert={props.showAlert} />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Project</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={project.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={project.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="task" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etask" name="etask" value={project.etask} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={project.etitle.length < 5 || project.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Projects
