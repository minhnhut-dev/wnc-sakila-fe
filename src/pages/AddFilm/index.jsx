import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBInputGroup } from 'mdb-react-ui-kit';
import { Col, Container, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import _ from 'lodash';
import { axiosService, setAuthToken } from '../../services/axiosServices';
import { toastSuccess } from '../../services/toastService';
import useLocalStorage from '../../hooks/useLocalStorage';

const socket = io('http://localhost:3000');

const emitUserTyping = _.debounce((value, type) => {
  socket.emit('userTyping', { [type]: value, type });
}, 500);


function AddFilm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { value } = useLocalStorage("sakila-user") || "{}";
  const user = JSON.parse(value);
  const accessToken = user?.accessToken;

  useEffect(() => {
    socket.on('userTyping', (data) => {
      if (data.data.type === "firstName") {
        setFirstName(data.data.firstName);
      }else{
        setLastName(data.data.lastName);
      }
    });

    socket.on('notification', (data) => {
      toastSuccess(data.data.message);
      console.log(data.data.message);
    });
    
  }, []);

  const handleAddActor = async () => {
    try {
      setAuthToken(accessToken);
      const {status} = await axiosService.post('/actor', { firstName: firstName, lastName: lastName });
      socket.emit('notification', { message: `Film ${firstName} has just been added` });
    } catch (error) {
      
    }
   
  }

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
    emitUserTyping(e.target.value, 'firstName');
  }

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
    emitUserTyping(e.target.value, 'lastName');
  }
  
  return (
    <>
      <div className="actor">
        <Container>
          <h2 className='h1 fw-bold mt-2'> Add actor</h2>
          <Row>
            <Col md={6} className='bg-white border rounded-5 mt-3'>
              <div className='mt-3 mb-3'>
                <MDBInputGroup textBefore='First name' noBorder>
                  <input className='form-control' name="first_name" onChange={(e) => handleChangeFirstName(e)} value={firstName}/>
                </MDBInputGroup>
              </div>
              <div className='mt-3 mb-3'> 
                <MDBInputGroup textBefore='Last name' noBorder >
                  <input className='form-control' name="last_name"  onChange={(e) => handleChangeLastName(e)} value={lastName}/>
                </MDBInputGroup>
              </div>
              <div className='mt-3 mb-3'>
                <MDBBtn className="mb-4" onClick={handleAddActor}>ADD ACTOR</MDBBtn>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AddFilm;