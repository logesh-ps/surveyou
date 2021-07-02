import React, { useState, useCallback } from "react";
import { reduxForm } from "redux-form";
import Form from "./Form";
import Review from "./Review";

const New = () => {
  const [showReview, setShowReview] = useState(false);

  const handleFormSubmit = () => {
    setShowReview(true);
  };

  const renderContent = useCallback(
    () =>
      showReview ? (
        <Review onCancel={() => setShowReview(false)} />
      ) : (
        <Form onSubmit={handleFormSubmit} />
      ),
    [showReview]
  );

  return renderContent();
};

export default reduxForm({
  form: "surveyForm",
})(New);
