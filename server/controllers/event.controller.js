import Event from '../models/event.model.js'
import cloudinary from 'cloudinary'

export const createEvent = async (req,res) => {
    try{
        let eventBannerUrl = ""
        if(req.file){
            eventBannerUrl = req.file.path
        }else{
            eventBannerUrl = "https://res.cloudinary.com/dkmjsy5aa/image/upload/v1749718881/Screenshot_from_2025-06-11_15-06-39_pt6fe9.png"
        }

        const {
            title,
            date,
            day,
            venue,
            maxTeamSize,
            minTeamSize,
            otherDesc
        } = req.body

        const event = await Event.create({
            title,
            eventBanner : eventBannerUrl,
            date,
            day,
            venue,
            maxTeamSize,
            minTeamSize,
            otherDesc,
        })

        res.status(200).json({
            success : true,
            message : 'Event succesfully created',
        })
    }catch(error){
        console.log("Error in create event controller : ",error.message)
        res.status(400).json({
            success : false,
            message : error.message ||"Server : Failed to create a event , try again"
        })
    }
}

export const updateEvent = async (req,res) =>{
    const id = req.params.id

    try{
        const event  = await Event.findById(id)

        if(!event){
            res.status(400).json({
                success : false,
                message : "Event does not exists !!"
            })
        }

        let eventBannerUrl = event.eventBanner
        if(req.file){
            eventBannerUrl = req.file.path
        }


        const data = {
            title : req.body.title || event.title,
            eventBanner : eventBannerUrl || event.eventBanner,
            date : req.body.date || event.date,
            day : req.body.day || event.day,
            venue : req.body.venue || event.venue,
            maxTeamSize : req.body.maxTeamSize || event.maxTeamSize,
            minTeamSize : req.body.minTeamSize || event.minTeamSize,
            otherDesc : req.body.otherDesc || event.otherDesc,
            isLive : req.body.isLive || event.isLive,
            isFull : req.body.isFull || event.isFull,
            registrations : req.body.registrations || event.registrations
        }

        event = await Event.findByIdAndUpdate(id , data, {new : true})

        res.status(200).json({
            success : true,
            message : 'Event updated succesfully',
            data : event
        })

    }catch(error){
        res.status(400).json({
            success : false,
            message : 'Failed to update the event'
        })
    }
}

export const deleteEvent = async (req,res) =>{
    const id = req.params.id

    const event = await Event.findById(id)

    if(!event){
        res.status(400).json({
            success : false,
            message : 'Event does not exists'
        })
    }

    try{
        await cloudinary.uploader.destroy(event.cloudinary_id)

        await Event.findByIdAndDelete(id)
        res.status(200).json({
            success : true,
            message : 'Event was closed succesfully'
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : 'Failed to delete the event'
        })
    }
}

export const getAllEventDetails = async (req,res) =>{
    try{
        const allEvents = await Event.find()

        res.status(200).json({
            success : true,
            message : "All events fetched succesfully",
            allEvents,
        })

    }catch(error){
        console.log(error.message)
        res.status(400).json({
            success : false,
            message : 'Error fetching event details'
        })
    }
}

export const getEventById = async(req,res) =>{
    const id = req.params.id

    try{
        const event = await Event.findById(id)

        if(!event){
            res.status(400).json({
                success : false,
                message : "Event does not exist"
            })
        }

        res.status(200).json({
            success : true,
            message : "Event details fetched succesfully",
            event
        })

    }catch(error){
        console.log(error.message)
        res.status(400).json({
            success : false,
            message : error.message ||"Error fetching event details"
        })
    }
}

export const closeEvent = async (req,res) => {
    const id  = req.params.id
    try{
        const event = Event.findById(id)

        if(!event){
            res.status(400).json({
                message : 'Event does not exists'
            })
        }

        event = findByIdAndUpdate(id , event.isLive = false , {new : true})

        res.status(200).json({
            success : true,
            message : 'Event closed succesfully'
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const stopEventRegistratons = async (req,res) => {
    const id = req.params.id

    try{
        const event = Event.findById(id)

        if(!event){
            res.status(400).json({
                success : false,
                message : "Event does not exists"
            })
        }

        event = findByIdAndUpdate(id, event.isFull = true, {new : true})

        res.status(200).json({
            success : true,
            message : "Event will no longer take registrations"
        })

    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}
