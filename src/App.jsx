import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StartedPage from './pages/StartedPage'
import MainPage from './pages/MainPage'
import SelectIdeas from './components/SelectIdeas'
import { SettingsContextProvider } from './context/settingsContext'
import ShowIdea from './components/ShowIdea'

function App() {
  return (
    <SettingsContextProvider>
      <BrowserRouter basename='/generate-ideas-from-ai'>
        <Routes>
          <Route index path="/" element={<StartedPage></StartedPage>} />
            <Route path='main' element={<MainPage></MainPage>}>
              <Route index element={<SelectIdeas></SelectIdeas>}/>
              <Route path='idea/:id' element={<ShowIdea></ShowIdea>} />
            </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </BrowserRouter>
    </SettingsContextProvider>
  )
}

export default App
