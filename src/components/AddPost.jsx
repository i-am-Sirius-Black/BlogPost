import { useEffect, useMemo, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label, Placeholder } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import JoditEditor from 'jodit-react';
import { getCurrentUserDetail } from "../auth";
import { toast } from "react-toastify";


const AddPost = () => {

    const editor = useRef(null)
    // const [content,setContent] =useState('')
    const [categories, setCategories] = useState([])
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image, setImage] = useState(null)


    // const config={
    //     placeholder:"Start typing...",

    // }

    useEffect(
        () => {

            setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                console.log(data)
                setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    //field changed function
    const fieldChanged = (event) => {
        
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanaged = (data) => {


        setPost({ ...post, 'content': data  })


    }


    //create post function
    const createPost = (event) => {

        event.preventDefault();

        // console.log(post)
        if (post.title.trim() === '') {
            toast.error("post  title is required !!")
            return;
        }

        if (post.content.trim('') === '' && post.content.trim('&nbsp;') === '' && post.content.trim('<br>') === '' ) {
            toast.error("post content is required !!")
            return
        }

        if (post.categoryId === '') {
            toast.error("select some category !!")
            return;
        }


        //submit the form one server
        post['userId'] = user.id
        doCreatePost(post).then(data => {


            uploadPostImage(image,data.postId).then(data=>{
                toast.success("Image Uploaded !!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })

            toast.success("Post Created !!")
            // console.log(post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error) => {
            toast.error("Post not created due to some error !!")
            // console.log(error)
        })

    }

    //handling file chagne event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return(
        <div className="wrapper">
             
             <Card className="shadow-sm border-0 mt-4">

                <CardBody >
                      {JSON.stringify(post)}
                    <h2>Write Your Post...</h2>
                    <Form onSubmit={createPost}>
                        <div className="my-3" >
            
                            <Input 
                            type="text" 
                            id="title"
                            placeholder="Title"
                            className="rounded-0"
                            name="title"
                            onChange={fieldChanged}
                            // bsSize="lg"
                            
                            
                            />
                        </div>

                        <div className="my-3" >
                  
                            <JoditEditor
                             ref={editor}
                             defaultValue={post.content}
                             onChange={(newContent) => contentFieldChanaged(newContent)}
                             
                            />
                        </div>

                        {/* file field */}

                        <div className="mt-3">
                            <Label for="image">Upload Featured Image</Label>
                            <Input id="image" type="file"  accept="image/png, image/jpg" onChange={handleFileChange}/>
                        </div>

                        <div className="my-3" >
                           
                            <Input 
                            type="select" 
                            id="category"
                            placeholder=""
                            className="rounded-0"
                            name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}
                            >
                                <option disabled value={0}>--Select Category--</option>
                                {
                                    categories.map((category)=>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }
                            </Input>

                        </div>

                        <Container className="text-center">
                            <Button type ="submit" color="success" size="sm">Publish</Button>
                            
                        </Container>
                    </Form>

                </CardBody>

                

             </Card>
           
        </div>
    )
}

export default AddPost