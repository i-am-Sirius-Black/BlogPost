import { Link, NavLink as ReactLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
    Dropdown,
  } from 'reactstrap';
import { doLogOut, getCurrentUserDetail, isLoggedIn } from '../auth';
import { useContext } from 'react';
import userContext from '../context/userContext';
import { shadows } from '@mui/system';
  
const CustomNavbar = () =>{


  const userContextData = useContext(userContext)
   
   let navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const[login,setLogin]=useState(false)
    const[user,setUser]=useState(undefined)

    console.log("user data",user);
  
    useEffect(()=>{
      
      setLogin(isLoggedIn())
      setUser(getCurrentUserDetail())

    },[login])
    
    const logout = () => {
      doLogOut(() => {
          //logged out
          setLogin(false)
          userContextData.setUser({
              data: null,
              login: false
          })

          navigate("/")
      })
  }

    const toggle = () => setIsOpen(!isOpen);
 
  return (
    
    <div>
      <Navbar 
                
                expand="md"
                fixed=""
                className='px-2'
                
                
                >
        <NavbarBrand tag={ReactLink} to="/"><img
              src='https://i.ibb.co/Sdn7hqx/blogpost-Logo.png'
              height='30'
              alt=''
              loading='lazy'
            />
       </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <NavItem>
              <NavLink  tag={ReactLink} to="/"><b>New Feeds</b></NavLink>
            </NavItem>
            <NavItem>
              <NavLink  tag={ReactLink} to="/about"><b>About</b></NavLink>
            </NavItem>
            <NavItem>
              <NavLink  tag={ReactLink} to="/services"><b>Services</b></NavLink>
            </NavItem>
            
          
          
          
            <div className='more_menu'>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret >
              <b> More</b>
              </DropdownToggle>

              <DropdownMenu style={{ backgroundColor: "#00ADB5" }} end>
      
                <DropdownItem><img src="https://iili.io/HNRzPrg.th.png"  alt='logo' width="20" height="20" className='logo-img'/>Contact Us</DropdownItem>
                

                <DropdownItem divider style={{ borderColor: "#EEEEEE", borderWidth: "3px", margin: "10px 0" }}/>

                <DropdownItem tag={ReactLink} to="https://www.linkedin.com/in/javed-khan-514601171/" target="_blank" rel="noopener noreferrer" className='menu'>
                <img src="https://iili.io/HNRBm92.th.png"  alt='logo' width="20" height="20" className='logo-img'/>
                 LinkedIn</DropdownItem>

                <DropdownItem tag={ReactLink} to="https://github.com/i-am-Sirius-Black" target="_blank" rel="noopener noreferrer" className='menu'>
                <img src="https://iili.io/HNRxotS.th.png"  alt='logo' width="20" height="20" className='logo-img'/>
                GitHub</DropdownItem>

                <DropdownItem tag={ReactLink} to="https://i-am-sirius-black.github.io/tindog/" target="_blank" rel="noopener noreferrer" className='menu'>
                <img src="https://iili.io/HNRxNNp.th.png"  alt='logo' width="20" height="20" className='logo-img'/>
                Project-TinDog?</DropdownItem>

              </DropdownMenu>
            </UncontrolledDropdown>

            </div>


          </Nav>
          <Nav navbar>
            {
              login &&(
                    <>  
                          <NavItem>
                            <NavLink tag={ReactLink} to="/user/profile-info">
                            <b> Profile Info</b>
                            </NavLink>
                        </NavItem>

                        <NavItem className='write' >
                            <NavLink tag={ReactLink} to="/user/dashboard">
                            <img src="https://iili.io/HNSZIt9.th.png"  alt='logo' width="20" height="20" className='write_logo' />
                            <b>Write</b>
                            </NavLink>
                        </NavItem>


                         {/* Use Account information and logout menu */}
                          

                          <div className='hello_user'>

                          <Dropdown  className='account_menu'>
                        <UncontrolledDropdown nav inNavbar> 
                          <DropdownToggle nav caret ><img src="https://iili.io/HNpU6ts.th.png"  alt='logo' width="30" height="30" className='account' />
                          Hello, {user.name}
                          </DropdownToggle>

                          <DropdownMenu style={{ backgroundColor: "#C2DED1" }} end >
                          <DropdownItem tag={ReactLink} to={`/user/profile-info/${user.id}`}>Account</DropdownItem>
                          <DropdownItem>Your Posts</DropdownItem>
                          <DropdownItem onClick={logout}>Log-Out?</DropdownItem>
                          </DropdownMenu>
                          </UncontrolledDropdown>
                          </Dropdown>

                          </div>
  
                    </>
              )
            }
             
             {
              !login &&(
                <>
                                <NavItem>
              <NavLink tag={ReactLink} to="/login">
                <Button color='primary'>Login</Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/signup">
                <Button color='success'>SignUp</Button>
              </NavLink>
            </NavItem>  
                </>
              )
             }

          </Nav>
         
        </Collapse>
      </Navbar>
    </div>

    )
}




export default CustomNavbar