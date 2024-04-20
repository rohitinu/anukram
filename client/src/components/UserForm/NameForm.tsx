import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const NameForm=()=>{
    const [name,setName]=React.useState('');
    const handleContinue=()=>{
        localStorage.setItem('playerName',name);
    }
    return <>
          <Form.Control value={name} onChange={(e)=>setName(e.target.value)} size="lg" type="text" placeholder="Please Enter Player name" />
          <Button variant="primary" onClick={handleContinue}>Continue</Button>

</>
}
export default NameForm;