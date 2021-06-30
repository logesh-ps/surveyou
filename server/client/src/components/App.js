import React, { PureComponent } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
import Header from "./Header";
import Landing from "./Landing";

const Surveys = () => <h1>Dashboard</h1>;
const NewSurvey = () => <h1>NewSurvey Form</h1>;

class App extends PureComponent {
  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Surveys} />
            <Route exact path="/survey/new" component={NewSurvey} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
