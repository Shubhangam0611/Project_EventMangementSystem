import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white py-12 px-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-10 border border-blue-200"
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-6 tracking-tight"
          whileHover={{ scale: 1.05 }}
        >
          Welcome to EventHub
        </motion.h1>

        <div className="w-20 h-1 bg-blue-500 mx-auto mb-10 rounded-full"></div>

        <motion.section
          className="mb-10"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">What is EventHub?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            <strong>EventHub</strong> is your one-stop platform for discovering, registering, and managing events effortlessly.
            Whether you're a student, organizer, or admin — we make event participation smoother, smarter, and faster.
          </p>
        </motion.section>


        <motion.section
          className="mb-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Why Choose EventHub?</h2>
          <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
            <li>🚀 Instantly register and track your events</li>
            <li>📱 Fully responsive on mobile, tablet & desktop</li>
            <li>🔒 Secure login and role-based access</li>
            <li>⏱️ Auto-cleans old approved/rejected requests</li>
            <li>📊 Clean dashboard for Admins & Users</li>
          </ul>
        </motion.section>

        <motion.section
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <span className="font-semibold text-blue-600">EventHub</span>, we imagine a future where events are
            accessible and manageable in just a few clicks. No spreadsheets. No clutter.
            Just seamless participation and smart organization.
          </p>
        </motion.section>

        {/* Box */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-6 rounded-xl shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-2">Ready to explore?</h3>
          <p className="text-lg mb-4">Jump into the EventHub and never miss out again!</p>
          <a
            href="/events"
            className="inline-block px-6 py-2 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-100 transition"
          >
            Browse Events
          </a>
        </motion.div>



        <div className="mt-10 text-center text-sm text-gray-900">
          © {new Date().getFullYear()} <span className="font-semibold">EventHub</span>. Made with ❤️ for every event.
        </div>
      </motion.div>
    </div>
  );
  
}

export default About;
