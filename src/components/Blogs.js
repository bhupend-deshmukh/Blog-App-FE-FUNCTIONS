import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Model from "./Model";
import Updatemodel from "./UpdateModel";

export default function Blog() {

  	const [Button, setbutton] = useState(false);
	const [updateButton,setupdateButton] = useState(false)
	const [data, setData] = useState([]);
	const [redirec, setRidirect] = useState({});

  	let user = reactLocalStorage.getObject("user");

  	useEffect(() => {

    	if (Object.keys(user).length === 0) {
      		setRidirect({ ...redirec, redirects: "/login" });
    	}

    	axios.get("http://localhost:5050/getAllpost", {
        	headers: {
          		"Content-Type": "application/json",
          		token: user.token,
        	},
      	})
      	.then((resp) => {
        	setData(resp.data.data);
      	}).catch((error) => {
        	console.log(error);
      	});
  	}, []);

  	const logOut = () => {
    	reactLocalStorage.clear();
    	setRidirect({ ...redirec, redirects: "/login" });
  	};

  	const deletePost = (e) => {
    	let post_id = e;							

	    axios.delete(`http://localhost:5050/deletePost/${post_id}`, {
			headers: {
				"Content-Type": "application/json",
				token: user.token,
			},
		})
		.then((resp) => {
			
			if (resp.data.status == "success") {
				let allPost = data
				const newArr = allPost.filter((ite)=>ite.id != post_id)
				setData(newArr)
			}
		})
		.catch((err) => {
			console.log(err);
		});
	};

	const updatePost = (e)=>{
		
		let post_id = e.target.id;
		const user = reactLocalStorage.getObject("user");
		
		axios
		.put(`http://localhost:5050/updatePost/${post_id}`, {
			headers: {
				"Content-Type": "application/json",
				token: user.token,
			},
		})
		.then((resp) => {
			console.log(resp.data);
			if (resp.data.status == "success") {
				window.location.reload();
			}
		})
		.catch((err) => {
			console.log(err);
		});
		  
	}

    return (
      <div>
        	<header className="fixed w-full z-10">
  		  	{Button ? <Model setbutton={setbutton} /> : ""}
			{updateButton ? <Updatemodel setupdateButton={setupdateButton} />:""}
          		<nav class="bg-white border-gray-200 px-4 lg:px-6 py-2 dark:bg-gray-800">
            		<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
              		<a href="https://flowbite.com" class="flex items-center">
                			<img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-8"alt="Flowbite Logo"/>
                			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Blog Apps</span>
              		</a>
  					<div class="flex items-center lg:order-2 ">
  						<button onClick={() => {setbutton(true);}} className="flex bg-slate-700 hover:bg-green-600 px-2 rounded-lg mr-2 ">
  							<span className="text-white mt-2 text-1xl mr-3">
  								<ion-icon name="add"></ion-icon>
  							</span>
                  			<h1 className="text-white mt-1"> Create Blog</h1>
                			</button>

  						<button onClick={logOut} className="text-white text-2xl  hover:bg-blue-700 rounded-full pt-1 px-1.5">
  							<ion-icon name="log-out"></ion-icon>
  						</button>
              		</div>
            		</div>
          		</nav>
      		</header>
        	<section class="text-gray-600 body-font">
          	{redirec.redirects ? <Navigate to={redirec.redirects}></Navigate> : ""}
          		<div class="container px-5 py-24 mx-auto">
            		<div class="flex flex-wrap -m-4">
              			{data.map((items) => {
  						let date = items.created_at.split("T")
  						console.log(items);
                			return (
                  		<div class="p-4 lg:w-1/3 md:w-1/2 sm:w-3/4 ">
                    		<div class="shadow-lg h-full bg-gray-300 bg-opacity-75 px-8 pt-6 pb-16 rounded-lg overflow-hidden text-center relative">
                      			<h1 class="title-font sm:text-2xl text-xl text-gray-900 mb-3 uppercase font-bold">
                        			{items.title}
  								</h1>
                      			<p class="leading-relaxed mb-3">
                        			{items.description}
  								</p>
								<div className="flex justify-between mt-10">
									<p className="text-black">{items.users.first_name} {items.users.last_name}</p>
									<p className="text-black">{date[0]}</p>
								</div>

								<div class="text-center leading-none flex absolute bottom-0 left-0 w-full pb-2 px-8 justify-between">
										<button className="text-2xl">
										<ion-icon name="heart"></ion-icon>
										</button>
									{user.id != items.user_id ? "":
										<div>
											<button onClick={()=>{setupdateButton(true)}} >
												<ion-icon  class=" px-1 py-1 rounded-full text-xl text-black hover:bg-blue-600 hover:text-white" name="create"></ion-icon>
											</button>
											<button onClick={()=>{deletePost(items.id)}} className="ml-2">
												<ion-icon class="px-1 py-1 rounded-full text-xl text-black hover:bg-red-700 hover:text-white" name="trash"></ion-icon>
											</button>
										</div>
									}
								</div>
                    		</div>
                  		</div>
                		);
              		})}
            		</div>
          		</div>
      		</section>
	  </div>
    );
}