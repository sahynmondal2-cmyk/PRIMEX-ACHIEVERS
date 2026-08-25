import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import MockTestInstructions from './pages/MockTest/MockTestInstructions';
import MockTestInterface from './pages/MockTest/MockTestInterface';
import MockTestResult from './pages/MockTest/MockTestResult';
import Checkout from './pages/Checkout/Checkout';
import PaymentSuccess from './pages/Checkout/PaymentSuccess';
import StudentDashboard from './pages/StudentDashboard/Dashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ScrollToTop from './components/utils/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            {/* Mock Test Routes */}
            <Route path="/mock-test/:id" element={<MockTestInstructions />} />
            <Route path="/mock-test/:id/take" element={<MockTestInterface />} />
            <Route path="/mock-test/:id/result" element={<MockTestResult />} />
            
            {/* Student Dashboard */}
            <Route path="/dashboard/*" element={<StudentDashboard />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
