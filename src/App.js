import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatRoom from './components/ChatRoom';
import AuthProvider from './context/AuthProvider';
import AppProvider from './context/AppProvider';
import AddRoom from './components/AddRoom';
import InviteMember from './components/InviteMember';
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/chatroom" element={<ChatRoom />} />
          </Routes>
          <AddRoom />
          <InviteMember />
        </AppProvider>
      </AuthProvider>
    </Router>
  )
}

export default App;
