import { Link } from 'react-router-dom';
import { MainScreen } from '../../components';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import notes from '../../data/notes';

const MyNotes = () => {
  const deleteHandler = id => {
    if (window.confirm('Are you sure?')) {
      alert(id);
    }
  };
  return (
    <MainScreen title="Welcome back Dmitry">
      <Link to="createnote">
        <Button size="lg" style={{ marginLeft: 10, marginBottom: 6 }}>
          Create new note
        </Button>
      </Link>

      {notes.map(note => (
        <Accordion>
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
                  {note.title}
                </Accordion.Toggle>
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  classname="mx-2"
                  onClick={() => {
                    deleteHandler(note._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <Badge variant="success">Category - {note.category}</Badge>
                </h4>

                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
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

export default MyNotes;
