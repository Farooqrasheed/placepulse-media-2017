/**
 * Created by Farooq on 23/11/2016.
 */
var mongoose = require ('mongoose');
var Schema = mongoose.Schema;


var City_rankingSchema = new Schema({
    City_Name: String,
    Median_age: Number,
    Unemployment_rate: String,
    married_Population: String,
    population: String ,
    Property_crime: String,
    Violent_crime:  String,
    Health_Cost:        String,
    Physicians_per_cap: String,
    Water_quality: String,
    Grocery:         String,
    Air_quality:        String,
    Transportation: String,
    Utilities:      String,
    Miscellaneous:  String,
    Housing:        String,
    Overall:        String
});


// Exporting it to be used in other files.

module.exports = mongoose.model('CityRanking', City_rankingSchema);