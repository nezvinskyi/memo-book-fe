import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components/';
import { LandingPage, MyNotes } from './screens/';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" exact component={LandingPage} />
        <Route path="/mynotes" component={MyNotes} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
