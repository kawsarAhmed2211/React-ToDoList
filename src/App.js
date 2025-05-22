import React from 'react';
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from
'react-router-dom'
import ToDoList from './components/ToDoList';


// function App() {
//   return (
//       <>
//       <Router>
//         <header className="App-header">
//           <h1>KKKK</h1>
//           <Navbar/>
//         </header>
//         <Routes>
//           <Route path = '/' exact></Route>
//         </Routes>
//         </Router>
//       </>

//   );
// }

function App(){
  return(
    <>
    <ToDoList />
    </>
  );
}

export default App;
