import './App.css';
import CreateConferenceForm from './pages/CreateConference';
import AttendConferenceForm from './pages/AttendConference';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NoLoginRoutes from './utils/NoLoginRoutes';
import PrivateRoutes from './utils/ProtectedRoutes';
import Home from './pages/Home';
import { UserProvider } from './utils/Firebase';
import Events from './pages/Events';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<NoLoginRoutes/>}>
            <Route path="/" element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route element={<PrivateRoutes/>}>
            <Route path="create" element={<CreateConferenceForm />} />
            <Route path="attend" element={<AttendConferenceForm />} />
            <Route path="home" element={<Home/>} />
            <Route path="events" element={<Events/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
