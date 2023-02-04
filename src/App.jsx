import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Started from './pages/Started'
import Main from './pages/Main'
import Summary from './components/Summary'
import SelectIdeas from './components/SelectIdeas'

function App() {
  return (
    <BrowserRouter basename='/hot-ideas'>
      <Routes>
        <Route index path="/" element={<Started></Started>} />
        <Route path='main' element={<Main></Main>}>
          <Route index element={<SelectIdeas></SelectIdeas>} />
          <Route path='summary' element={<Summary></Summary>} />
        </Route>
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
