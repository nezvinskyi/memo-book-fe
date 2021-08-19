import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { updateProfile } from '../../redux/actions/userActions';
import styles from './ProfilePage.module.css';

const ProfilePage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [avatarMessage, setAvatarMessage] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { loading, error, success } = useSelector(state => state.userUpdate);

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAvatar(userInfo.avatar);
    }
  }, [history, userInfo]);

  const submitHandler = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords no not match');
      return;
    }

    dispatch(updateProfile({ name, email, password, avatar }));
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
    <MainScreen title="Edit Profile">
      <div>
        <Row className={styles.profileContainer}>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {(error || message) && (
                <ErrorMessage variant="danger">{error || message}</ErrorMessage>
              )}
              {success && <ErrorMessage variant="sucess">Updated successfully</ErrorMessage>}
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
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={avatar} alt={name} className={styles.avatar} />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
