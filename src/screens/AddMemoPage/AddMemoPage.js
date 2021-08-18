import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMemoAction } from '../../redux/actions/memoActions';
import ReactMarkdown from 'react-markdown';
import { ErrorMessage, Loading, MainScreen } from '../../components';
import { Button, Card, Form } from 'react-bootstrap';

const AddMemoPage = ({ history }) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState();

  const dispatch = useDispatch();

  const memoAdd = useSelector(state => state.memoAdd);

  const { loading, error, memo } = memoAdd;
  console.log('memo :>> ', memo);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(addMemoAction(title, content, category));

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
    <MainScreen title="Create a Memo">
      <Card>
        <Card.Header>Create a new memo</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
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
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default AddMemoPage;
