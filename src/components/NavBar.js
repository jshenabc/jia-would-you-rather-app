import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink, } from 'reactstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { users, authedUser } = this.props

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Would You Rather Game App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/Dashboard'><NavLink>Home</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to='/New'><NavLink>New Question</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to='/LeaderBoard'><NavLink>Leader Board</NavLink></Link>
              </NavItem>
              <NavItem>
                <NavLink>Hello! {authedUser}</NavLink>
              </NavItem>
              <NavItem>
                <Link to='/Login'><NavLink>Logout</NavLink></Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps ({authedUser, users, questions}) {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(NavBar)
