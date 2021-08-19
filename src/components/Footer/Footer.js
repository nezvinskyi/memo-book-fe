import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col className="text-left py-3">
            Made by{' '}
            <a href="https://github.com/nezvinskyi" target="__blank">
              Dmitry
            </a>
          </Col>
          <Col className="text-right py-3">
            Frontend{' '}
            <a href="https://github.com/nezvinskyi/memo-book-fe" target="__blank">
              GitHub
            </a>{' '}
            Backend{' '}
            <a href="https://github.com/nezvinskyi/memo-book-be" target="__blank">
              GitHub
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
