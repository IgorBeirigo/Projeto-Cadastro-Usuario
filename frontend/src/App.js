import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import Sidebar from './components/template/Sidebar'
import TopHeader from './components/template/TopHeader'
import Routes from './Routes'
import Footer from './components/template/Footer'

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleSidebarToggle = (isOpen) => {
    setSidebarOpen(isOpen)
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} />
        <div className="app-main">
          <TopHeader 
            userName="João Silva" 
            onLogout={() => console.log('Logout')}
          />
          <main className="app-content">
            <Routes />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
