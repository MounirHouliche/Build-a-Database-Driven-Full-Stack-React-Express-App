import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  return <h2>Welcome to Mini Blog 📰</h2>;
}

function Posts() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await fetch("https://build-a-database-driven-full-stack-react-m2yi.onrender.com/");
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>All Posts</h2>
      {posts.map((p) => (
        <div key={p.id} className="post-card">
          <h3>{p.title}</h3>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setTitle("");
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link> |{" "}
        <Link to="/new">New Post</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/new" element={<NewPost />} />
      </Routes>
    </div>
  );
}
