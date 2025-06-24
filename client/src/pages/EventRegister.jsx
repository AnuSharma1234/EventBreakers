import React from "react";
import { Calendar, Clock, MapPin, Users, Star, Link } from "lucide-react";
import Navbar from '../components/Navbar.jsx'

const EventRegister = () => {
  return (
    <div className="min-h-screen bg-black">
        <Navbar/> 
      <div className="container mx-auto px-8 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            Hacksphere 3.0
          </h1>
          <p className="text-gray-400">
            8 Hour hackathon hosted by the club codebreakers
          </p>
       </header>

        <div className="grid grid-cols-2 gap-8">
          {/* Event Details Section */}
          <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Event Details
            </h2>

            <div className="space-y-6">
              {/* Event Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">
                    Saturday, March 15, 2024
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                  <div>
                    <div className="text-gray-300">
                      San Francisco Convention Center
                    </div>
                    <div className="text-sm text-gray-400">
                      747 Howard St, San Francisco, CA 94103
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">
                    Limited to 500 attendees
                  </span>
                </div>
              </div>

              {/* What to Expect */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">
                  About Event
                </h3>
                <ul className="space-y-3">
                  {[
                    "Keynote speeches from tech industry leaders",
                    "Interactive workshops on AI, blockchain, and cloud computing",
                    "Networking sessions with fellow professionals",
                    "Startup pitch competition with $50K prize",
                    "Complimentary lunch and refreshments",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-300"
                    >
                      <Star className="w-4 h-4 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Register Now</h2>
            <p className="text-gray-400 mb-8">
                Secure a spot for yourself
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Other form fields */}
              {[
                {
                  label: "Email Address",
                  type: "email",
                  placeholder: "leader@email.com",
                },
                {
                  label: "Teamate 1 Email",
                  type: "email",
                  placeholder: "member@email.com",
                },
                {
                  label: "Teamate 2 Email",
                  type: "email",
                  placeholder: "member@email.com",
                },
                {
                  label: "Teamate 3 Email",
                  type: "email",
                  placeholder: "member@email.com",
                },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-300 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-300 mb-2">
                  Year of studying
                </label>
                <select className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500">
                  <option value='1'>1st Year</option>
                  <option value='2'>2nd Year</option>
                </select>
              </div>
              <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium transition-colors">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
