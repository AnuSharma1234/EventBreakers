import React from 'react';
import { useState } from 'react';
import { 
  BarChart3, 
} from 'lucide-react';

import CreateEvent from './CreateEvent';
import LiveEventCard from './LiveEvent';
import Registrations from './Registrations';
import Dashboard from './Dashboard';
import PastEvent from './PastEvent';

const AdminDashboard = () => {
  const [activeNav , setActiveNav] = useState('Dashboard')

  const renderContent = () => {
    switch (activeNav) {
     case 'Live Events':
        return (
          <div className="flex-1 p-8">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Live Events</h1>
              <p className="text-gray-400">Currently ongoing events</p>
            </header>
            <div className="max-w-4xl">
              <LiveEventCard />
            </div>
          </div>
        );
      case 'Dashboard':
        return (
            <Dashboard/>
        );
      case 'Registrations':
        return (
            <Registrations/>
        );
      case 'Past Events':
        return (
            <PastEvent/>
       );
      case 'Create New Event':
        return (
            <CreateEvent/>
       );
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="fixed w-64 h-screen bg-black border-r border-gray-800 flex flex-col">
        <div className="flex-1 p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">Event<span className='text-cyan-500'>Breakers</span></div>
              <div className="text-sm text-gray-400">Dashboard</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Navigation
            </div>
            {['Dashboard', 'Live Events', 'Registrations', 'Past Events', 'Create New Event'].map((item) => (
              <button
                key={item}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-white cursor-pointer text-sm mb-1 ${
                  activeNav === item 
                    ? 'bg-cyan-950 border border-zinc-500 text-white' 
                    : 'text-gray-400 hover:text-white hover:bg-[#0B1121]'
                }`}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-white font-bold border border-zinc-900 bg-cyan-500 rounded-md justify-center py-2 px-1 cursor-pointer hover:bg-cyan-700">
            Logout
          </div>
        </div>
      </div>

      <div className="ml-64 flex-1">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;