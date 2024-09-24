import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PersonalInfoDelete = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState('');

  const handleAadharChange = (e) => {
    setAadharCardNumber(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this information? This action cannot be undone.')) {
      try {
        await axios.delete(`http://localhost:5143/api/PersonalInfo/${aadharCardNumber}`);
        alert('Personal information deleted successfully!');
        setAadharCardNumber('');
      } catch (error) {
        console.error('Error deleting personal information:', error);
        alert('Error deleting personal information. Please check the Aadhar Card Number and try again.');
      }
    }
  };

  return (
    <>
      <h2>Delete Personal Information</h2>
      <Form onSubmit={handleDelete}>
        <Form.Group className="mb-3">
          <Form.Label>Aadhar Card Number</Form.Label>
          <Form.Control 
            type="text" 
            value={aadharCardNumber} 
            onChange={handleAadharChange} 
            maxLength={12} 
            minLength={12} 
            required
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </Form>
    </>
  );
};

export default PersonalInfoDelete;