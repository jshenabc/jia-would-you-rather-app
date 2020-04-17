import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem, } from 'reactstrap';
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
    const { authedUser } = this.props
    //console.log(users[authedUser])
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Would You Rather Game App</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/'> Home  </Link>
              </NavItem>
              <NavItem>
                <Link to='/add'> New Question  </Link>
              </NavItem>
              <NavItem>
                <Link to='/leaderboard'> Leader Board  </Link>
              </NavItem>
              { authedUser !== 'null' &&
                <NavItem>
                   Hello! {authedUser}
                </NavItem>
              }
              { authedUser !== 'null' &&
                <NavItem>
                  <Link to='/Login' onClick={(e) => this.handleLogout(e)}> Logout  </Link>
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
