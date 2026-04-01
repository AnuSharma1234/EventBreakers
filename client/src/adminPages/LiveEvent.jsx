import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../provider/authProvider'
import { Calendar , Clock , MapPin , Users ,Pen , Ban ,X , ArrowLeft } from 'lucide-react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const LiveEventCard = () => {
    const { event_id } = useParams()
    const navigate = useNavigate()
    const { token } = useAuth()
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/event/${event_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.data.success) {
                    setEvent(res.data.event)
                }
            } catch (error) {
                console.error('Error:', error.message)
                toast.error('Failed to load event')
            } finally {
                setLoading(false)
            }
        }
        if (event_id) fetchEvent()
        else setLoading(false)
    }, [event_id, token])

    const handleStopRegistrations = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/event/stop/${event_id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                toast.success('Registrations stopped')
                setEvent({ ...event, isFull: true })
            }
        } catch (error) {
            toast.error('Failed to stop registrations')
        }
    }

    const handleCloseEvent = async () => {
        try {
            const res = await axios.put(`http://localhost:8000/event/close/${event_id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                toast.success('Event closed')
                setEvent({ ...event, isLive: false })
            }
        } catch (error) {
            toast.error('Failed to close event')
        }
    }

    if (loading) {
        return (
            <div className="bg-[#0B1121] min-h-screen flex items-center justify-center">
                <p className="text-gray-400">Loading event...</p>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="bg-[#0B1121] min-h-screen flex flex-col items-center justify-center">
                <p className="text-gray-400 mb-4">Event not found</p>
                <Link to="/admin" className="text-cyan-500 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
            </div>
        )
    }

    return (
      <div className="bg-[#0B1121] rounded-2xl overflow-hidden border border-gray-800 min-h-screen p-6">
        <Link to="/admin" className="flex items-center gap-2 text-cyan-500 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="relative border border-zinc-600 rounded-xl overflow-hidden">
          <div className="relative h-[300px] bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute top-4 left-4">
              {event.isLive && !event.isFull ? (
                  <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">LIVE NOW</span>
              ) : event.isFull ? (
                  <span className="bg-yellow-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">FULL</span>
              ) : (
                  <span className="bg-gray-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">CLOSED</span>
              )}
            </div>
            {event.eventBanner && (
                <img src={event.eventBanner} alt={event.title} className="w-full h-full object-cover" />
            )}
          </div>

          <div className="p-6 border bg-[#0B1121]">
            <h2 className="text-2xl font-bold text-white mb-3">{event.title}</h2>
            <p className="text-gray-400 mb-6">{event.otherDesc}</p>

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

            <div className="flex justify-between">
                <div className="flex gap-3">
                <Link to={`/admin/edit/${event_id}`}>
                    <button className="bg-cyan-500 hover:bg-cyan-600 flex items-center border border-white text-white px-4 py-2 rounded-lg cursor-pointer text-md font-bold">
                    <Pen className='size-5 mr-1'/>
                    Edit Event
                    </button>
                </Link>
                {event.isLive && !event.isFull && (
                    <button onClick={handleStopRegistrations} className="border border-white text-white flex items-center bg-yellow-600 cursor-pointer px-4 py-2 rounded-lg text-md font-bold">
                    <Ban className='size-5 mr-1'/>
                    Stop Registrations
                    </button>
                )}
                </div>
                {event.isLive && (
                    <button onClick={handleCloseEvent} className="border border-white text-white bg-red-500 cursor-pointer px-4 py-2 rounded-lg text-md font-bold flex items-center">
                    <X className='size-5 mr-1'/>
                    Close Event
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
    )
}

export default LiveEventCard