import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LandingPage from './components/LandingPage';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth='xs'>
      <Header/>
      <LandingPage/>
    </Container>
  );
}

export default App;
