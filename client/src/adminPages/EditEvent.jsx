import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../provider/authProvider'
import { Upload, ArrowLeft } from 'lucide-react'
import axios from 'axios'

const EditEvent = () => {
  const { event_id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  
  const uploadImageRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('')

  const [eventForm, setEventForm] = useState({
    title: '',
    eventBanner: null,
    date: '',
    day: '',
    venue: '',
    minTeamSize: '',
    maxTeamSize: '',
    otherDesc: '',
  })

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/event/${event_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (res.data.success) {
          const event = res.data.event
          setEventForm({
            title: event.title || '',
            eventBanner: event.eventBanner || null,
            date: event.date || '',
            day: event.day || '',
            venue: event.venue || '',
            minTeamSize: event.minTeamSize || '',
            maxTeamSize: event.maxTeamSize || '',
            otherDesc: event.otherDesc || '',
          })
          if (event.eventBanner) {
            setImage(event.eventBanner)
          }
        }
      } catch (error) {
        console.error('Error:', error.message)
        toast.error('Failed to load event')
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [event_id, token])

  const triggerUpload = () => uploadImageRef.current.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    setEventForm({ ...eventForm, eventBanner: file })
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const handleError = (error) => toast.error(error, { position: 'top-right' })
  const handleSuccess = (message) => toast.success(message, { position: 'top-right' })

  const validateForm = () => {
    const missingFields = []
    if (!eventForm.title) missingFields.push('Event Title')
    if (!eventForm.date) missingFields.push('Date')
    if (!eventForm.venue) missingFields.push('Venue')
    if (!eventForm.day) missingFields.push('Day')
    if (!eventForm.minTeamSize) missingFields.push('Min team size')
    if (!eventForm.maxTeamSize) missingFields.push('Max Team Size')

    if (missingFields.length > 0) {
      handleError(`Please fill in: ${missingFields.join(', ')}`)
      return false
    }
    return true
  }

  const handleUpdateEvent = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setSaving(true)
    try {
      const formData = new FormData()
      Object.keys(eventForm).forEach((key) => {
        formData.append(key, eventForm[key])
      })

      const response = await axios.put(`http://localhost:8000/event/update/${event_id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (response.data.success) {
        handleSuccess('Event updated successfully')
        setTimeout(() => navigate('/admin'), 1500)
      }
    } catch (error) {
      console.error('Error:', error.message)
      handleError('Failed to update event')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <p className="text-gray-400">Loading event...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8">
      <Link to="/admin" className="flex items-center gap-2 text-cyan-500 mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Edit Event</h1>
        <p className="text-gray-400">Update the event details below</p>
      </header>

      <div className="max-w-3xl mx-auto">
        <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
          <form className="space-y-6" onSubmit={handleUpdateEvent}>
            <div>
              <label className="block text-gray-300 mb-2">Event Banner</label>
              <div 
                className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer"
                onClick={triggerUpload}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={uploadImageRef}
                  onChange={handleFileChange}
                />
                {image ? (
                  <img src={image} className="h-full rounded-lg mx-auto w-full max-h-48 object-contain" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-6 h-6 text-cyan-400 mb-2" />
                    <p className="text-cyan-400">Click to upload banner</p>
                    <p className="text-gray-400 text-sm">{fileName || 'PNG, JPG, GIF up to 10MB'}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Event Title <span className="text-cyan-400">*</span></label>
              <input
                type="text"
                required
                value={eventForm.title}
                onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Event Description</label>
              <textarea
                rows="4"
                value={eventForm.otherDesc}
                onChange={(e) => setEventForm({ ...eventForm, otherDesc: e.target.value })}
                className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Event Date <span className="text-cyan-400">*</span></label>
                <input
                  type="date"
                  required
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Event Day</label>
                <select
                  value={eventForm.day}
                  onChange={(e) => setEventForm({ ...eventForm, day: e.target.value })}
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Venue <span className="text-cyan-400">*</span></label>
              <input
                type="text"
                value={eventForm.venue}
                onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 mb-2">Min Team Size</label>
                <input
                  type="number"
                  value={eventForm.minTeamSize}
                  onChange={(e) => setEventForm({ ...eventForm, minTeamSize: e.target.value })}
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Max Team Size</label>
                <input
                  type="number"
                  value={eventForm.maxTeamSize}
                  onChange={(e) => setEventForm({ ...eventForm, maxTeamSize: e.target.value })}
                  className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Update Event'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default EditEvent