import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
