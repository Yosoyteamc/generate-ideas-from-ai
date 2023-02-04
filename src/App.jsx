import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Started from './pages/Started'
import Main from './pages/Main'
import SelectIdeas from './components/SelectIdeas'
import { SettingsContextProvider } from './context/settingsContext'

function App() {
  return (
    <SettingsContextProvider>
      <BrowserRouter basename='/hot-ideas'>
        <Routes>
          <Route index path="/" element={<Started></Started>} />
            <Route path='main' element={<Main></Main>}>
              <Route index element={<SelectIdeas></SelectIdeas>}/>
              <Route path='idea/:id' element={<h1>idea</h1>} />
            </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>
  )
}

export default App
