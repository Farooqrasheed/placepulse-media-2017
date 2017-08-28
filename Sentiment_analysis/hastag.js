
var Twit = require('twit');
var sentiment = require('sentiment');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');

var schema = mongoose.Schema;

var Sentiment = new schema({
    Name: String,
    pos_sent: Number,
    neg_sent: Number,
    neut_sent: Number
});

var Sentiment_Model = mongoose.model('Sentiment_analysis', Sentiment);




T = new Twit({
    consumer_key:         'K4KVDwEbPgNNdjdAEV3zbGM0n',
    consumer_secret:      'obp5uDLNgi43xj8iS0Y3XhtLLcF71LBNjNGpDV5iWIt6Px7ExY',
    access_token:         '3190682605-XKRUjL5uWQ7vcTVNbaZcYjlZ0ewLv2RESUkdIIv',
    access_token_secret:  'eP74X3s4bIdeCkPJmQosc5KxmMdDmL0vfrkSOVK72vnop',
    timeout_ms: 60*1000

});



T.get('account/verify_credentials', { skip_status: true })//resuest method, events
    .catch(function (err) {
    })
    .then(function (result) {

    });



var neut_words = 0;
var neg_words = 0;
var pos_words = 0;

var count = 0;
var city = 'Riyadh, Saudi Arabia';
/**var cities =  ['Alabama','Alaska'];,'Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida',
    'Georgia' ,'Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri',
    'Montana','Nebraska','Nevada','New Hampshire','New jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
    'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];**/

    var stream1 = T.stream('statuses/filter', {track: city});
    stream1.on('tweet', function (tweet) {

        var text = tweet.text;
        sn = tweet.user.screen_name;
        tweet = {text: text, sn: sn};
        console.log(tweet);
        count++;

        var Help = JSON.stringify(tweet, null, 4);


        var r1 = new sentiment(Help);
        console.log("Sentiment score: " + r1.score + '\n' + "Words:" + r1.words);
        if (r1.score == 0) {
            neut_words++;
            console.log("Total Neutral points: " + neut_words);
        }
        else if (r1.score < 0) {
            neg_words++;
            console.log("Total Negative points: " + neg_words);
        }
        else if (r1.score > 0) {
            pos_words++;
            console.log("Total Positive points: " + pos_words);
        }
        var sentiment_model = new Sentiment_Model;
        sentiment_model.Name = city;
        if (pos_words > neut_words && neg_words) {
            console.log("Overall sentiment of " + sentiment_model.Name + " is " + "Positive " + pos_words);

        }
        else if (neut_words > pos_words && neg_words) {
            console.log("Overall sentiment of " + sentiment_model.Name + " is " + "Neutral " + neut_words);

        }
        else if (neg_words > pos_words && neut_words) {
            console.log("Overall sentiment of " + sentiment_model.Name + " is " + "Negative " + neg_words);

        }


        sentiment_model.pos_sent = pos_words / count * 100;
        console.log(sentiment_model.Name + " is " + sentiment_model.pos_sent.toFixed(2) + "% positive");
        sentiment_model.neut_sent = neut_words / count * 100;
        console.log(sentiment_model.Name + " is " + sentiment_model.neut_sent.toFixed(2) + "% neutral");
        sentiment_model.neg_sent = neg_words / count * 100;
        console.log(sentiment_model.Name + " is " + sentiment_model.neg_sent.toFixed(2) + "% negative.");

        sentiment_model.save();
        if (count == 21) {
            stream1.stop();

            mongoose.connection.close();
        }

    });
