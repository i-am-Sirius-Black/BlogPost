import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import Post from "../components/Post";
import { loadPostCategoryWise } from "../services/post-service";

function Categories(){

    const [posts, setPosts] = useState([])

    const{categoryId}=useParams()

    useEffect(() => {
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(data => {
            setPosts([...data])
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading posts")
            })
    }, [categoryId])



    return(
        <Base>

<Container className="mt-3">
             <Row>

                <Col md={10}>
                      {
                            posts && posts.map((post, index) => {
                                return (
                                    <Post key={index} post={post} />
                                )
                            })

                        }

                        {posts.length <= 0 ? <h1>No post in this category</h1> : ''}
                    
                </Col>
                <Col md={1} className="pt-5">

                  <CategorySideMenu/>

               </Col>
             </Row>
          </Container>
            
        </Base>
    )
}

export default Categories