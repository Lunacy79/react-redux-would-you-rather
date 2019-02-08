
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";

class Nav extends Component {
    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Logout
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/home' activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        {this.props.authedUser}
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    }
  }

  export default connect(mapStateToProps)(Nav);