// For more help visit https://formspr.ee/react-help
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';


export default function ContactForm() {
  const [state, handleSubmit] = useForm('mqazodkz');

  if (state.succeeded) {
    return (
      <div>
        <p>
          Thank you for your message!
          I'll do my best to get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <div className="theme-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </div>
        <div className="form-row">
          <label htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>
        <div className="form-row form-actions">
          <button type="submit" disabled={state.submitting} className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}