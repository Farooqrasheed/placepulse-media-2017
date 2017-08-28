/**
 * Created by Farooq on 25/10/2016.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defining Schema
var HealthSchema = new Schema({
    Health_Cost:        String,
    Physicians_per_cap: String,
    Water_quality:      String,
    Air_quality:        String,
    City_Name:          String
});
// Exporting it to be used in other files.
module.exports = mongoose.model('Health_State', HealthSchema);

