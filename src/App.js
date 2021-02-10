import React, { useEffect } from 'react';
import './App.css';
import "ui-neumorphism/dist/index.css"
import { Route } from "react-router-dom";
import Login from './components/pages/container/Login';
import Register from './components/pages/container/Register';
import "firebase/auth";
import firebase from "./utils/firebase";
import Profile from './components/pages/container/Profile';
import { AnimatedSwitch } from 'react-router-transition';
import Error404 from './components/pages/container/Error404';
import { useRecoilState } from 'recoil';
import { user_app } from './recoil/user';
import Note from './components/pages/container/Note';

function App() {

	const [user, setUser] = useRecoilState(user_app)
	
	useEffect(() => {
		// detectar si el estado del usuario ha cambiado
		firebase.auth().onAuthStateChanged( (response) => {
		  
			if (response) {
				setUser({
					uid: response.uid,
					isAnonymous: response.isAnonymous,
					name: '',
				  });
			} else setUser(null)
	} )
	
  }, [setUser])
	
  	if (user === undefined) return null;

  return (
		<AnimatedSwitch
		atEnter={{ opacity: 0 }}
		atLeave={{ opacity: 0 }}
		atActive={{ opacity: 1 }}
		className="switch-wrapper"
		>
			<Route exact path='/' component={()=> <Profile/>} />
			<Route exact path='/note/:id' component={()=> <Note/>} />
			<Route exact path='/login' component={() => <Login/>}/>
			<Route exact path='/register' component={() => <Register/>}/>
			<Route parth="*" component={() => <Error404/> } />
		</AnimatedSwitch>
  );
}

export default App;
