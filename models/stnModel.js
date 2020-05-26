const mongoose = require('mongoose');
const stnSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },

        client_id: {
            type: Number,
            // required: [true, 'A Stn must have a client_id'],
            uniq:false
        },
        rain_start: {
            type: Boolean,
            default: false
        },
        rain_start_time:{
            type: Date
        },
        rain_stop_time:{
            type: Date
        },
        rain_alarm1:{
            type: Boolean,
            default: false
        },
        rain_alarm1_start_time:{
            type: Date
        },
        rain_alarm1_stop_time:{
            type: Date
        },
        rain_alarm8:{
            type: Boolean,
            default: false
        },
        rain_alarm8_start_time:{
            type: Date
        },
        rain_alarm8_stop_time:{
            type: Date
        },
        flood:{
          type: Boolean,
          default: false
        },
        flood_start_time:{
            type: Date
        },
        flood_stop_time:{
            type: Date
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
const Stn = mongoose.model('Stn', stnSchema);

module.exports = Stn;
