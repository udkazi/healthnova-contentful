import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <ContentfulLivePreviewProvider
      locale="en-US"
      enableLiveUpdates={true}
      enableInspectorMode={true}
    >
    <>
      <Navbar />
      <HomePage />
      Kazi..
      
    </>
    </ContentfulLivePreviewProvider>
  )
}

export default App
