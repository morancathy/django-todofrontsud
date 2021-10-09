import React, { useState } from "react";

const Form = ({ initialTodo, handleSubmit, buttonLabel, history }) => {
  const [formData, setFormData] = useState(initialTodo);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  //should just use name or id. Beacuse not every value that
  //you pass to react element will get passed to the DOM
  //point is to keep state and value in sync with each other, controlled form

const handleSubmission = event => {
   event.preventDefault();  //prevent form refresh
   handleSubmit(formData); //pass state variable to handleSubmit prop function
   history.push('/')    //push user back to main page     we dont have to 'wait' for handlesubmission to finish to push to another page
  };
  //we are passing handleSubmit as a prop and putting in this function bc we want form to be dynamitc
  //...we have to tell handleSubmit what to do is it create or update

  return (
    <form onSubmit={handleSubmission}>
    <input
      type="text"
      name="subject"
      onChange={handleChange}
      value={formData.subject}
    />
    <input
      type="text"
      name="details"
      onChange={handleChange}
      value={formData.details}
    />
    <input type="submit" value={buttonLabel} />
    </form>
  )
};

export default Form;
//*this makes it a controlled form, equal to handleChange e.target.value */}
 //*this makes it a controlled form, equal to handleChange e.target.value */}
