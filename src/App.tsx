import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post, PostType } from "./components/Post"

import "./global.css"
import styles from './App.module.css'

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/eduardomuramoto.png',
      name: 'Eduardo Muramoto',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Hey Guys!! 👋' },
      { type: 'paragraph', content: 'Just read a great web dev book🚀' },
      { type: 'link', content: 'www.google.com' },
    ],
    publishedAt: new Date('2024-02-14 20:00:00'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/eduardomuramoto.png',
      name: 'Eduardo Muramoto',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Hey Guys!! 👋' },
      { type: 'paragraph', content: 'Just read a great web dev book🚀' },
      { type: 'link', content: 'www.google.com' },
        ],
    publishedAt: new Date('2024-02-14 20:00:00'),
  },
];


export function App() {
  return (
    <div>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
        {posts.map(post => {
            return (
              <Post
                key={post.id}
                post={post}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}


