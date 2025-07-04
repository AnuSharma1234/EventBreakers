import React from 'react'
import { Calendar , Users , TrendingUp , Search ,MoreHorizontal } from 'lucide-react';

const Registrations = () =>{
  const dashboardData = {
    stats: [
      {
        title: 'Live Event',
        value: 'Hacksphere 3.0',
        icon: Calendar,
        iconBg: 'bg-blue-500/10',
        iconColor: 'text-blue-500'
      },
      {
        title: 'Total Registrations',
        value: '434 Registrations',
        icon: Users,
        iconBg: 'bg-cyan-500/10',
        iconColor: 'text-cyan-500'
      },
      {
        title: 'Total Teams',
        value: '84 Teams',
        icon: TrendingUp,
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-500'
      },
   ],
    recentRegistrations: [
      {
        name: 'John Doe',
        event: 'Tech Conference 2024',
        status: 'confirmed',
        statusColor: 'bg-cyan-500'
      },
      {
        name: 'Jane Smith',
        event: 'Tech Conference 2024',
        status: 'pending',
        statusColor: 'bg-yellow-500'
      },
      {
        name: 'Mike Johnson',
        event: 'Product Launch',
        status: 'confirmed',
        statusColor: 'bg-cyan-500'
      }
    ],
    upcomingEvents: [
      {
        name: 'John Doe',
        event: 'Tech Conference 2024',
        status: 'confirmed',
        statusColor: 'bg-cyan-500'
      },
      {
        name: 'Jane Smith',
        event: 'Tech Conference 2024',
        status: 'pending',
        statusColor: 'bg-yellow-500'
      },
   ],
   registrationData: {
    stats: {
      total: 4,
      approved: 2,
      pending: 1,
      rejected: 1
    },
    teams: [
      {
        id: 'CD',
        name: 'Code Crushers',
        leader: {
          name: 'Alex Johnson',
          email: 'alex.johnson@university.edu'
        },
        category: 'Web Development',
        members: {
          count: 3,
          list: 'Sarah Wilson, Mike Chen...'
        },
        date: '15/1/2024',
        status: 'Approved'
      },
      {
        id: 'DE',
        name: 'Debug Dynasty',
        leader: {
          name: 'Jessica Brown',
          email: 'jessica.brown@university.edu'
        },
        category: 'Mobile App',
        members: {
          count: 3,
          list: 'Tom Wilson, Lisa Garcia...'
        },
        date: '16/1/2024',
        status: 'Pending'
      },
      {
        id: 'BI',
        name: 'Binary Builders',
        leader: {
          name: 'David Martinez',
          email: 'david.martinez@university.edu'
        },
        category: 'AI/ML',
        members: {
          count: 3,
          list: 'Anna Taylor, Chris Anderson...'
        },
        date: '17/1/2024',
        status: 'Rejected'
      },
      {
        id: 'PI',
        name: 'Pixel Pirates',
        leader: {
          name: 'Sophie Turner',
          email: 'sophie.turner@university.edu'
        },
        category: 'Game Development',
        members: {
          count: 3,
          list: 'Jake Miller, Zoe Clark...'
        },
        date: '18/1/2024',
        status: 'Approved'
      }
    ]
  },
  pastEvents: [
    {
      id: 1,
      title: 'Tech Conference 2024',
      description: 'Annual technology conference featuring the latest innovations in AI, blockchain, and web development.',
      date: 'March 15, 2024',
      time: '9:00 AM - 6:00 PM',
      venue: 'Convention Center',
      attendance: {
        attended: 1250,
        capacity: 1500,
        rate: 83
      },
      isFeatured: true,
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Design Workshop',
      description: 'Interactive workshop on modern UI/UX design principles and best practices for digital products.',
      date: 'March 8, 2024',
      time: '2:00 PM - 5:00 PM',
      venue: 'Design Studio',
      attendance: {
         attended: 85,
        capacity: 100,
        rate: 85
      },
      isFeatured: false,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Startup Pitch Night',
      description: 'Local entrepreneurs present their innovative ideas to investors and the community.',
      date: 'February 28, 2024',
      time: '7:00 PM - 10:00 PM',
      venue: 'Innovation Hub',
      attendance: {
        attended: 320,
        capacity: 350,
        rate: 91
      },
      isFeatured: true,
      status: 'Completed'
    },
  ]
  };
    return(
          <div className="flex-1 p-8">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Registration Management</h1>
              <p className="text-gray-400">Manage event registrations for teams</p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#0B1121] rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Total Teams</span>
                </div>
                <div className="text-3xl font-bold text-white">{dashboardData.registrationData.stats.total}</div>
              </div>
           </div>

            {/* Teams Table Section */}
            <div className="bg-[#0B1121] rounded-xl border border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Hacksphere 3.0 Registrations</h2>
              <p className="text-gray-400 mb-6">Manage and review team registrations for the event</p>

              {/* Search and Filters */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search teams, leaders, or categories..."
                    className="w-full bg-[#1A2234] text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg cursor-pointer text-gray-400 hover:bg-[#1A2234] text-sm">1st Year</button>
                  <button className="px-4 py-2 rounded-lg text-gray-400 cursor-pointer hover:bg-[#1A2234] text-sm">2nd Year</button>
                </div>
              </div>

              {/* Table */}
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 text-sm border-b border-gray-800">
                    <th className="text-left pb-4">Team</th>
                    <th className="text-left pb-4">Leader</th>
                    <th className="text-left pb-4">Category</th>
                    <th className="text-left pb-4">Members</th>
                    <th className="text-left pb-4">Registration Date</th>
                    <th className="text-left pb-4">Status</th>
                    <th className="text-left pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.registrationData.teams.map((team) => (
                    <tr key={team.id} className="border-b border-gray-800">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-cyan-500">
                            {team.id}
                          </div>
                          <span className="text-white">{team.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="text-white">{team.leader.name}</div>
                          <div className="text-gray-400 text-sm">{team.leader.email}</div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 text-sm">
                          {team.category}
                        </span>
                      </td>
                      <td className="py-4">
                        <div>
                          <div className="text-white">{team.members.count} members</div>
                          <div className="text-gray-400 text-sm">{team.members.list}</div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-400">{team.date}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm
                          ${team.status === 'Approved' ? 'bg-cyan-500/20 text-cyan-500' : 
                            team.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                            'bg-red-500/20 text-red-500'}`}>
                          {team.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <button className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    )
}

export default Registrations