
### `npm start`
 홈페이지 열기
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
### App

  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Main from './components/Main.jsx';
import Detail from './components/Detail.jsx';
import React from 'react';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav></Nav>
      <Routes basename={process.env.PUBLIC_URL}>
        <Route path={`/`} exact={true} element={<Main></Main>}></Route>
        <Route
          path={`/recipe/:id`}
          exact={true}
          element={<Detail></Detail>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

