import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartedPage from './pages/StartedPage'
import MainPage from './pages/MainPage'
import SelectIdeas from './components/SelectIdeas'
import { SettingsContextProvider } from './context/settingsContext'

function App() {
  return (
    <SettingsContextProvider>
      <BrowserRouter basename='/hot-ideas'>
        <Routes>
          <Route index path="/" element={<StartedPage></StartedPage>} />
            <Route path='main' element={<MainPage></MainPage>}>
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
