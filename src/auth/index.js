//isLoggedIn=>?

export const isLoggedIn=()=>{
   let data= localStorage.getItem("data")
   if(data!=null){
    return true
   }else{
    return false
   }

}

//doLogIn=> data => set to localstorage
export const doLogIn=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}


//doLogOut=> remove from localStorage

export const doLogOut=(next)=>{
    localStorage.removeItem("data")
    next()
}

//GET CURRENT USER

export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return undefined
    }
}

export const getToken=()=>{
    if(isLoggedIn()){
        
       return JSON.parse(localStorage.getItem("data")).token;
       
    }else{
        return null;
    }
}