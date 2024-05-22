import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Create instannce of express
const app = express();

// Read the .env file and get the PORT and MONGO URL
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URL; 

//  Middleware function 
app.use(express.json()) // receive JSON data on POST method
app.use(express.urlencoded()) // receive url encoded data on POST method

// Connect to the mongodb database 
mongoose.connect(MONGO_URL).then(() => {
    // logs and listen to the specified PORT
    console.log('Connected to database')
    app.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
}).catch((error) => console.log(`Failed to connect to database. ERROR: ${error}`))

// Create a Schema for the masterlist
const masterlistSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    isdDgroupMember: String,
    dDgroupLeader: String,
    gender: String,
    birthDate: String,
    contactNumber: String,
    facebookName: String,
    barangay: String,
    schoolName: String
});


// Create a Schema for the attendees
const attendeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    nickName: String,
    isdDgroupMember: String,
    dDgroupLeader: String,
    attendingAs: String,
    gender: String,
    birthDate: Date,
    contactNumber: Number,
    facebookName: String,
    barangay: String,
    schoolName: String,
    date: String,
})

// Create Models
const masterlistModel = mongoose.model("masterlists", masterlistSchema)
const attendeeModel = mongoose.model("attendees", attendeeSchema)

const masterlist = await masterlistModel.find({}, {firstName:1, lastName:1, _id:1});
const attendees = await attendeeModel.find();

const dateToday = new Date().toLocaleDateString()
console.log(dateToday)


// GET METHOD for the namesearch feature
app.get("/masterlist", async(req, res) => {
    console.log('Sending masterlist')
    res.json(masterlist)
}) 


// POST METHOD
app.post("/attendees", async(req, res) => {
    const newAttendee = await attendeeModel.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickname: req.body.nickname,
        isDgroupMember: req.body.isDgroupMember,
        dgroupLeader: req.body.dgroupLeader,
        attendingAs: req.body.attendingAs,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        contactNumber: req.body.contactNumber,
        facebookName: req.body.facebookName,
        schoolName: req.body.schoolName,
        date: dateToday,
    })
    
    //console.log(newAttendee.firstName)
    //console.log(newAttendee instanceof attendeeModel)

    // Check if Attendee is added on the masterlist. If yes, then add to masterlist
    masterlistModel.findOne({firstName: req.body.firstName})
        .then((docs) => {
            if (docs === null) {
                masterlistModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nickname: req.body.nickname,
                    isDgroupMember: req.body.isDgroupMember,
                    dgroupLeader: req.body.dgroupLeader,
                    gender: req.body.gender,
                    birthdate: req.body.birthdate,
                    contactNumber: req.body.contactNumber,
                    facebookName: req.body.facebookName,
                    schoolName: req.body.schoolName,
                })

                console.log(`${newAttendee.firstName} ${newAttendee.lastName} added to masterlist.`)
            } else {
                console.log("Entry exists")
            }
        })
        .catch((err) => {
            console.log(err)
        })

    /*masterlistModel.exists(
        {firstName: newAttendee.firstName, lastName: newAttendee.lastName}, 
        (error, result) => {
            if (error){
                console.log(err)
            } else if (result === true){       // data exists in masterlist
                console.log("already on masterlist")
            } else{                         // data does not exist, then add

                const newEntry = masterlistModelModel.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nickname: req.body.nickname,
                    isDgroupMember: req.body.isDgroupMember,
                    dgroupLeader: req.body.dgroupLeader,
                    gender: req.body.gender,
                    birthdate: req.body.birthdate,
                    contactNumber: req.body.contactNumber,
                    facebookName: req.body.facebookName,
                    schoolName: req.body.schoolName,
                })

                console.log(`${newAttendee.firstName} ${newAttendee.lastName} added to masterlist.`)

            }
    })*/

    res.sendStatus(201)
})



