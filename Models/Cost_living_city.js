/**
 * Created by Farooq on 25/10/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Defining Schema
var CostoflivingSchema = new Schema({
    Transportation: String,
    Utilities:      String,
    Miscellaneous:  String,
    Housing:        String,
    Grocery:        String,
    Overall:        String,
    City_Name:      String
});

// Exporting it to be used in other files.
module.exports =  mongoose.model('Costofliving', CostoflivingSchema);

