import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

interface User {
  id?: string,
  firstName: string,
  lastName: string
};

function App() {
  const [userList, setUserList] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
      getUsersList();
  }, []);

  const clearData = () => {
    setUser({
      firstName: "",
      lastName: ""
    });
  }

  const getUsersList = async () => {
    const response = await fetch("http://localhost:4000/users")
    const data = await response.json();
    setUserList(data);
  }

  const handleChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [fieldName]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(JSON.stringify(user));
    const response = await fetch("http://localhost:4000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    setUserList([...userList, data]);
    clearData();
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="name" name="firstName" placeholder="Enter First Name" value={user?.firstName} onChange={handleChange("firstName")} />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="name" name="lastName" placeholder="Enter Last Name" value={user?.lastName} onChange={handleChange("lastName")} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <ListGroup>
        {userList.map(user => <ListGroup.Item key={user.id}>{`${user.id} ${user.firstName} ${user.lastName}`}</ListGroup.Item>)}
      </ListGroup>
    </>
  )
};

export default App;
