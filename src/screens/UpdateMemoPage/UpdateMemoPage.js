import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMemoAction } from '../../redux/actions/memoActions';
import ReactMarkdown from 'react-markdown';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { Button, Card, Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { getMemoById } from '../../service/memos-api';

const UpdateMemoPage = ({ match, history }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const memoUpdate = useSelector(state => state.memoUpdate);
  const { loading, error } = memoUpdate;

  const {
    userInfo: { token },
  } = useSelector(state => state.userLogin);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await getMemoById(match.params.id, token);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };
    fetching();
  }, [match.params.id, date, token]);

  const updateHandler = e => {
    e.preventDefault();
    dispatch(updateMemoAction(match.params.id, title, content, category));

    if (!title || !content || !category) return;

    resetHandler();
    history.push('/mymemos');
  };

  const resetHandler = () => {
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <MainScreen title="Update Memo">
      <Card>
        <Card.Header>Update your memo</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={e => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <Loading size={50} />}

            <Button type="submit" variant="primary">
              Update Note
            </Button>
            <Button
              className="mx-2"
              // onClick={()=>deleteHandler(match.params.id)}
              variant="danger"
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">Last updated on - {date.substring(0, 10)}</Card.Footer>
      </Card>
    </MainScreen>
  );
};
export default UpdateMemoPage;
