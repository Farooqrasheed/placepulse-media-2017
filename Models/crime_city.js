/**
 * Created by Farooq on 25/10/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defining Schema
var CrimeSchema = new Schema({
    Property_crime: String,
    Violent_crime:  String,
    City_Name:      String
});
// Exporting it to be used in other files.
module.exports = mongoose.model('crime_states', CrimeSchema);

