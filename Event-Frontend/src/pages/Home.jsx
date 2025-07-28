import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Footer from "../components/Footer";
import HomePageImage from "../assets/HomePageImage.jpeg";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const controls = useAnimation();
  const scrollRef = useRef();
  const [events, setEvents] = useState([]);
  const [xPosition, setXPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Failed to fetch events", err));
  }, []);

  useEffect(() => {
    startScroll(xPosition);
  }, [xPosition]);

  const startScroll = (fromX = 0) => {
    const totalWidth = scrollRef.current?.scrollWidth || 2000;

    controls.start({
      x: [fromX, -totalWidth],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const stopScroll = () => {
    controls.stop();
    const computedStyle = window.getComputedStyle(scrollRef.current);
    const matrix = new WebKitCSSMatrix(computedStyle.transform);
    setXPosition(matrix.m41); 
    setIsPaused(true);
  };

  const resumeScroll = () => {
    if (isPaused) {
      startScroll(xPosition);
      setIsPaused(false);
    }
  };

  const handleEventClick = (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to view event details.");
      navigate("/login");
    } else {
      navigate(`/events/${id}`);
    }
  };

  const goToRegister = () => navigate("/register");
  const goToLogin = () => navigate("/login");

  return (
    <div>
      <img src={HomePageImage} alt="HomePageImageBackground" className="custom-image" />


      <div
        className="h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-white px-4"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?event,conference')",
        }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl italic font-extrabold text-center bg-gradient-to-r from-fuchsia-200 to-gray-800 text-transparent bg-clip-text mb-6 tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          Welcome to EventHub
        </motion.h1>

        <p className="text-lg text-gray-700 md:text-xl mb-2 text-center max-w-xl">
          Organize, manage, and promote your events effortlessly.
        </p>
        <p className="text-lg text-gray-700 md:text-xl mb-4 text-center max-w-xl">
          Book Your Appointment Today..!!
        </p>

        <div
          className="w-full overflow-hidden py-4"
          onMouseEnter={stopScroll}
          onMouseLeave={resumeScroll}
        >
          <motion.div
            ref={scrollRef}
            className="flex whitespace-nowrap"
            animate={controls}
            style={{ willChange: "transform" }}
          >
            {events.concat(events).map((event, index) => (
              <div
                key={index}
                onClick={() => handleEventClick(event.id)}
                className="cursor-pointer bg-white/90 border border-blue-300 mx-4 px-8 py-4 rounded-xl min-w-[300px] shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300"
              >
                <h4 className="text-blue-800 font-semibold text-lg text-center">
                  {event.title}
                </h4>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="bg-white py-10 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold italic mb-4 text-blue-600">Who We Are</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          We are passionate about helping you manage your events with ease.
          Whether it's a conference, concert, or community meetup — EventHub
          provides all the tools you need to succeed.
        </p>
      </motion.div>

      <div className="py-10 bg-gray-100">
        <h2 className="text-3xl text-blue-600 font-bold italic text-center mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-20">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={goToRegister}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Easy Registration</h3>
            <p className="text-gray-600">Register for events with just a few clicks.</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={goToLogin}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Secure Login</h3>
            <p className="text-gray-600">Your credentials are safe & encrypted.</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Manage Events</h3>
            <p className="text-gray-600">Track and manage events in one place.</p>
          </motion.div>
        </div>
      </div>

      <div className="bg-white py-10 px-6 text-center">
        <h2 className="text-3xl font-bold italic mb-4 text-blue-600">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-6">
          We'd love to hear from you! Reach out to us with any questions or feedback.
        </p>

        <div className="text-left bg-gray-50 border border-blue-100 shadow-md p-6 rounded-lg max-w-md mx-auto">
          <p className="text-gray-800 font-semibold mb-2">
            📞 Mobile: <span className="font-normal">+91 7310****50</span>
          </p>
          <p className="text-gray-800 font-semibold">
            📧 Email: <span className="font-normal">contact@eventhub.com</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
