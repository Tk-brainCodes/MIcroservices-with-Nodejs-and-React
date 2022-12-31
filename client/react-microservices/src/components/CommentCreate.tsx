import React, { ReactEventHandler, useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (event: any) => { 
    event.preventDefault();

    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        content,
      });
      setContent("");
    } catch (error) {
      console.error("an error");
      return error;
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>Enter new Comment</label>
        <input value={content} onChange={handleInputChange} type='text' />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
