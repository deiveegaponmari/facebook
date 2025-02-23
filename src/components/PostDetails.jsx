import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/${postId}`)
      .then(response => setPost(response.data))
      .catch(error => console.log(error));
  }, [postId]);

  return post ? (
    <div>
      <h2>{post.username}</h2>
      <p>{post.content}</p>
      {post.type === "image" ? <img src={post.media} alt="Post" /> : <video src={post.media} controls />}
    </div>
  ) : <p>Loading...</p>;
};

export default PostDetails;
