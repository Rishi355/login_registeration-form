import { useState } from 'react'
import Signup from './Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
