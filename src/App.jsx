import { Header } from "./components/Header/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Post } from "./components/Post/Post";

import "./global.css";
import styles from "./App.module.css";

const posts = [
  {
    id: 1,
    author: {
      avatarUrl:
        "https://pbs.twimg.com/profile_images/1032826720267776000/_4IGzSK5_400x400.jpg",
      name: "Laura Barg",
      role: "Software Engineer",
    },
    content: [
      {
        type: "paragraph",
        content: "Howdy!",
      },
      {
        type: "paragraph",
        content: "Check out this cool videogame I'm playing right now!",
      },
      {
        type: "link",
        content:
          "https://www.youtube.com/watch?v=qLZenOn7WUo&pp=ygUSZWxkZW4gcmluZyB0cmFpbGVy",
      },
    ],
    publishedAt: new Date("2024-06-17 12:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://i1.sndcdn.com/artworks-GQNI0zq5klnkhdtr-bZP4vQ-t500x500.jpg",
      name: "GhostFace",
      role: "Halloween Enthusiast",
    },
    content: [
      {
        type: "paragraph",
        content: "Waaaaazzaaaaaaahhh!",
      },
      {
        type: "paragraph",
        content: "Check out this cool videogame I'm playing right now!",
      },
      {
        type: "link",
        content: "https://www.youtube.com/watch?v=DF_MRhPTO78",
      },
    ],
    publishedAt: new Date("2024-06-16 12:00:00"),
  },
];

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />
          ))}
        </main>
      </div>
    </>
  );
}
