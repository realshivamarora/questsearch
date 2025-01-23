import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Welcome from './components/Welcome';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [searchResults, setSearchResults] = useState([]); // Holds search results
  const [isSearch, setIsSearch] = useState(false); // Controls whether to show Welcome or SearchResults

  // Handle the search and pass results to App
  const handleSearch = (results) => {
    setSearchResults(results); // Store the search results
    setIsSearch(true); // Switch to displaying the search results
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <SearchBar onSearch={handleSearch} /> {/* Pass handleSearch function as prop */}
      {isSearch ? (
        <SearchResults results={searchResults} /> // Show SearchResults when isSearch is true
      ) : (
        <Welcome /> // Show Welcome when not searching
      )}
      <Footer />
    </div>
  );
}

export default App;
