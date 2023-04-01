
import { AspectRatio, Box, CardOverflow, Divider,Link, Typography } from "@mui/joy";

import React, { useContext, useEffect, useState } from "react";
import { Button, CardBody, CardText, Col, Row } from "reactstrap";
import Card from '@mui/joy/Card';
import { Container } from "@mui/system";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from '../context/userContext'
import { Link as RctLink } from "react-router-dom";
import { Base_URL } from "../services/helper"
import '@fontsource/public-sans';



function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {

  const userContextData = useContext(userContext)
  const [user, setUser] = useState(null)
  const [login, setLogin] = useState(null)
  

  useEffect(() => {
      setUser(getCurrentUserDetail())
      setLogin(isLoggedIn())
  }, [])



  return(
 
    <Container >
 
         <Card
         orientation="horizontal"
         variant="outlined"
         sx={{
          backgroundColor:'#30475E',
           width: 900,
           height: 290,
           gap: 5,
           
           '&:hover': { boxShadow: 'md'},
           marginTop:4,marginBottom:3
         }}
         
       >  
           
           
                     
                     
                          

                     <div className="card_img">
 
                          <CardOverflow>
                          <AspectRatio ratio={16/9} sx={{width: 300, paddingTop:7,  }}>
                          <img
                            className="img-fluid"
                          src={Base_URL+'/post/image/'+post.imageName}
                          srcSet={Base_URL+'/post/image/'+post.imageName}
                          height={112}
                          width={112}
                          loading="lazy"
                          alt=""
                            />
                          </AspectRatio>
                          </CardOverflow>

                          <div id="post_info">
                             <CardOverflow
                           variant="soft"
                           sx={{
                             display: 'flex',
                             gap: 3,
                             py: 1,
                             px: 'var(--Card-padding)',
                             bgcolor:'black',
                           }}
                         >
                           <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                             6.3k views
                           </Typography>
                           <Divider orientation="vertical" />
                           <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                             1 hour ago
                           </Typography>
                         </CardOverflow>
                             </div>
           </div>
                          
                          
                    
 
         
                             
 
          
                
           <Divider orientation="vertical" />
 
           <Box sx={{ display: 'flex' }}>
             <CardBody>
             
                     <div className="card_title">
                     <Typography 
                     variant="h1"
                     fontSize="lg" 
                     id="post_title" 
                     mb={0.5}
                     fontWeight={800}
                     
                     color="dark"
                     >
 
                     {post.title}
 
                     </Typography>
                     </div>
 
                     
             
 
                       <div className="card_content">
 
                           
                             <Typography 
                               fontSize="lg" 
                               aria-describedby="post_content" 
                               
                               mb={10}
                               >
 
                             <Link
                               overlay
                               underline="none"
                               href={'/posts/' + post.postId}
                               sx={{color: 'text.tertiary' }}
                             >
                               <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,300)+"..."}}>
                       
                               </CardText>
                               
 
                               
                             </Link>
                                 
                           </Typography>
 
                       </div>
 
                       </CardBody>
        
 
                       </Box> 
 
                             
 
 
 
         </Card>
 
 
 
         
       
         <div >
      {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={(event) => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
   
      {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={RctLink} to={`/user/update-blog/${post.postId}`} color='warning' className="ms-2">Edit Post</Button> : '')}
 
        </div>
         </Container>
 
     )
 }
 
 export default Post

