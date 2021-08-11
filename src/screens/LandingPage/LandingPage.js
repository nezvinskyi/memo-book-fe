import { Container, Row, Button } from 'react-bootstrap';
import style from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={style.main}>
      <Container>
        <Row>
          <div className={style.introText}>
            <div className="">
              <h1 className={style.title}>Welcome to Memo-Book</h1>
              <p className={style.subtitle}>One safe place for all your notes</p>
            </div>
            <div className={style.buttonContainer}>
              <a href="/login">
                <Button size="lg" variant="outline-primary" className={style.landingBtn}>
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button size="lg" variant="outline-primary" className={style.landingBtn}>
                  Signup
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
