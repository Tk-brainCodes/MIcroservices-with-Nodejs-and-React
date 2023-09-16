import React, { FormEventHandler, useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");


  //create post
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await axios.post("http://posts.com/posts/create", {
        title,
      });
    } catch (error) {
      console.error("you got an error!", error);
      return error;
    }
    setTitle("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='form_group'>
        <label>Title</label>
        <input
          value={title}
          onChange={handleChangeEvent}
          type='text'
          className='form_control'
        />
      </div>
      <button className='btn_submit'>Submit</button>
    </form>
  );
};

export default PostCreate;
