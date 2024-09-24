import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const PersonalInfoList = () => {
  const [personalInfos, setPersonalInfos] = useState([]);
  const [editingInfo, setEditingInfo] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPersonalInfos();
  }, []);

  const fetchPersonalInfos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5143/api/PersonalInfo');
      setPersonalInfos(response.data);
    } catch (error) {
      console.error('Error fetching personal information:', error);
      setError('Failed to fetch personal information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (info) => {
    setEditingInfo(info);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.put('http://localhost:5143/api/PersonalInfo', editingInfo);
      setSuccess('Personal information updated successfully!');
      setShowEditModal(false);
      fetchPersonalInfos();
    } catch (error) {
      console.error('Error updating personal information:', error);
      setError('Failed to update personal information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Phone Number</th>
            <th>Email Address</th>
            <th>Pan Card</th>
            <th>Aadhar Card</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personalInfos.map((info) => (
            <tr key={info.aadharCardNumber}>
              <td>{info.name}</td>
              <td>{new Date(info.dateOfBirth).toLocaleDateString()}</td>
              <td>{info.phoneNumber}</td>
              <td>{info.emailAddress}</td>
              <td>{info.panNumber}</td>
              <td>{info.aadharCardNumber}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleEdit(info)}>Edit</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Personal Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editingInfo?.name || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                value={editingInfo?.dateOfBirth?.split('T')[0] || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, dateOfBirth: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Residential Address</Form.Label>
              <Form.Control
                as="textarea"
                value={editingInfo?.residentialAddress || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, residentialAddress: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                value={editingInfo?.permanentAddress || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, permanentAddress: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={editingInfo?.phoneNumber || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                value={editingInfo?.emailAddress || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, emailAddress: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marital Status</Form.Label>
              <Form.Control
                as="select"
                value={editingInfo?.maritalStatus || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, maritalStatus: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={editingInfo?.gender || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, gender: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Occupation</Form.Label>
              <Form.Control
                type="text"
                value={editingInfo?.occupation || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, occupation: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Aadhar Card Number</Form.Label>
              <Form.Control
                type="text"
                value={editingInfo?.aadharCardNumber || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, aadharCardNumber: e.target.value })}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type="text"
                value={editingInfo?.panNumber || ''}
                onChange={(e) => setEditingInfo({ ...editingInfo, panNumber: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PersonalInfoList;
