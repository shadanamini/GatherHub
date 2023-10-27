import './App.css';
import CreateConferenceForm from './pages/CreateConference';
import AttendConferenceForm from './pages/AttendConference';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="create" element={<CreateConferenceForm />} />
          <Route path="attend" element={<AttendConferenceForm />} />
          <Route path="home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
