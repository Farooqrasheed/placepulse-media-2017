/**
 * Created by Farooq on 25/10/2016.
 */
var mongoose = require('mongoose');
//Establishing database connection

// Defining Schema
var Schema = mongoose.Schema;
    var PlaceSchema = new Schema({
        Median_age: Number,
        Unemployment_rate: String,
        married_Population: String,
        population: String ,
        City_Name: String

});
// Exporting it to be used in other files.
module.exports = mongoose.model('PlaceOverview', PlaceSchema);
