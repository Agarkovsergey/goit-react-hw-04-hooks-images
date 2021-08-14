import React, { useState } from 'react';

const Header = ({ search }) => {
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()   
    
    search(query);
  }

  const onInputChange = ({ target }) => {
    setQuery(target.value)
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm"  onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          onChange={onInputChange}
          value={query}
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

export default Header;
