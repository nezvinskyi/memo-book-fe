import { Container, Row } from 'react-bootstrap';
import style from './MainScreen.module.css';

const MainScreen = ({ title, children }) => {
  return (
    <div className={style.mainback}>
      <Container>
        <Row>
          <div className={style.page}>
            {title && (
              <>
                <h1 className={style.heading}>{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
