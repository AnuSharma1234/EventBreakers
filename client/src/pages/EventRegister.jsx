import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft } from "lucide-react";
import Navbar from '../components/Navbar.jsx'
import axios from "axios";
import { useAuth } from "../provider/authProvider";
import { toast } from "react-toastify";

const EventRegister = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const eventId = searchParams.get('eventId');
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderEmail: "",
    year: "",
    teamMembers: []
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/event/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setEvent(res.data.event);
        }
      } catch (error) {
        console.error('Error fetching event:', error.message);
        toast.error('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    if (eventId) fetchEvent();
    else setLoading(false);
  }, [eventId, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = { name: "", email: value };
    setFormData({ ...formData, teamMembers: newMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        teamName: formData.teamName,
        leaderName: formData.leaderName,
        leaderEmail: formData.leaderEmail,
        year: parseInt(formData.year),
        teamMembers: formData.teamMembers.filter(m => m.email),
        event: eventId
      };
      
      const res = await axios.post('http://localhost:8000/register', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.success) {
        toast.success('Successfully registered for the event!');
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-400">Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <p className="text-gray-400 mb-4">No event selected</p>
          <button onClick={() => navigate('/')} className="text-cyan-500 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Go back to events
          </button>
        </div>
      </div>
    );
  }

  const maxMembers = event.maxTeamSize - 1;
  const memberInputs = Array.from({ length: maxMembers }, (_, i) => i);

  return (
    <div className="min-h-screen bg-black">
        <Navbar/> 
      <div className="container mx-auto px-8 py-12">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-cyan-500 mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Events
        </button>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            {event.title}
          </h1>
          <p className="text-gray-400">
            {event.otherDesc || 'Register for this event'}
          </p>
         </header>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Event Details
            </h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">{event.day}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                  <div>
                    <div className="text-gray-300">{event.venue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300">
                    Team size: {event.minTeamSize}-{event.maxTeamSize} members
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-white mb-2">Register Now</h2>
            <p className="text-gray-400 mb-8">Secure a spot for your team</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Team Name</label>
                <input
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  placeholder="Enter team name"
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Leader Name</label>
                <input
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleChange}
                  required
                  placeholder="Team leader name"
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Leader Email</label>
                <input
                  name="leaderEmail"
                  type="email"
                  value={formData.leaderEmail}
                  onChange={handleChange}
                  required
                  placeholder="leader@email.com"
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Year of studying</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>

              {memberInputs.map((_, idx) => (
                <div key={idx}>
                  <label className="block text-gray-300 mb-2">Team Member {idx + 1} Email</label>
                  <input
                    type="email"
                    placeholder={`member${idx + 1}@email.com`}
                    onChange={(e) => handleMemberChange(idx, e.target.value)}
                    className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              ))}

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {submitting ? 'Registering...' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;