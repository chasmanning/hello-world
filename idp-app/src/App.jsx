import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmployeeWizard from './pages/EmployeeWizard'
import ManagerReview from './pages/ManagerReview'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employee" element={<EmployeeWizard />} />
      <Route path="/employee/:planId" element={<EmployeeWizard />} />
      <Route path="/manager" element={<ManagerReview />} />
      <Route path="/manager/:planId" element={<ManagerReview />} />
    </Routes>
  )
}

export default App
