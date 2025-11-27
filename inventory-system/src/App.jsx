import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Admin from './components/Admin';
import Staff from './components/Staff';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    
  )
}

export default App;
