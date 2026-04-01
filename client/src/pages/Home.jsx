import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate()
    const { isAdmin, token } = useAuth()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin')
        }
    }, [isAdmin, navigate])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:8000/event', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success) {
                    setEvents(res.data.allEvents.filter(e => e.isLive && !e.isFull))
                }
            } catch (error) {
                console.error('Error fetching events:', error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchEvents()
    }, [token])

    const liveEvents = events.filter(e => e.isLive && !e.isFull)
    const pastEvents = events.filter(e => !e.isLive || e.isFull)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex bg-black justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">
          <Link to='/' className="cursor-pointer text-2xl font-semibold">
            <span className="text-white">Event</span>
            <span className="text-cyan-500">Breakers</span>
          </Link>
          <div className="space-x-4">
            <Link to='/'>
              <button className="bg-cyan-500 font-bold px-4 py-1 rounded-md text-sm text-white cursor-pointer hover:bg-cyan-600">
                Events
              </button>
            </Link>
            <Link to='/logout'>
              <button className="text-cyan-500 bg-amber-50 font-bold px-4 py-1 rounded-md text-sm cursor-pointer hover:bg-cyan-600">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl">
        <div className="flex p-6 gap-6">
          <div className="flex-1">
            {loading ? (
                <div className="text-gray-400">Loading events...</div>
            ) : liveEvents.length > 0 ? (
                liveEvents.map(event => (
                    <div key={event._id} className="bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700">
                        <div className="relative">
                            <div className="relative h-[400px] bg-gradient-to-br from-gray-700 to-gray-900">
                                <div className="absolute top-4 left-4">
                                    <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        LIVE NOW
                                    </span>
                                </div>
                                {event.eventBanner && (
                                    <img src={event.eventBanner} alt={event.title} className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="p-6 bg-gray-800/90">
                                <h1 className="text-2xl font-bold text-white mb-3">{event.title}</h1>
                                <p className="text-gray-300 text-base mb-6 leading-relaxed">{event.otherDesc}</p>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Calendar className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm">{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Clock className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm">{event.day}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm">{event.venue}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <Users className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm">{event.minTeamSize}-{event.maxTeamSize} members</span>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Link to={`/register?eventId=${event._id}`}>
                                        <button className="bg-cyan-500 hover:bg-cyan-700 text-white px-5 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer">
                                            Register
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-400">No live events available</div>
            )}
          </div>

          <div className="w-72 shrink-0">
            <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-4">
              <h2 className="text-lg font-bold text-white mb-4">Past Events</h2>
              <div className="space-y-3">
                {pastEvents.length > 0 ? pastEvents.slice(0, 4).map((event, index) => (
                  <div key={index} className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-600">
                    <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                    <p className="text-gray-400 text-sm">{event.date}</p>
                  </div>
                )) : (
                    <p className="text-gray-400 text-sm">No past events</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
