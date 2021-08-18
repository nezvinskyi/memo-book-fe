import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components/';
import { LandingPage, LoginPage, RegisterPage, MyMemos, AddMemoPage } from './screens/';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/mymemos" component={MyMemos} />
        <Route path="/addmemo" component={AddMemoPage} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
