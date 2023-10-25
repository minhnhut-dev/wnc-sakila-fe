import React, { useContext } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from 'mdb-react-ui-kit';
import AppContext from '../context/userContext';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from "react-router-dom";

export default function Header() {
  const {user, setUser} = useContext(AppContext);

  const navigate = useNavigate();
  const {removeValueLocally} = useLocalStorage("sakila-user");
  const logout = async () => {
    setUser(null);
    removeValueLocally();
    navigate("/login")
  }

  return (
    <>
      {user ? <header>
      <MDBNavbar expand='lg' light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <MDBNavbarNav right className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink href='/actor'>Actor</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/film'>Film</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            </MDBNavbarItem>
            <MDBNavbarItem className='nav-item dropdown navbar-nav ms-auto d-flex flex-row' id="main-navbar">
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className="nav-link dropdown-toggle d-flex align-items-center" href="#" data-mdb-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img src="https://0.gravatar.com/avatar/c785ee2333268eb44fdff2435ed4bfaa?s=32&amp;d=mm&amp;r=g&amp;s=24" className="avatar avatar-24 photo rounded-circle" />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link onClick={logout}>logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          {/* </MDBNavbar> */}
        </MDBContainer>
      </MDBNavbar>
    </header> : ''}
    </>

  );
}