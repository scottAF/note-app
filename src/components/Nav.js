import React from 'react';

class Nav extends React.Component{
  render() {
    const { toggleNote } = this.props; // object destructuring
    return (
      <div className="nav-container">
        <div className="nav-logo">Note</div>
        <div className="nav-button">
          + Note
        </div>
      </div>      
    );
  }
}

export default Nav;