import mongoose from 'mongoose'

const eventSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true , 'event title is required']
    },
    eventBanner : {
        type : String
    },
    date : {
        type : String,
        required : [true , "date of Event is required"],
    },
    day : {
        type : String,
        required : [true , "day of event is required"],
    },
    venue : {
        type : String,
        required : [true , "event venue is required"]
    },
    minTeamSize : {
        type : Number
    },
    maxTeamSize : {
        type : Number,
    },
    otherDesc : {
        type : String
    },
    isLive : {
        type : Boolean,
        default : true
    },
    isFull : {
        type : Boolean,
        default : false
    },
    registrations : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Registration'
    }]
})

const Event = mongoose.model("Event",eventSchema)

export default Event
