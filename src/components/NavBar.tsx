import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarToggler,
  NavbarBrand,
} from "reactstrap";
import {Image} from "react-bootstrap";
import { SideBar } from "./SideBar";
import { useHistory } from "react-router";
import { AutoCompleteBar } from "./AutoCompleteBar";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="sticky-nav">
      <Navbar color="dark" dark expand="md">
          <Image
            src="/images/longTitle.svg"
            height="50"
            className="d-inline-block align-top mr-5"
            alt="React Bootstrap logo"
          />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="mr-4">
              {/* <SearchBar /> */}
              <AutoCompleteBar/>
            </NavItem>
            <NavItem>
              <NavbarBrand
                type="button"
                onClick={() => {
                  history.push("/home");
                }}
                className="mr-4"
              >
                Home
              </NavbarBrand>
            </NavItem>
            <NavItem>
              <NavbarBrand
                type="button"
                onClick={() => {
                  history.push("/me");
                }}
              >
                M3
              </NavbarBrand>
            </NavItem>
          </Nav>
          <Nav>
            {/* this is the log out button */}
            <NavItem className="mr-auto">
              {/* <NavbarBrand href="/" onClick={handleClick}>
                Logout
              </NavbarBrand> */}
              <SideBar />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
