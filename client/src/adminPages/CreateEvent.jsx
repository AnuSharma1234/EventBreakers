import {useState , useRef} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import { useAuth } from '../provider/authProvider'
import { Upload } from 'lucide-react'
import axios from 'axios'

const CreateEvent = () =>{
  const {token} = useAuth()

  const uploadImageRef = useRef(null)
  const [fileName , setFileName] = useState('')
  const [image , setImage] = useState(null)

  const triggerUpload = () =>{
    uploadImageRef.current.click()
  }

  const handleFileChange = e =>{
    const file = e.target.files[0]

    if(!file){
        return
    }

    if(!file.type.startsWith('image/')){
        handleError('Please select an image file')
        return
    }

    setEventForm({
        ...eventForm,
        eventBanner : file
    })

    const reader = new FileReader()
    reader.onload = () =>{
        setImage(reader.result)
        setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }



  const [eventForm,setEventForm] = useState({
    title : '',
    eventBanner : null,
    date : '',
    day : '',
    venue : '',
    minTeamSize : '',
    maxTeamSize : '',
    otherDesc : '',
  })

  const handleError = (error) =>{
    toast.error(error,{
        position : "top-right"
    })
  }

  const handleSuccess = (message) =>{
    toast.success(message , {
        position : "top-right"
    })
  }

  const validateForm = () =>{
    const missingFields = [] 
    if(!eventForm.title) missingFields.push("Event Title");
    if(!eventForm.date) missingFields.push("Date");
    if(!eventForm.venue) missingFields.push("Day");
    if(!eventForm.day) missingFields.push("Day");
    if(!eventForm.minTeamSize) missingFields.push("Min team size");
    if(!eventForm.maxTeamSize) missingFields.push("Max Team Size");

    if(missingFields.length > 0){
        handleError(`Please fill in the following details : ${missingFields.join(" , ")}`)
        return false;
    }
    return true; 
  }
  const handleCreateEvent = async (e) =>{
    e.preventDefault();

    if(!validateForm()) return;
    
    try {
        const formData = new FormData()
        Object.keys(eventForm).forEach((key)=>{
            formData.append(key, eventForm[key])
        })

      const response = await axios.post('http://localhost:5000/event', formData , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setEventForm({
          title: '',
          otherDesc: '',
          date: '',
          venue: '',
          maxTeamSize: '',
          minTeamSize : '',
          day: '',
          eventBanner: null
        });
        setImage(null)
        setFileName('')

        handleSuccess("Event created succesfully")
     }

    } catch (error) {
      console.error('Error creating event:', error.message);
      handleError('Failed to create an event. Please try again.');
    }
  }
    return(
          <div className="flex-1 p-8">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Create New Event</h1>
              <p className="text-gray-400">Fill in the details below to create a new public event</p>
            </header>

            <div className="max-w-3xl mx-auto">
              <div className="bg-[#0B1121] rounded-xl border border-gray-700 p-6">
                <form className="space-y-6" onSubmit={handleCreateEvent}>
                  {/* Event Banner Upload */}
                  <div>
                    <label className="block text-gray-300 mb-2">Event Banner</label>
                    <div id='image-preview' className= {`border-2 border-dashed border-gray-700 rounded-lg p-8 ${image ? '' : 'bg-[#0B1121] border-dashed border-2 border-gray-700'} rounded-lg items-center mx-auto text-center cursor-pointer`} 
                    onClick={triggerUpload} 
                    >

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={uploadImageRef}
                        id="banner-upload"
                        onChange={handleFileChange}
                      />
                        {
                        !image ? (
                      <label htmlFor="banner-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                            <Upload className="w-6 h-6 text-cyan-400" />
                          </div>
                          <p className="text-cyan-400 mb-1">Click to upload banner image</p>
                          <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB</p>
                          <span className='text-gray-700 bg-gray-200 z-50'>{fileName}</span>
                        </div>
                      </label>
                        ) : (
                            <img src={image} className='h-full rounded-lg mx-auto w-full' alt='Preview'/>
                        )
                        }
                   </div>
                  </div>

                  {/* Event Title */}
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Event Title <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter event title"
                      value={eventForm.title}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        title: e.target.value
                      })}
                      className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Event Description */}
                  <div>
                    <label className="block text-gray-300 mb-2">Event Description</label>
                    <textarea
                      rows="4"
                      placeholder="Describe your event..."
                      value={eventForm.description}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        otherDesc: e.target.value
                      })}
                      className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                    ></textarea>
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Event Date <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={eventForm.date}
                        onChange={(e) => setEventForm({
                          ...eventForm,
                          date: e.target.value
                        })}
                        className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Event Day
                      </label>
                      <select className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                        onChange={(e)=>setEventForm({
                            ...eventForm,
                            day : e.target.value
                        })} 
                      >
                        <option value="">Select Day</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                      </select>
                    </div>
                  </div>

                  {/* Venue */}
                  <div>
                    <label className="block text-gray-300 mb-2">
                      Venue <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter event venue/location"
                      value={eventForm.venue}
                      onChange={(e) => setEventForm({
                        ...eventForm,
                        venue: e.target.value
                      })}
                      className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Capacity and Category */}
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className='block text-gray-300 mb-2'>Min Team Size</label>
                        <input
                        type='number'
                        placeholder='Min Team Size' 
                        value={eventForm.minTeamSize}
                        onChange={(e)=>setEventForm({
                            ...eventForm,
                            minTeamSize : e.target.value
                        })}
                        className='w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500'
                        />
                      </div>
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Max Team Size 
                      </label>
                      <input
                        type="number"
                        placeholder="Max Team Size"
                        value={eventForm.maxTeamSize}
                        onChange={(e) => setEventForm({
                          ...eventForm,
                          maxTeamSize: e.target.value
                        })}
                        className="w-full bg-[#1A2234] text-gray-300 px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                 </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Create Event
                    </button>
                    <button
                      type="button"
                      onClick={() => setEventForm({
                        title: '',
                        description: '',
                        date: '',
                        time: '',
                        venue: '',
                        maxTeamSize: '',
                        minTeamSize : '',
                        eventDay: '',
                        banner: null
                      })}
                      className="flex-1 border border-gray-700 text-gray-400 hover:text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer/>
          </div>
    ) 
}

export default CreateEvent