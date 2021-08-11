import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            Made by{' '}
            <a href="https://github.com/nezvinskyi" target="__blank">
              Dmitry
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
