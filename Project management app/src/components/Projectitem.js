import React, { useContext } from 'react'
import projectContext from "../context/projects/projectContext"

const Projectitem = (props) => {
    const context = useContext(projectContext);
    const { deleteProject } = context;
    const { project, updateProject } = props;
    return (


        <div className='col-md-3'>
            <div className="card my-3 " >
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{project.title}</h5>
                        <i className="fa-sharp fa-solid fa-trash mx-2" onClick={() => {
                            deleteProject(project._id);
                            props.showAlert("Deleted Successfully", "success")
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateProject(project) }}></i>
                    </div>
                    <p className="card-text">{project.description} .</p>
                    <p className="card-text">{project.task} .</p>

                </div>
            </div>
        </div>


    )
}

export default Projectitem
