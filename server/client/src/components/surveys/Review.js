import React, { useCallback } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../../actions";
import FIELDS from "./formFields";

function Review({ onCancel, formValues, createSurvey, history }) {
  const renderReviewContent = useCallback(() => {
    return FIELDS.map(({ label, name }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));
  }, [formValues]);

  return (
    <div>
      <h5>Please Verify your entries</h5>
      {renderReviewContent()}
      <button
        style={{ marginTop: "10px" }}
        onClick={onCancel}
        className="grey darken-5 btn-flat left white-text"
      >
        Back
      </button>
      <button
        style={{ marginTop: "10px" }}
        onClick={() => createSurvey(formValues, history)}
        className="green btn-flat right white-text"
      >
        Create Survey
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  formValues: state.form.surveyForm.values,
});

export default connect(mapStateToProps, actions)(withRouter(Review));
