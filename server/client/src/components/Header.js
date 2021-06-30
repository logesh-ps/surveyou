import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Payments from "./Payments";

export class Header extends PureComponent {
  renderRightContent = () => {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return null;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="add-credit">
            <Payments />
          </li>,
          <li key="credits" style={{ margin: '0 10px'}}>Credits : {auth.credits}</li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  };
  render() {
    const { auth } = this.props;
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to={auth ? "/surveys" : "/"} className="left brand-logo">
              Surveyou
            </Link>
            <ul className="right">{this.renderRightContent()}</ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
