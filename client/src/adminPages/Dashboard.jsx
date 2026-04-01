import React, { useEffect, useState } from 'react'
import { Calendar , Users, TrendingUp } from 'lucide-react';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { token } = useAuth()
  const [stats, setStats] = useState({ liveEvent: null, registrations: 0, teams: 0, loading: true })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsRes = await axios.get('http://localhost:8000/event', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const regsRes = await axios.get('http://localhost:8000/register', {
          headers: { Authorization: `Bearer ${token}` }
        })
        
        const allEvents = eventsRes.data.allEvents || []
        const liveEvents = allEvents.filter(e => e.isLive && !e.isFull)
        const allRegs = regsRes.data.data || []
        
        setStats({
          liveEvent: liveEvents[0] || null,
          registrations: allRegs.length,
          teams: allRegs.length,
          loading: false
        })
      } catch (error) {
        console.error('Error fetching stats:', error.message)
        setStats(prev => ({ ...prev, loading: false }))
      }
    }
    fetchStats()
  }, [token])

  const StatCard = ({ stat }) => {
    const IconComponent = stat.icon;
    return (
      <div className="bg-[#0B1121] rounded-xl p-6 border border-zinc-500">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-2 rounded-lg ${stat.iconBg}`}>
            <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
          <h3 className="text-gray-300 text-md">{stat.title}</h3>
        </div>
        <div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
        </div>
      </div>
    );
  };

  const statsData = stats.loading ? [] : [
    {
      title: 'Live Event',
      value: stats.liveEvent?.title || 'None',
      icon: Calendar,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-500'
    },
    {
      title: 'Total Registrations',
      value: `${stats.registrations} Registrations`,
      icon: Users,
      iconBg: 'bg-cyan-500/10',
      iconColor: 'text-cyan-500'
    },
    {
      title: 'Total Teams',
      value: `${stats.teams} Teams`,
      icon: TrendingUp,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-500'
    },
  ];

  return (
    <div className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
        <p className="text-gray-400">Monitor your events and registrations</p>
      </header>

      {stats.loading ? (
        <p className="text-gray-400">Loading stats...</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {stats.liveEvent && (
            <div className="bg-[#0B1121] rounded-xl p-6 border border-zinc-500">
              <h2 className="text-xl font-bold text-white mb-4">Current Live Event</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium text-lg">{stats.liveEvent.title}</div>
                  <div className="text-gray-400">{stats.liveEvent.date} | {stats.liveEvent.venue}</div>
                </div>
                <Link to={`/admin/liveEvent/${stats.liveEvent._id}`} className="text-cyan-500 hover:underline">
                  View Details →
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard