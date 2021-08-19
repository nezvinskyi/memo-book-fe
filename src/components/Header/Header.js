import { Navbar, Container, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/userActions';

const Header = ({ search, setSearch }) => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <header>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">Memo-Book</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {userInfo && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">
                <Form inline>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    onChange={e => setSearch(e.target.value)}
                  />
                </Form>
              </Nav>

              <Nav>
                <Nav.Link href="/mymemos">My Memos</Nav.Link>
                <NavDropdown title={userInfo?.name || 'User'} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
