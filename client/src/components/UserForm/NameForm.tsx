import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from '../../AxiosInstance';
const NameForm = () => {
  const [name, setName] = React.useState('');
  const navigation = useNavigate();
  const handleContinue = () => {
    axios
      .post('/create-user', { userName: name })
      .then((resp) => {
        sessionStorage.setItem('playerInfo', JSON.stringify(resp.data));
        sessionStorage.setItem('currentPlayerId', JSON.stringify(resp.data?.id));
        navigation('/user-selection');
      })
      .catch((e) => console.error('error,', e));
  };
  return (
    <Card data-bs-theme='dark' style={{ width: '40rem', padding: '2rem', margin: '1rem auto' }}>
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
