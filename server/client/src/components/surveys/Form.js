import React, { PureComponent } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";

import validateEmails from "../../utils/validateEmails";
import SurveyField from "./Field";
import FIELDS from "./formFields";

export class Form extends PureComponent {
  renderFields() {
    return (
      <div>
        {FIELDS.map(({ label, name }) => (
          <Field
            key={name}
            label={label}
            type="text"
            name={name}
            component={SurveyField}
          />
        ))}
      </div>
    );
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
            <i className="material-icons right">cancel</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  FIELDS.forEach(({ name }) => {
    if (!values[name]) errors[name] = "This is a mandatory filed..!";
  });

  return errors;
};

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(Form);
