import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components/';
import { LandingPage, LoginPage, RegisterPage, MyNotes } from './screens/';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/mynotes" component={MyNotes} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
