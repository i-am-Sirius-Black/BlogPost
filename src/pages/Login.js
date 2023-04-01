import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import { doLogIn } from "../auth";
import Base from "../components/Base";
import userContext from "../context/userContext";
import { loginUser } from "../services/user-service";

const Login = () => {
    const userContextData = useContext(userContext);
  
    const navigate = useNavigate();
  
    const [loginDetail, setLoginDetail] = useState({
      username: "",
      password: "",
    });
  
    const handleChange = (event, field) => {
      let actualValue = event.target.value;
      setLoginDetail({
        ...loginDetail,
        [field]: actualValue,
      });
    };
  
    const handleReset = () => {
      setLoginDetail({
        username: "",
        password: "",
      });
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      console.log(loginDetail);
      //validation
      if (
        loginDetail.username.trim() == "" ||
        loginDetail.password.trim() == ""
      ) {
        toast.error("Username or Password  is required !!");
        return;
    }

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        console.log(data);

        //save the data to localstorage
        doLogIn(data, () => {
          console.log("login detail is saved to localstorage");
          //redirect to user dashboard page
          userContextData.setUser({
            data: data.user,
            login: true,
          });
          navigate("/user/dashboard");
        });

        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 400 || error.response.status == 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong  on sever !!");
        }
      });
  };

    return(

        <Base>
              
              <Container>
           <Row className="mt-5">

            <Col sm={{size:6,offset:3}}>
            
            <Card color="dark" inverse>
                <CardHeader className="text-center">
                    <h3>User Login</h3>
                </CardHeader>

                <CardBody >
                    {/*Creating form*/}
                      
                    <Form on onSubmit={handleFormSubmit} >

                        {/*Email field*/}
                        <FormGroup>
                            <Label for="Email">Email/Username</Label>
                            <Input
                            type="email"
                            placeholder="eg: myname@example.com "
                            id="email"
                            value={loginDetail.username}
                            onChange={(e)=>handleChange(e,'username')}
                            />
                            
                        </FormGroup>

                        {/*Password field*/}
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input
                            type="password"
                            placeholder="Create a Password "
                            id="password"
                            value={loginDetail.password}
                            onChange={(e)=>handleChange(e,'password')}
                            />
                            </FormGroup>

                        <Container className="text-center">
                            <Button outline color="light">Login</Button>
                            <Button outline onClick={handleReset} color="secondary" type="reset" className="ms-3">Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
            
            </Col>
           </Row>
         </Container>

        </Base>

    );
};

export default Login;