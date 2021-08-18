import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
// import axios from 'axios';
// import { getMemos } from '../../service/memos-api';
import { listMemos } from '../../redux/actions/memoActions';
import { useDispatch, useSelector } from 'react-redux';

const MyMemos = ({ history }) => {
  const dispatch = useDispatch();

  const memoList = useSelector(state => state.memoList);
  const { memos, loading, error } = memoList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      alert(id);
    }
  };

  useEffect(() => {
    dispatch(listMemos());
    if (!userInfo) {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <MainScreen title="Welcome back Dmitry">
      <Link to="creatememo">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new memo
        </Button>
      </Link>

      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      {memos?.map(memo => (
        <Accordion key={memo._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: 'flex' }}>
              <span
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  flex: 1,
                  cursor: 'pointer',
                  alignSelf: 'center',
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {memo.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/memo/${memo._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => {
                    deleteHandler(memo._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {memo.category}</Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{memo.content}</p>
                  <footer className="blockquote-footer">Created on - date</footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyMemos;
