const mongoose = require("mongoose");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "name cannot be more than 50 characters"],
  },
  slug: String,

  description: {
    type: String,
    required: [true, "please add a description"],
    maxlength: [500, "name cannot be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/,
      "please use a vaild URL with HTTP or HTTPS",
    ],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
      "Please  add a  valid  email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  // location: {
  //     type: {
  //       type: String, // Don't do `{ location: { type: String } }`
  //       enum: ['Point'], // 'location.type' must be 'Point'
  //       required: true
  //     },
  //     coordinates: {
  //       type: [Number],
  //       required: true,
  //       index:'2dsphere'
  //     },
  //     formattedAddress:String,
  //     street:String,
  //     city:String,
  //     State:String,
  //     zipcode:String,
  //     country:String
  //   },
  //   carrers:{
  //     type:[String],
  //     required:true,
  //     emum:[
  //         'Web Development',
  //         'Mobile Developemnet'
  //         ,'UI/UX',
  //         'Data Science',
  //         'Business',
  //         'Othe '

  //     ]

  //   },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [2, "Rating must be at least 1"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo-jpg",
  },
  housing: {
    type: String,
    default: false,
  },
  jobAssistance: {
    type: String,
    default: false,
  },
  jobGuarantee: {
    type: String,
    default: false,
  },
  acceptGi: {
    type: String,
    default: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Bootcamp", BootcampSchema);
