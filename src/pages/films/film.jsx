import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { axiosService, setAuthToken } from '../../services/axiosServices';
import moment from 'moment/moment';
import AlertCustom from '../../Components/Alert';
import useLocalStorage from '../../hooks/useLocalStorage';
import AppContext from '../../context/userContext';

function Film() {
  const {value} = useLocalStorage("sakila-user") || "{}";
  const {user: userInfo} = useContext(AppContext);
  const user = JSON.parse(value);
  const accessToken =  user?.access_token;
  const [film, setFilm] = useState([]);

  const [error, setError] = useState(null);
  const getFilm = async () => {
    try {
      setAuthToken(accessToken);
      const response = await axiosService.get('/film');
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    getFilm().then((data) => {
      setFilm(data);
    }).catch((error) => {
      setError(error.message);
    });
  }, []);

  return (
    <>
      <div className="actor">
        <Container>
          <Row>
            <Col md={4} >
              {error  && <AlertCustom key="danger" variant="danger" className='mt-3'>
                {error}
              </AlertCustom>}
            </Col>
          </Row>
          <Row>
            <Col md={12} className='bg-white border rounded-5 mt-3'>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>release year</th>
                    <th scope='col'>Rating</th>
                    <th scope='col'>lastUpdate</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {film && film.map((f, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{f?.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='fw-normal mb-1'>{f?.description}</p>
                      </td>
                      <td>
                        <p className='fw-bold mb-1'>{f?.releaseYear}</p>
                      </td>
                      <td>{f?.rating}</td>
                      <td>{moment(f.lastUpdate).format("dd-MM-yyyy")}</td>
                    </tr>
                  ))}

                </MDBTableBody>
              </MDBTable>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Film;