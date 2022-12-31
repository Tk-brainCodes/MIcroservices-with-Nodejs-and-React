import React, { useEffect, useState } from "react";
import CommentCreate from "../../components/CommentCreate";
import CommentList from "../../components/CommentList";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    try {
      const response = await axios.get("http://posts.com/posts");
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("error");
      return error;
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  interface PostTypes {
    id: string | null;
    title: string | null;
  }
  [];

  const renderedPosts = Object.values(posts).map((post: any) => {
    return (
      <div key={post.id} className='post_container'>
        <h3>{post.title}</h3>
        <CommentList comments={post.comments} />
        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return (
    <div>
      <h1>PostList</h1>
      {renderedPosts}
    </div>
  );
};

export default PostList;
