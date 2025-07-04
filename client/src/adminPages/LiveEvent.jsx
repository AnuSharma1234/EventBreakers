import React from 'react'
import { Calendar , Clock , MapPin , Users ,Pen , Ban ,X } from 'lucide-react'

const LiveEventCard = () =>{
    return(
      <div className="bg-[#0B1121] rounded-2xl overflow-hidden border border-gray-800">
        <div className="relative border border-zinc-600">
          {/* Event Banner */}
          <div className="relative h-[400px] bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute top-4 left-4">
              <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                LIVE NOW
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-gray-400/30 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-400/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-6 border bg-[#0B1121]">
            <h2 className="text-2xl font-bold text-white mb-3">
              Hacksphere 3.0
            </h2>
            <p className="text-gray-400 mb-6">
              A 8 hour hackathon, hosted by thecodebreakers
            </p>

            {/* Event Meta Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">December 18, 2024</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">2:00 PM - 8:00 PM EST</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">San Francisco Convention Center</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">2,847 attendees</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between'>
            <div className="flex gap-3">
              <button className="bg-cyan-500 hover:bg-cyan-600 flex items-center  border border-white text-white px-4 py-2 rounded-lg cursor-crosshair text-md font-bold">
                <Pen className='size-5 mr-1'/>
                Edit Event
              </button>
              <button className="border border-white text-white flex items-center bg-red-500 cursor-pointer px-4 py-2 rounded-lg text-md font-bold">
                <Ban className='size-5 mr-1'/>
                Stop Registrations
              </button>
            </div>
              <button className="border border-white text-white bg-red-500 cursor-pointer px-4 py-2 rounded-lg text-md font-bold flex items-center">
                <X className='size-5 mr-1'/>
                Close Event
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default LiveEventCard