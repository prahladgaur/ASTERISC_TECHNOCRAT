import React from 'react'
import Projects from './Projects'



const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>

      <Projects showAlert={showAlert} />
    </div>
  )
}

export default Home
