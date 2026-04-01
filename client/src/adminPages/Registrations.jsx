import React, { useEffect, useState } from 'react'
import { Users, Trash2 } from 'lucide-react';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Registrations = () => {
  const { token } = useAuth()
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const res = await axios.get('http://localhost:8000/register', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setRegistrations(res.data.data)
      }
    } catch (error) {
      console.error('Error:', error.message)
      toast.error('Failed to fetch registrations')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this registration?')) return
    try {
      const res = await axios.delete(`http://localhost:8000/register/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        toast.success('Registration deleted')
        setRegistrations(registrations.filter(r => r._id !== id))
      }
    } catch (error) {
      toast.error('Failed to delete registration')
    }
  }

  const filteredRegs = filter === 'all' 
    ? registrations 
    : registrations.filter(r => r.year === parseInt(filter))

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Registration Management</h1>
        <p className="text-gray-400">Manage event registrations for teams</p>
      </header>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#0B1121] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Users className="w-4 h-4" />
            <span>Total Teams</span>
          </div>
          <div className="text-3xl font-bold text-white">{registrations.length}</div>
        </div>
      </div>

      <div className="bg-[#0B1121] rounded-xl border border-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white mb-2">All Registrations</h2>
        <p className="text-gray-400 mb-6">Manage and review team registrations</p>

        <div className="flex gap-2 mb-6">
          {['all', '1', '2', '3', '4'].map(y => (
            <button
              key={y}
              onClick={() => setFilter(y)}
              className={`px-4 py-2 rounded-lg cursor-pointer text-sm ${
                filter === y ? 'bg-cyan-500 text-white' : 'text-gray-400 hover:bg-[#1A2234]'
              }`}
            >
              {y === 'all' ? 'All Years' : `${y}st Year`}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filteredRegs.length === 0 ? (
          <p className="text-gray-400">No registrations found</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-800">
                <th className="text-left pb-4">Team</th>
                <th className="text-left pb-4">Leader</th>
                <th className="text-left pb-4">Year</th>
                <th className="text-left pb-4">Members</th>
                <th className="text-left pb-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegs.map((reg) => (
                <tr key={reg._id} className="border-b border-gray-800">
                  <td className="py-4">
                    <span className="text-white">{reg.teamName}</span>
                  </td>
                  <td className="py-4">
                    <div>
                      <div className="text-white">{reg.leaderName}</div>
                      <div className="text-gray-400 text-sm">{reg.leaderEmail}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-300">{reg.year}{reg.year === 1 ? 'st' : reg.year === 2 ? 'nd' : reg.year === 3 ? 'rd' : 'th'} Year</span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-300">{reg.teamMembers?.length || 0} members</span>
                  </td>
                  <td className="py-4">
                    <button 
                      onClick={() => handleDelete(reg._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Registrations