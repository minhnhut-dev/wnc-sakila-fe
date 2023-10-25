import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { axiosService } from '../services/axiosServices';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBSpinner
}
  from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError} from '../services/toastService';
import useLocalStorage from '../hooks/useLocalStorage';
import AppContext from "../context/userContext";

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { setValue } = useLocalStorage("sakila-user");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {setUser, user} = useContext(AppContext);
  const navigate = useNavigate();

  const login = async () => {
    setIsSubmitting(true);
    try {
      const { data, status } = await axiosService.post('/auth/sign-in', {
        email: email,
        password: password
      });
      if (status === 200) {
        setUser(data);
        setValue(JSON.stringify(data));
        toastSuccess('Login success');
        navigate('/film');
      }else {
        toastError(data.message);
      }
    } catch (error) {
      toastError(error.message);
    }
    setIsSubmitting(false);
  }

  useEffect(() => {
    if (user) {
      navigate(-1);
      console.log("user: ", user)
    }
  }, [user]);

  return (
    <MDBContainer className="my-5">
      <MDBRow className='g-0'>
        <MDBCol md='6'>
          <MDBCard >
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }} />
                <div>
                  <h5 className="fw-normal">Welcome to</h5>
                  <h2 className="fw-bold">Sakila</h2>
                </div>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>
              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={(e) => setPassword(e.target.value)} />

              <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={() => login()} disabled={isSubmitting}>Login
                {
                  isSubmitting && <MDBSpinner role='status' size='sm'>
                  </MDBSpinner>
                }
              </MDBBtn>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a href="#!" style={{ color: '#393f81' }}>Register here</a></p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default App;