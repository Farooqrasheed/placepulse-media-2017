var express = require('express');
var router = express.Router();

var dburl = 'mongodb://localhost:27017/test';
var collections = ["cityrankings","Asian_Cities_indices","sentiment_analyses","city_info"];
var mongojs = require('mongojs');
var db = mongojs(dburl,collections);

/* home page. */
router.get('/',function(req,res) {
    db.Asian_Cities_indices.find({}, function (err, docs) {
        docs.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        res.render('index', {title: 'Place Essence', data: docs});
    });
});
router.get('/US_stats',function(req,res){
    db.cityrankings.find({}, function (err, docs) {
        docs.sort(function (a, b) {
            var nameA = a.City_Name;
            var nameB = b.City_Name;
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        res.render('us_stats', {title: 'Place Essence',data: docs});
    });
});

router.get('/databinding',function(req,res) {
    var getdata = req.query.cityname;
    
    var myobj = {};
    db.city_info.find({},function(err,doc){
        for(var i=0;i<doc.length;i++){
            if(getdata== doc[i].name){
                myobj.g=doc[i].name;
                myobj.h=doc[i].problem_property_crimes;
                myobj.j=doc[i].index_safety;
                myobj.k=doc[i].crime_increasing;
                myobj.l=doc[i].index_crime;
                myobj.m=doc[i].problem_violent_crimes;
                myobj.n = doc[i].skill_and_competency;
                myobj.o = doc[i].cost;
                myobj.p = doc[i].index_healthcare;
                myobj.q = doc[i].modern_equipment;
                myobj.r = doc[i].air_quality;
                myobj.s = doc[i].garbage_disposal_satisfaction;
                myobj.t = doc[i].index_pollution;
                myobj.u = doc[i].drinking_water_quality_accessibility;
                myobj.v = doc[i].water_pollution;

                doc=myobj;
            }
        }
        res.render('databinding',{title: 'Place Essence', data:doc});
    });
});

router.get('/States',function(req,res) {
    var getdata = req.query.states;
    console.log(getdata);

    var myobj = {};

    db.cityrankings.find({},function(err,doc){
        for(var i=0;i<doc.length;i++){
            if(getdata== doc[i].City_Name){
                myobj.g=doc[i].City_Name;

                myobj.h=doc[i].population;
                myobj.j=doc[i].married_Population;
                myobj.k=doc[i].Unemployment_rate;
                myobj.l=doc[i].Median_age;
                myobj.m=doc[i].Violent_crime;


                doc=myobj;
            }
        }
        res.render('states_info',{title: 'Place Essence', data:doc});
    });

});
// Comparing cities
router.get('/compare_cities', function(req, res) {
    db.city_info.find({},function (err, result) {
        result.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        res.render('compare_cities', {title: 'Place Essence',data:result});
    });
});

router.get('/Comparison', function(req, res) {
    var city1= req.query.city1;
    var city2= req.query.city2;

    var city_train = [];

    var myobj1 ={g:'',h:'',j:'',k:'', l:'',m:''};
    var myobj2 ={g:'',h:'',j:'',k:'', l:'',m:'',n:'',o:'',p:'',q:'',r:'',s:'',t:'',u:'',v:''};
    var large_Array = [];
    db.city_info.find({},function (err, doc) {
    for(var a=0;a<doc.length;a++) {

        for (var i = 0; i < doc.length; i++) {
            if (city1 == doc[i].name && city2 == doc[a].name) {
                myobj1.g = city1;
                myobj2.g = city2;

                myobj1.h = doc[i].problem_property_crimes;
                myobj1.j = doc[i].index_safety;
                myobj1.k = doc[i].crime_increasing;
                myobj1.l = doc[i].index_crime;
                myobj1.m = doc[i].problem_violent_crimes;
                myobj1.n = doc[i].skill_and_competency;
                myobj1.o = doc[i].cost;
                myobj1.p = doc[i].index_healthcare;
                myobj1.q = doc[i].modern_equipment;
                myobj1.r = doc[i].air_quality;
                myobj1.s = doc[i].garbage_disposal_satisfaction;
                myobj1.t = doc[i].index_pollution;
                myobj1.u = doc[i].drinking_water_quality_accessibility;
                myobj1.v = doc[i].water_pollution;

                myobj2.h = doc[a].problem_property_crimes;
                myobj2.j = doc[a].index_safety;
                myobj2.k = doc[a].crime_increasing;
                myobj2.l = doc[a].index_crime;
                myobj2.m = doc[a].problem_violent_crimes;
                myobj2.n = doc[a].skill_and_competency;
                myobj2.o = doc[a].cost;
                myobj2.p = doc[a].index_healthcare;
                myobj2.q = doc[a].modern_equipment;
                myobj2.r = doc[a].air_quality;
                myobj2.s = doc[a].garbage_disposal_satisfaction;
                myobj2.t = doc[a].index_pollution;
                myobj2.u = doc[a].drinking_water_quality_accessibility;
                myobj2.v = doc[a].water_pollution;

                city_train.push(myobj1);
                city_train.push(myobj2);

                doc = city_train;
            }
        }
    }
        res.render('compare_results', {title: 'Place Essence',data:doc});
    });
});

//Cities ranking
router.get('/rankings', function(req, res) {
    db.Asian_Cities_indices.find({},{"name":1,"crime_index":1,"safety_index":1,"quality_of_life_index":1,"health_care_index":1,"groceries_index":1
        ,"pollution_index":1,"hotel_price_index":1,"cpi_index":1,"traffic_index":1,"rent_index":1},function (err, docs) {
        docs.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        res.render('cities_ranking', {title: 'Place Essence',data: docs});
    });
});

router.get('/rankings/United_States_of_America_ranking', function(req, res) {

            // Fetch the document
            db.cityrankings.find( function (err, item) {
                //assert.equal(null, err);
                item.sort(function (a, b) {
                    var nameA = a.City_Name;
                    var nameB = b.City_Name;
                    if (nameA > nameB) {
                        return 1;
                    }
                    if (nameA < nameB) {
                        return -1;
                    }
                    return 0;
                });
                res.render('rankings', {title: 'Place Essence',data: item});
            });
});
//Sentiment Analysis
router.get('/sentiment-analysis', function(req, res) {
    db.sentiment_analyses.find({}, function (err, result) {
        result.sort(function (a, b) {
            var nameA = a.Name;
            var nameB = b.Name;
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });

        res.render('sentiment_analysis', {title: 'Place Essence', data: result});
    });
});
//About Page.
router.get('/about',function(req,res){
    res.render('about',{title: 'Place Essence'});
});
module.exports = router;
