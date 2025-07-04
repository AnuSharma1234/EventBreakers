import React from 'react'
import { Calendar , Users , TrendingUp , Star, Clock , MapPin } from 'lucide-react';

const PastEvent = () =>{
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
              <h1 className="text-2xl font-bold text-cyan-400 mb-2">Past Events</h1>
              <p className="text-gray-400">Browse through our previously hosted events and their highlights</p>
            </header>

            <div className="grid grid-cols-3 gap-6">
              {dashboardData.pastEvents.map(event => (
                <div key={event.id} className="bg-[#0B1121] rounded-xl overflow-hidden border border-gray-800">
                  <div className="relative h-48 bg-gray-800">
                    <div className="absolute top-3 left-3 flex gap-2">
                      {event.isFeatured && (
                        <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" /> Featured
                        </span>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-6">{event.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">{event.venue}</span>
                      </div>
                    </div>
                   <div className="mt-2 bg-gray-800 rounded-full h-1.5">
                   </div>
                 </div>
                </div>
              ))}
            </div>
          </div>
    )
}

export default PastEvent