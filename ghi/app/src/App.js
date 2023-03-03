import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoeList from './ShoeList';
import ShoeForm from './CreateShoeForm';

import HatForm from './HatForm';
import HatsList from "./HatsList"


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="shoes">
            <Route path="new" element={<ShoeForm />} />
          </Route>
          <Route path="shoes">
            <Route path="" element={<ShoeList shoes={props.shoes}/>} />
          </Route>
          <Route path="hats">
            <Route path="new"  element={<HatForm />} />
          </Route>
          <Route path="hats">
            <Route path="" element={<HatsList hats={props.hats} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
