import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { axiosService, setAuthToken } from '../../services/axiosServices';
import moment from 'moment/moment';

function Actor() {
  let user = localStorage.getItem('sakila-user') || {};
  const accessToken = JSON.parse(user).accessToken || "";
  const [actor, setActor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

 const getActor = async () => {
    setAuthToken(accessToken);
    const { data } = await axiosService.get('/actor');
    return data;
  }

  useEffect(() => {
    setIsLoading(true);
    getActor().then((res) => {
      const {data} = res;
      setActor(data);
      setIsLoading(false);
    })
  }, []);

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
                  {actor.map((a, index) => (
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
                    <td>{  moment(a?.lastUpdate).format("dd-MM-yyyy")}</td>
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