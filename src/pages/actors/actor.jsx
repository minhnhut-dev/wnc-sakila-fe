
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { axiosService, setAuthToken } from '../../services/axiosServices';
import moment from 'moment/moment';
import useLocalStorage from '../../hooks/useLocalStorage';
import AppContext from '../../context/userContext';
import { toastError } from "../../services/toastService";

function Actor() {
  const { value } = useLocalStorage("sakila-user") || "{}";
  const { user: userInfo } = useContext(AppContext);
  const user = JSON.parse(value);
  const accessToken = user?.access_token;

  const [actor, setActor] = useState([]);
  const [ts, setTS] = useState(0);

  const getActor = async () => {
    try {
      setAuthToken(accessToken);
      const response = await axiosService.get(`/actor?ts=${ts !== undefined? ts : 0}`);
      return response.data;
    } catch (error) {
      toastError(error?.message);
      throw new Error(error);
    }
  }

  useEffect(() => {
    let interval;
    if(ts !== undefined) {
      interval = setInterval(() => {
        getActor().then((data) => {
          setActor(data.data);
          setTS(data.ts);
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [ts]);
  
  return (
    <>
      <div className="actor">
        <Container>
          <Row>
            <Col md={12} className='bg-white border rounded-5 mt-3'>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>First name</th>
                    <th scope='col'>Last name</th>
                    <th scope='col'>Update time</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {actor && actor.map((a, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{a?.actorId}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{a?.firstName}</p>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{a?.lastName}</p>
                      </td>
                      <td>{moment(a?.lastUpdate).format("dd-MM-yyyy")}</td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <MDBBtn className="mb-4" onChange={() => getActor()}>Load list Actor</MDBBtn>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Actor;