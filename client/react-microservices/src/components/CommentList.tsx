import React, { useState, useEffect } from "react";

interface CommentType {
  id: string;
  content: string;
  postId: string;
}

type IComment = {
  comments: Array<CommentType>;
};

const CommentList = ({ comments }: IComment) => {
  let content: string;

  const returnCommentList = comments.map((post: any) => {
    if (post.status === "approved") {
      content = post.content;
    }
    if (post.status === "pending") {
      content = "This comment is awaiting moderation";
    }

    if (post.status === "rejected") {
      content = "This comment has been rejected";
    }

    return (
      <ul>
        <li>{content}</li>
      </ul>
    );
  });
  return <div>{returnCommentList}</div>;
};

export default CommentList;
