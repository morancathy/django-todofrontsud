//createing state in this router/app component so we can pass it around to all other components

// Import All Our Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Switch, Link } from "react-router-dom";

function App(props) {
  ////////////////////
  // Style Objects
  ////////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto",
  };

  ///////////////
  // State & Other Variables
  ///////////////

  // Our Api Url
  const url = "https://cathy-hypatia-todo-api.herokuapp.com/todos/";  //dont forget the /todos/

  // State to Hold The List of Posts
    const [posts, setPosts] = useState([]);

    const nullTodo = {
      subject: '',
      details: ''
    }

    const [targetTodo, setTargetTodo] = useState(nullTodo)

  //////////////
  // Functions
  //////////////
  const getTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data.reverse());
    } catch(e){
      console.error(e)
    }
  };

  const addTodos = async (newTodo) => {
    try {
      const response = await fetch(url, { //dont need to 'const' but it is best practice, arthur doesnt like floating fetches
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
      //dont need to do const data because we are not useing the data/parsing the data and using it in our code
    }).then((data) => {
      return getTodos()
    })  //if want to implicently return, get rid of curly braces and return  for ex: }).then(_ => getTodos())

    } catch (error){
      console.error(error)
    }
      // finally {
        // getTodos();  //might fetch todo before finish creating, so do this after the TRY
      // window.location.assign('/'); //dont need to do this cause our form already redirects us
    // } //but putting something inpure in a finally block is not good...so use .then
  };
  // fetch returns a promise, and a promise always has two methods...then and catch
  //and tell promise to handle its own error
//.then  = taking a callback function...if promise is successfu, then do this
//if it fails, then do whatever catch says

// Function to select todo to edit
const getTargetTodo = (todo) => {
  setTargetTodo(todo);
  props.history.push("/edit");   //not reloading page, we are pushing to edit
};

// Function to edit todo on form submission
const updateTodo = async (todo) => {
  try {
    const response = await fetch(url + todo.id + '/', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(data => getTodos())
  }catch(e){
      console.error(e)
  }
}
// Function to delete todo on form submission
  const deleteTodo = async (todo) => {
    try {
      const response = await fetch(url + todo.id + "/", {
        method: "delete",
      }).then(data => getTodos())
    } catch (e) {
      console.error(e)
    }finally {
      window.location.assign('/')  //this helps us get around strick moe
    }
};
  //////////////
  // useEffects
  //////////////
  useEffect(() => {
    getTodos();
  }, []);

  /////////////////////
   // returned JSX
   /////////////////////
   return (
     <div>
     <h1 style={h1}>My Todo List</h1>
    <Link to="/new"><button style={button}>Create New Todo</button></Link>
       <Switch>
         <Route
           exact
           path="/"
           render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
         />
         <Route
           path="/post/:id"
           render={(routerProps) => (
             <SinglePost {...routerProps} posts={posts} edit={getTargetTodo} deleteTodo={deleteTodo}/>
           )}
         />
         <Route
           path="/new"
           render={(routerProps) =>(
             <Form
             {...routerProps}
             initialTodo={nullTodo}
             handleSubmit={addTodos}
             buttonLabel="Create Todo"
             />
           )}
         />
         <Route
           path="/edit"
           render={(routerProps) => (
             <Form
               {...routerProps}
               initialTodo={targetTodo}
               handleSubmit={updateTodo}
               buttonLabel="update todo"
             />
           )}
         />
       </Switch>
     </div>
   );
 }

 export default App;
