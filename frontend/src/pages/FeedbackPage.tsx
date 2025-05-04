import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Config } from '../config'

function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus('');
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Config.backendUrl}/feedback`, formData);
      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', text: '' }); // reset form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-5"> Customer Feedback Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nameid" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="nameid"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailid" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailid"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="feedbackid" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="feedbackid"
            name="text"
            rows={3}
            placeholder="Your feedback"
            value={formData.text}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary mb-3">Submit</button>
        </div>

        {status === 'success' && (
          <div className="alert alert-success" role="alert">
            Feedback submitted successfully!
          </div>
        )}
        {status === 'error' && (
          <div className="alert alert-danger" role="alert">
            Failed to submit feedback. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}

export default FeedbackPage;
