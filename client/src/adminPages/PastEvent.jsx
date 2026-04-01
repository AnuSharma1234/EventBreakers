import React, { useEffect, useState } from 'react'
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';

const PastEvent = () => {
  const { token } = useAuth()
  const [pastEvents, setPastEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:8000/event', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) {
          setPastEvents(res.data.allEvents.filter(e => !e.isLive || e.isFull))
        }
      } catch (error) {
        console.error('Error:', error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [token])

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-cyan-400 mb-2">Past Events</h1>
        <p className="text-gray-400">Browse through our previously hosted events</p>
      </header>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : pastEvents.length === 0 ? (
        <p className="text-gray-400">No past events</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {pastEvents.map(event => (
            <div key={event._id} className="bg-[#0B1121] rounded-xl overflow-hidden border border-gray-800">
              <div className="relative h-48 bg-gray-800">
                {event.eventBanner && (
                  <img src={event.eventBanner} alt={event.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                    {event.isFull ? 'Full' : 'Closed'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{event.otherDesc}</p>

                <div className="space-y-3 mb-6">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PastEvent