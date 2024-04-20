import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const NameForm = () => {
  const [name, setName] = React.useState('');
  const navigation = useNavigate();
  const handleContinue = () => {
    localStorage.setItem('playerName', name);
    navigation('/user-selection');
  };
  return (
    <Card>
      <Form.Control
        value={name}
        onChange={(e) => setName(e.target.value)}
        size='lg'
        type='text'
        placeholder='Please Enter Player name'
      />
      <Button variant='primary' onClick={handleContinue}>
        Continue
      </Button>
    </Card>
  );
};
export default NameForm;
