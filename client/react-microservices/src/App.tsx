import reactLogo from "./assets/react.svg";
import PostCreate from "./features/PostCreate/PostCreate";
import PostList from "./features/PostList/PostList";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <h1>Create Post</h1>
      <PostCreate />
      <br />
      <PostList />
    </div>
  );
}

export default App;
