import Registration from '../models/registration.model.js'
import Team from '../models/registration.model.js'
import eventRegistration from '../mailTemplates/eventRegistration.js'
import mailSender from '../utils/mailSender.js'

async function sendEventRegistrationMail(email ,teamName){
    try{
        const mailResponse = await mailSender(email , "Event Registration email from TCB",eventRegistration(teamName))

    }catch(error){
        console.log(error.message)
    }
}

export const registerEvent = async (req,res) =>{

    const newRegistration = Team(req.body)

    const existingTeam = await Team.findOne({leaderEmail: newRegistration.leaderEmail})

    if(existingTeam){
        res.status(400).json({
            success : false,
            message : 'leaders email is already linked with another team'
        })
    }

    try{
        const newTeam = await newRegistration.save()

        sendEventRegistrationMail(newTeam.leaderEmail , newTeam.teamName)

        res.status(200).json({
            success : true,
            message : 'Successfully registered for the event',
            team : newTeam
        })

    }catch(error){
        res.status(200).json({
            success : false,
            message : 'Failed to register for the event'
        })
    }
}

export const getAllRegistrations = async (req,res) =>{
    try{
        const allRegistrations = await Team.find()
        res.status(200).json({
            success : true,
            message : 'All registrations fetched successfully',
            count : allRegistrations.length,
            data : allRegistrations,
        })

    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

export const deleteAllRegistrations = async (req,res) =>{
    try{
        const deleteResult = await Registration.deleteMany({})
        res.status(200).json({
            success : true,
            message : `Deleted ${deleteResult.deletedCount} registrations`
        })
    }catch(error){
        res.status(400).json({
            message : error.message
        })
    }

}

export const deleteRegistration = async (req , res) =>{
    try{
        const deleteResult = await Registration.deleteOne({_id : req.params.id})
        res.status(200).json({
            success : true,
            message : `Deleted`
        })
    }catch(error){
        res.status(400).json({
            success : false,
            message : "Failed to delete"
        })
    }
}

