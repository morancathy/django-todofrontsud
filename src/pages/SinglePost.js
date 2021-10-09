import React from "react";
import { Link } from "react-router-dom";

//cant just make a get request....be carefull, dont want to make a bunch of API calls, will be
// infinite loop of rerendering....memory leak
//this way we will find what we fetched in the parent and find the id that way
//with react, everything is on the same page at same time anyway,,,you're just seeing whatyou want to seeing
//all requests are just other requests.  If you keep fetched data in its own page, then ok, but
//when fetching data in parent need to make sure kids arent doing stuff with it they cant


// destructuring the props needed to get our post, including router prop match
const SinglePost = ({ posts, match, edit, deleteTodo }) => {
    //id in sjango its good to parseInt, in mongo, prob not
    const id = parseInt(match.params.id); //get the id from url param
    const post = posts.find((post) => post.id === id);

    ////////////////////
    // Styles
    ///////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto",
  };

  return (
    <div style={div}>
      <h1>{post.subject}</h1>
      <h2>{post.details}</h2>
      <button onClick={event => edit(post)}>Edit This Todo</button>
      <button onClick={event => deleteTodo(post)}>Delete This Todo</button>
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SinglePost;
