import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ loggedIn }) => (
  <nav>
    <Link to="/">TopAnime</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    { loggedIn && <Link to="/secret">Secret</Link> }
  </nav>
);

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
});

export default connect(mapStateToProps)(Header);
