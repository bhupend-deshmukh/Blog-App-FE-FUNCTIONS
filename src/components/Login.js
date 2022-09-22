import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage';
import { Link, Navigate } from "react-router-dom";


function Login() {
    const [data,setData] = useState({})
    useEffect(() => {
		let user = reactLocalStorage.getObject('user')
        console.log(Object.keys(user).length);
        if(Object.keys(user).length > 0){
            setData({...data,redirects:"/blogs"})   
        }
	}, []);


    const onChangeHandle =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
        console.log(e.target.value);
    }

    const login = (e)=>{
        console.log('yes this is working...');

        if(data.email === undefined || data.password === undefined)return alert("Input fields can't be empty...")
        let email = data.email.trim()
        let password = data.password.trim()
        const bodyData = {email,password}

        if( email.length === 0 || password.length === 0){
            return alert("input fields can't be empty...")
        }

        axios.post("http://localhost:5050/login",bodyData).then((resp)=>{
 
        // console.log(resp.data);

            if (resp.data.status === "error") {
                Swal.fire({
                    title: "Error!",
                    text: resp.data.message,
                    icon: "error",
                });
            } else if (resp.data.status === "success") {

                reactLocalStorage.setObject("user", {
                    token: resp.data.token,
                    id:resp.data.user.id,
                    first_name: resp.data.user.first_name,
                    last_name: resp.data.user.last_name
                });

                Swal.fire({
                    title: "login successfully...",
                    text: "Go to blog page.",
                    icon: "success",
                }).then(()=>{
                    setData({...data,redirects:"/blogs"})
                })
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
        <section className="bg-gray-50 dark:bg-gray-900">
            {!data.redirects ? ("") : (<Navigate to={data.redirects} />)}
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
                          onSubmit={e => e.preventDefault()}
                        >
                            <div>
                                <label for="email"className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(e)=>{
                                    onChangeHandle(e)
                                    }} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enteryour@email.com"/>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(e)=>{
                                    onChangeHandle(e)
                                    }} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                            </div>
                            <button onClick={login} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don’t have an account yet? 
                                <Link to='/signup' href="#" className="font-medium  text-blue-600 hover:underline dark:text-blue-500">
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Login;
