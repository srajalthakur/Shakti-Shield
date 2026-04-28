import React from 'react'
import HeroSection from './HeroSection'
import Footer from '../Footer'

function Home() {
  return (
    <div style={{ background: "#080810", minHeight: "100vh", width: "100%" }}>
      <HeroSection />
      <Footer />
    </div>
  )
}

export default Home