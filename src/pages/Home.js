
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import NewsFeed from "../components/NewsFeed";


const Home = () =>{


    return(

        <Base>
          <Container className="mt-3">
             <Row>
              <Col md={10}> <NewsFeed/> </Col>

               <Col md={2} className="pt-5">
                  <CategorySideMenu/>
               </Col>
             </Row>
          </Container>
        </Base>
    );
};

export default Home;