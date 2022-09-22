import './App.css';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Blog from './components/Blogs';
import Error404 from './components/Error404';

// import Model from './components/Model';


function App() {


	return (
	<div className="App">
		<Router>
			<Routes>
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/blogs" element={<Blog />} />	

				<Route exact path="*" element={<Error404 />} />	
				{/* <Route exact path="/model" element={<Model />} /> */}
				{/* <Route exact path="/updatemodel/:id" element={<Updatemodel/>}/> */}
			</Routes>
        </Router>
    </div>
  );
}

export default App;