import './App.css';
import Header from './Header';
import About from './About';
import Home from './Home';
import Nav from './Nav';
import Newpost from './Newpost';
import Missing from './Missing';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Postpage from './Postpage';
import Editpost from './Editpost';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header title="Kishore kannan App" />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post'>
            <Route index element={<Newpost />} />
            <Route path=':id' element={<Postpage />} />
          </Route>
          <Route path='/edit/:id' element={<Editpost />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
