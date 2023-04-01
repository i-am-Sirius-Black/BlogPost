import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";
import {toast} from "react-toastify";


const Signup=()=>{

    
    const [data,setData] = useState({

         name:'',
         email:'',
         password:'',
         about:''
         
    })

    const[error,setError]=useState({
        error:{},
        isError:false
    })

    

    //handle change

    const handleChange=(event,property)=>{

        //dynamically setting values
        setData({...data,[property]:event.target.value})
        
    }

    //resetting form data
    const resetData=()=>{
        setData({
            name:'',
            email:'',
            password:'',
            about:''
        })
    }

    //submitting the form

    const submitForm=(event)=>{
        event.preventDefault()

        // if(error.isError){
        //     toast.error("Form data invalid, correct the details")
        //     setError({...error,isError:false})
        //     return;
        // }

        console.log(data);

        //data validate

        // call server api for sending data
        signUp(data)
        .then((resp)=>{
            console.log(resp)
            console.log("success log");
            setError({ ...error, isError: false, errors: "" });
            toast.success("User is registered succesfully!!  user id"+resp.id)
            setData({
                name:'',
                email:'',
                password:'',
                about:''
            })
        }).catch((error)=>{
            console.log(error);
            console.log("Error log");

            //handle errors properly
            setError({
                errors:error,
                isError:true
            })
        })
    }
    
    return(

        <Base>

         <Container>
           <Row className="mt-4">

            <Col sm={{size:6,offset:3}}>
            
            <Card color="dark" inverse>
                <CardHeader className="text-center">
                    <h3>User Registration!!</h3>
                </CardHeader>

                <CardBody>
                    {/*Creating form*/}
                      
                    <Form onSubmit={submitForm}>
                        {/*Name field*/}
                        <FormGroup >
                            <Label for="Name">Full Name </Label>
                            <Input
                            type="text"
                            placeholder="eg: Salahuddin Ayyubi"
                            id="name"
                            onChange={(e)=>handleChange(e,'name')}
                            value={data.name}
                            invalid={error.errors?.response?.data?.name ? true : false }
                            />
                            
                            <FormFeedback>
                            {error.errors?.response?.data?.name }
                            </FormFeedback>
                        </FormGroup>

                        {/*Email field*/}
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input
                            type="email"
                            placeholder="eg: myname@example.com "
                            id="email"
                            onChange={(e)=>handleChange(e,'email')}
                            value={data.email}
                            invalid={error.errors?.response?.data?.email ? true : false }
                            />
                            <FormFeedback>
                            {error.errors?.response?.data?.email }
                            </FormFeedback>
                            
                        </FormGroup>

                        {/*Password field*/}
                        <FormGroup>
                            <Label for="Password">Password</Label>
                            <Input
                            type="password"
                            placeholder="Create a Password "
                            id="password"
                            onChange={(e)=>handleChange(e,'password')}
                            value={data.password}
                            invalid={error.errors?.response?.data?.password ? true : false }
                            />
                            <FormFeedback>
                            {error.errors?.response?.data?.password }
                            </FormFeedback>

                            </FormGroup>

                        {/*About Yourself field*/}
                        <FormGroup>
                            <Label for="About">Write a description about yourself</Label>
                            <Input
                            type="textarea"
                            placeholder="Write a description about yourself"
                            id="about"
                            style={{height:"200px"}}
                            onChange={(e)=>handleChange(e,'about')}
                            value={data.about}
                            invalid={error.errors?.response?.data?.about ? true : false }
                            />
                            <FormFeedback>
                            {error.errors?.response?.data?.about }
                            </FormFeedback>
                            
                        </FormGroup>

                        <Container className="text-center">
                            <Button outline color="light">Register</Button>
                            <Button outline onClick={resetData} color="secondary" type="reset" className="ms-3">Reset</Button>
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

export default Signup;