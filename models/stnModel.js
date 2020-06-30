const mongoose = require('mongoose');
const stnSchema = new mongoose.Schema(
    {
        station_name: {
            type: String,
            trim: true
        },
        station_code: {
            type: String,
            trim: true
        },

        organization_code: {
            type: String,
            trim: true
        },
        zone_name: {
            type: String,
            trim: true
        },
        longitude: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        river_name: {
            type: String,
            trim: true
        },
        station_code: {
            type: String,
            trim: true
        },
        height: {
            type: Number,
        },
        utm_x: {
            type: Number,
        },
        utm_y: {
            type: Number,
        },
        establish_year: {
            type: Number,
        },
        station_type: {
            type: Number,
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
