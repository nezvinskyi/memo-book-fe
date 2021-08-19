import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { deleteMemoAction, listMemos } from '../../redux/actions/memoActions';
import { useDispatch, useSelector } from 'react-redux';

const MyMemos = ({ history, search }) => {
  const dispatch = useDispatch();

  const memoList = useSelector(state => state.memoList);
  const { memos, loading, error } = memoList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const memoAdd = useSelector(state => state.memoAdd);
  const { success: successCreated } = memoAdd;

  const memoUpdate = useSelector(state => state.memoUpdate);
  const { success: successUpdated } = memoUpdate;

  const memoDelete = useSelector(state => state.memoDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = memoDelete;

  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteMemoAction(id));
    }
  };

  useEffect(() => {
    dispatch(listMemos());
    if (!userInfo) {
      history.push('/');
    }
  }, [dispatch, history, userInfo, successCreated, successUpdated, successDelete]);

  return (
    <MainScreen title={`Welcome back, ${userInfo.name}`}>
      <Link to="addmemo">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new memo
        </Button>
      </Link>

      {errorDelete && <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

      {loadingDelete && <Loading />}
      {loading && <Loading />}

      {memos
        ?.reverse()
        .filter(filteredMemo =>
          filteredMemo.title.toLowerCase().includes(search.toLowerCase().trim()),
        )
        .map(memo => (
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
                    <footer className="blockquote-footer">
                      Created on <cite title="Source Title">{memo.createdAt.substring(0, 10)}</cite>
                    </footer>
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
