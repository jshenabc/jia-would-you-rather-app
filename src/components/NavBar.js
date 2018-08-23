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
import { setAuthedUser } from '../actions/authedUser';

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

  handleLogout = function(e) {
    const { userId } = 'null';
    const { dispatch } = this.props;

    dispatch(setAuthedUser(userId));
  }

  //waiting for adding to
  //   <NavItem>
  //   <img
  //      src={users[authedUser].avatarURL}
  //      alt={`Avatar of ${authedUser}`}
  //      className='nav-avatar'
  //   />
  // </NavItem>
  render() {
    const { users, authedUser } = this.props
    //console.log(users[authedUser])
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Would You Rather Game App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link exact to='/'><NavLink>Home</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link exact to='/New'><NavLink>New Question</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link exact to='/LeaderBoard'><NavLink>Leader Board</NavLink></Link>
              </NavItem>
              { authedUser !== 'null' &&
                <NavItem>
                  <NavLink>Hello! {authedUser}</NavLink>
                </NavItem>
              }
              { authedUser !== 'null' &&
                <NavItem>
                  <Link to='/Login' onClick={(e) => this.handleLogout(e)}><NavLink>Logout</NavLink></Link>
                </NavItem>
              }
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
