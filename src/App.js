import { Routes, Route } from 'react-router-dom';
import NavigationBar from './routes/navigation-bar/navigation-bar';
import Home from './routes/home/home';

const Shop = () => {
  return (
    <div>
      <div>This is the Shop</div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NavigationBar />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
