import React from 'react'

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import Swal from "sweetalert2";


export default function Updatemodel({ setupdateButton }) {
	console.log(setupdateButton);
  	let [isOpen, setIsOpen] = useState(true);
  	const [val, setVal] = useState("");
	const user = reactLocalStorage.getObject("user")

  	function closeModal() {
    	setIsOpen(false);
  	}

	function openModal() {
		setIsOpen(true);
	}

	const onChangeHandle=(e)=>{
		setVal({...val,[e.target.name]:e.target.value})
	}

	function updateBlog(e) {	
		console.log("yes create blog is working......");
		let title = val.title.trim()
		let description = val.description.trim()
	 	let bodyData = {title,description}
	
		if(title.length === 0 || description.length === 0)return alert("please create valid blog....")
		
		axios
		.post("http://localhost:5050/createPost", bodyData, {
		  headers: {
			"Content-Type": "application/json",
			"token": user.token,
		  },
		})
		.then((resp) => {
		  console.log(resp);
		  if (resp.data.status == "error") {
			Swal.fire({
				title: "Error!",
				text: resp.data.message,
				icon: "error",
			});
		  } else if (resp.data.status == "success") {
			Swal.fire({
				title: "Post Created!",
				text: "Go to blog page.",
			  	icon: "success",
			});
			closeModal()
			window.location.reload()
		  }
		})
		.catch((err) => {
		  Swal.fire({
			title: "Error!",
			text: "Server error...",
			icon: "error",
		  });
		});

	}

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <div className="flex justify-between mb5">
                      <h1>Update Blog</h1>
                      <button
                        onClick={() => {
                          setupdateButton(false);
                        }}
                        className="text-2xl px-1.5 pt-1  hover:bg-red-700 rounded-full hover:text-white"
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </div>

                    <label for="title" class="block mb-2 text-sm font-medium ">
                      Title
                    </label>
                    <input
						onChange={(e)=>{onChangeHandle(e)}}
                      	type="text"
                      	id="title"
                      	name="title"
                      	class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-900 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      	placeholder="John"
                      	required
                    />

                    <label
                      for="message"
                      class="block mb-2 text-sm font-medium mt-1"
                    >
                      Description
                    </label>
                    <textarea
						onChange={(e)=>{onChangeHandle(e)}}
                      	id="description"
						name="description"
						rows="4"
						class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-300 dark:border-gray-600 dark:placeholder-gray-900 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Write your descriptions....."
                    ></textarea>
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
					  onClick={updateBlog}
					  className="uppercase inline-flex justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setupdateButton(false);
                      }}
                      className="ml-1 uppercase inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Cancle
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
