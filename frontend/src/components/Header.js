import React from 'react';

function Header() {
  return (
    <header style={headerStyle} className="py-3">
      <div className="container">
        <h1 className="text-white fw-bold m-0">QuestSearch</h1>
      </div>
    </header>
  );
}

const headerStyle = {
  backgroundColor: '#ff4b1f',
};

export default Header;
