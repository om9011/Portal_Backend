const mongoose = require("mongoose");
const eventSchema = mongoose.Schema({
  eventName:{
      type: String,
      required: true,
    },

  eventDate:{
      type: String,
      required: true,
    },
  eventDescription: {
      type: String,
      required: true,
    },
 
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
