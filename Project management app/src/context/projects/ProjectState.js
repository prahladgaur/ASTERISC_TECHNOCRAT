
import { useState } from 'react';
import ProjectContext from './projectContext';

const ProjectState = (props) => {
  const host = "http://localhost:5000"
  const projectsinitial = []
  const [projects, setProjects] = useState(projectsinitial)

  //Get all project
  const getProjects = async () => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/projects/fetchprojects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setProjects(json)

  }

  //Add a project
  const AddProject = async (title, description, task) => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/projects/addproject`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Auth-Token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, task })
    });
    const project = await response.json();
    setProjects(projects.concat(project))

  }


  //Delete a project
  const deleteProject = async (id) => {
    //TODO: API CALL
    const response = await fetch(`${host}/api/projects/deleteproject/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "Auth-Token": localStorage.getItem('token')
      },
    });
    const json = await response.json();

    console.log(json)
    const newProjects = projects.filter((project) => { return project._id !== id })
    setProjects(newProjects)
  }

  //Edit a project
  const editProject = async (id, title, description, task) => {
    //API CALL
    const response = await fetch(`${host}/api/projects/updateproject/${id}`, {
      method: "PUT",

      headers: {
        'Content-Type': 'application/json',
        "Auth-Token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, task })
    });
    const json = await response.json();
    console.log(json)

    let newProjects = JSON.parse(JSON.stringify(projects))
    //logic to edit in client
    for (let index = 0; index < newProjects.length; index++) {
      const element = newProjects[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.task = task;
        break;
      }

    }
    setProjects(newProjects);
  }
  return (
    <ProjectContext.Provider value={{ projects, AddProject, deleteProject, editProject, getProjects }}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export default ProjectState;