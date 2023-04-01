// import { Card, Divider, Link, Typography } from "@mui/joy"
// import { Container } from "@mui/system"
// import { useContext, useEffect } from "react"
// import { useState } from "react"
// import { toast } from "react-toastify"
// import { Button, CardBody, CardText } from "reactstrap"
// import { getCurrentUserDetail, isLoggedIn } from "../auth"
// import userContext from "../context/userContext"
// import { deletePostService, loadPostUserWise } from "../services/post-service"




// function PostDeleter({ post = { id: -1, title: "This is default post title", content: "This is default post content" } , deletePost }) {

//   const userContextData = useContext(userContext)
//     const [user, setUser] = useState({})
//     const [posts, setPosts] = useState([])
//     useEffect(() => {
//       console.log(getCurrentUserDetail());
//       setUser(getCurrentUserDetail())
//       loadPostData()
  
//     }, [])
  
//     function loadPostData() {
//       loadPostUserWise(getCurrentUserDetail().id).then(data => {
//         console.log(data)
  
//         setPosts([...data])
//       })
//         .catch(error => {
//           console.log(error)
//           toast.error("error in loading user posts")
//         })
//     }
  
//     function to delete post
  
//     function deletePost(post) {
//       //going to delete post
//       console.log(post)
  
//       deletePostService(post.postId).then(res => {
//         console.log(res)
//         toast.success("post is deleled..")
//         loadPostData()
//         let newPosts = posts.filter(p => p.postId !== post.postId)
//         setPosts([...newPosts])
  
//       })
//         .catch(error => {
//           console.log(error)
//           toast.error("error in deleting post")
//         })
//     }

//   return(


//             <Container >

//             <Card
//             variant="outlined"
//             orientation="horizontal"
//             sx={{
//             width: 620,
//             gap: 5,
//             '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
//             marginTop:4,marginBottom:3
//             }}
            
//         >  
//                 <CardBody >
                
//                         <Typography 
//                         variant="h1"
//                         // fontSize="lg" 
//                         id="post_title" 
//                         mb={0.5}
//                         fontWeight={700}
//                         color="dark"
//                         >

//                         {post.title}

//                         </Typography>

//                         <Divider />
                


//                 <Typography 
//                 fontSize="sm" 
//                 aria-describedby="post_content" 
//                 mb={10}
//                 >

//             <Link
//                 overlay
//                 underline="none"
//                 href={'/posts/' + post.postId}
//                 sx={{color: 'text.tertiary' }}
//             >
//                 <CardText dangerouslySetInnerHTML={{__html:post.content.substring(0,300)+"..."}}>

//                 </CardText>
                

                
//             </Link>
                
//             </Typography>

                    

//                 </CardBody>
            
        
//         </Card>
        
                
//         <div >

//         {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className="ms-2">Delete</Button> : '')}
//         {isLoggedIn() && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className="ms-2">Update</Button> : '')}

//         </div>

//         </Container>
    
    

//   )

// }

// export default PostDeleter