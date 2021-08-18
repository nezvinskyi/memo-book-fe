import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/userActions';
import { MainScreen, Loading, ErrorMessage } from '../../components';
import { Form, Button } from 'react-bootstrap';
import './RegisterPage.css';

const RegisterPage = ({ history }) => {
  const [name, setName] = useState('D');
  const [email, setEmail] = useState('dima@dima.dd');
  const [password, setPassword] = useState('12345');
  const [confirmPassword, setConfirmPassword] = useState('12345');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState(null);
  const [avatarMessage, setAvatarMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/mynotes');
    }
  }, [history, userInfo]);

  const submitHandler = async e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords no not match');
      return;
    }

    dispatch(register(name, email, password, avatar));
  };

  const postDetails = avatars => {
    if (!avatars) {
      return setAvatarMessage('Please select an image');
    }
    setAvatarMessage(null);

    if (avatars.type === 'image/jpeg' || avatars.type === 'image/png') {
      const data = new FormData();
      data.append('file', avatars);
      data.append('upload_preset', 'memo-book');
      data.append('cloud_name', 'dadntg8ia');
      fetch('https://api.cloudinary.com/v1_1/dadntg8ia/image/upload', {
        method: 'post',
        body: data,
      })
        .then(res => res.json())
        .then(data => {
          console.log('data :>> ', data);
          setAvatar(data.url.toString());
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return setAvatarMessage('Please select an Image');
    }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="registerContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {avatarMessage && <ErrorMessage variant="danger">{avatarMessage}</ErrorMessage>}

          <Form.Group controlId="avatar">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
              onChange={e => postDetails(e.target.files[0])}
            />

            <Form.Text className="text-muted">
              If you provide no picture, we will try to search Gravatar for your email
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
