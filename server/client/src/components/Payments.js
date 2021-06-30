import React, { PureComponent } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

export class Payments extends PureComponent {
  render() {
    const { handleStripeToken } = this.props;
    return (
      <StripeCheckout
        amount={100}
        name="Surveyou"
        description="1 Credit for 1$"
        token={(token) => handleStripeToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
