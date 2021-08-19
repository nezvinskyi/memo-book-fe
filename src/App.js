import { useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components/';
import {
  LandingPage,
  LoginPage,
  RegisterPage,
  MyMemos,
  AddMemoPage,
  UpdateMemoPage,
  ProfilePage,
} from './screens/';

function App() {
  const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Route path="/" exact component={LandingPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/mymemos" component={() => <MyMemos search={search} />} />
        <Route path="/addmemo" component={AddMemoPage} />
        <Route path="/memo/:id" component={UpdateMemoPage} />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
