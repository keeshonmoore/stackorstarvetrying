import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Contact from './pages/Contact.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import './index.css'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background font-custom flex flex-col">
      <ScrollToTop />
      <main className="flex-grow">{children}</main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/shop" element={<Layout><Shop /></Layout>} />
        <Route path="/shop/:productId" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/timeline" element={<Layout><div className="min-h-screen bg-background font-custom"><h2 className="text-3xl text-foreground italic text-center py-16">Timeline Page (Placeholder)</h2></div></Layout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)