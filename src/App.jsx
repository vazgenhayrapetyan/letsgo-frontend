import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TicketsPage from './pages/TicketsPage'
import TopicsPage from './pages/TopicsPage'
import PsychologicalPage from './pages/PsychologicalPage'
import TakeTicket from './pages/TakeTicket';
import ExamSimulation from './pages/ExamSimulation';
import Navbar from './components/Navbar';
import TrafficRules from './pages/TrafficRules';
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/psychological" element={<PsychologicalPage />} />
          <Route path="/tickets/:ticketId" element={<TakeTicket />} />
          <Route path="/exam-simulation" element={<ExamSimulation />} />
          <Route path="/rules" element={<TrafficRules />} />
        </Routes>
      </div>
      
    </Router>
  )
}

export default App
