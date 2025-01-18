import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <SearchBar />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;
