import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"

import Home from "./pages/Home"
import FrequentlyAskedQuestions from "./pages/FrequentlyAskedQuestions"
import TermsOfService from "./pages/TermsOfService"
import PrivacyPolicy from "./pages/PrivacyPolicy"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/frequentlyaskedquestions" element={<FrequentlyAskedQuestions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}