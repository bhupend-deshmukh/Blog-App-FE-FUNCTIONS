import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { reactLocalStorage } from "reactjs-localstorage";
import { Link, Navigate } from "react-router-dom";


function Signup() {
    
    const [data,setData] = useState({})
    const [error, setError] = useState({email:false});

    const emailFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    

    useEffect(()=>{
        let user = reactLocalStorage.getObject("user")
        if(Object.keys(user).length > 0){
            setData({...data,redirects:"/blogs"})
        }
    },{})

    const onChangeHandle =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        
        if(e.target.name==="email"){
            if(!e.target.value.match(emailFormat)){
                setError({...error,email:true})
            }else{
                setError({...error,email:false})
            }
        }   
    }

    const signUp=()=>{
        
        if(data.first_name === undefined || data.last_name === undefined || data.email === undefined || data.password === undefined || data.conform_pass){
            return alert(`Input fields can't be empty.`)
        }
        let first_name = data.first_name.trim()
        let last_name = data.last_name.trim()
        let email = data.email.trim()
        let password = data.password.trim()
        let conform_pass = data['conform-password'].trim()

        if(first_name.length === 0 || last_name.length === 0 || email.length === 0 || password.length === 0){
            return alert(`Input fields can't be empty.`)
        }        

        if(password !== conform_pass){
            return setError({...error,comformPassword:true})
        }else{
            setError({...error,comformPassword:false})
        }
       
        const bodyData = {first_name,last_name,email,password}
        console.log(bodyData);

        axios.post("http://localhost:5050/signup",bodyData).then((resp)=>{
            if (resp.data.status === "error") {
                Swal.fire({
                    title: "Error!",
                    text: resp.data.message,
                    icon: "error",
                });
            } else if (resp.data.status === "success") {
                Swal.fire({
                    title: "Account Created!",
                    text: "Go to login page.",
                    icon: "success",
                });
            }
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Server error...",
                icon: "error",
            });
        });
    }

    return (
        <div className="flex place-content-center h-screen items-center bg-slate-900">
            {!data.redirects ? ("") : (<Navigate to={data.redirects} />)}
            <form className="w-full max-w-lg p-4 bg-slate-500 rounded-md ">
                <div className="flex flex-wrap mb-6">
                    <div className="w-full  px-3  md:mb-0">
                        <label
                            className="text-lg block uppercase tracking-wide text-gray-900  font-bold mb-2"
                            for="grid-first-name"
                            >
                            first name
                        </label>
                        <input
                            className={`appearance-none bloc border-2 w-full text-sm bg-gray-200  text-gray-900 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="first_name"
                            name="first_name"
                            type="text"
                            placeholder="first_name"
                            onChange={(e)=>{onChangeHandle(e)}}
                        />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                            className="text-lg block uppercase tracking-wide text-gray-900  font-bold mb-2"
                            for="grid-first-name"
                        >
                        last name
                        </label>
                        <input
                            className={` border-2 appearance-none block w-full text-sm bg-gray-200 text-gray-900  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="last_name"
                            name="last_name"
                            type="text"
                            placeholder="last_name"
                            onChange={(e)=>{onChangeHandle(e)}}
                        />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                            for="name"
                        >
                        Email
                        </label>
                        <input
                            className={`appearance-none block w-full text-sm bg-gray-200 text-gray-900 border    rounded py-2 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            onChange={(e)=>{onChangeHandle(e)}}
                        />
                        {error.email && <p>Invalid Email</p>}
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                            for="grid-password"
                        >
                            Password
                        </label>
                        <input
                            className="appearance-none block w-full text-sm bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={(e)=> onChangeHandle(e)}

                        />
                        {error.password && <p>Invalid Password</p>}
                    </div>
                    <div className="w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-gray-900 text-lg font-bold mb-2"
                            for="grid-password"
                        >
                            Conform password
                        </label>
                        <input
                            className="appearance-none text-sm block w-full bg-gray-200 text-gray-900 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="conform-password"
                            type="password"
                            name="conform-password"
                            placeholder="conform password"
                            onChange={(e)=>{onChangeHandle(e)}}

                        />
                        {error.comformPassword === true?<p className="text-red-700 font-semibold">The password or comformPassword do not match</p>:""}
                        {error.comformPassword }
                
                        <div className="flex items-center justify-between">
                            <button
                                onClick={signUp}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-5 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                            Sign Up
                            </button>
                            <Link
                                className="underline inline-block align-baseline font-medium mt-3 text-sm text-blue-800 hover:text-blue-900"
                                to="/login"
                            >
                                Already have an account?
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;