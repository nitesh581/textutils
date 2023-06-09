import React, { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar'
import TextForm from './components/TextForm'
import PropTypes from 'prop-types'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";


function App() {

  const [mode, setMode] = useState('light')
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }

  const removeBodyClasses = () => {
    document.body.classList.remove('bg-primary')
    document.body.classList.remove('bg-danger')
    document.body.classList.remove('bg-warning')
    document.body.classList.remove('bg-success')
    document.body.classList.remove('bg-light')
    document.body.classList.remove('bg-dark')
  }

  const toggleMode = (cls) => {
    removeBodyClasses()
    document.body.classList.add('bg-'+cls)
    if (mode === 'light') {
        setMode('dark')
        document.body.style.backgroundColor = '#042743'
        showAlert('Dark mode is active', 'success')
    } else {
        setMode('light')
        document.body.style.backgroundColor = 'white'
        showAlert('Light mode is active', 'success')
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route exact path="/" element={<Navbar title="TextUtils" alert={alert} mode={mode} toggleMode={toggleMode} />}>
        <Route exact path='/' element={<TextForm showAlert={showAlert} heading="TextUtils - Word Counter, Character Counter, Remove Extra Spaces" mode={mode} />} />
        <Route exact path='/about' element={<About mode={mode} />} />
      </Route>
    )
  );

  return (
    <>      
      <RouterProvider router={router} />
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string
}

Navbar.defaultProps = {
  title: 'Set Title',
  aboutText: 'About'
}

export default App;
