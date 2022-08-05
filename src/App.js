import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Main from './components/Main.jsx';
import Main_before from './components/Main_before.jsx';
import Detail from './components/Detail.jsx';
import React from 'react';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path={`/`} exact={true} element={<Main />}></Route>
        <Route path={`/be`} exact={true} element={<Main />}></Route>
        <Route path={`/recipe/:id`} exact={true} element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
