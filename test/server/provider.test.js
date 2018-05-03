
import {FilterFactory} from "../../api/providers/FilterFactory";
var request = require('supertest');
var assert = require("assert");


describe('FilterFactory Unit Tests', function() {
    var sampleObj = {
        prop_1: "test value",
        prop_2: {
            inner_1: "test",
            inner_2: "test"
        },
        prop_3: "another test",
        prop_4: "not included"
    };

    describe('Filter Factory Builds Without Constructor Params', function(){
        let factory = new FilterFactory();
        assert.notEqual(typeof factory, "undefined");
    });

    describe('Filter Factory Builds With Constructor Params', function(){
        let factory = new FilterFactory(["prop_1", "prop_2", "prop_3"]);
        assert.notEqual(typeof factory, "undefined");
    });

    describe('Filter Factory Generates Empty Object When No Constructor Given', function(){
        let factory = new FilterFactory();
        assert.deepEqual(factory.buildFilterFromURLObject(sampleObj), {});
    });

    describe('Filter Factory Generates Object Based Upon Given Properties', function(){
        var expected = {
            prop_1: "test value",
            prop_2: {
                inner_1: "test",
                inner_2: "test"
            },
            prop_3: "another test"
        };

        let factory = new FilterFactory(["prop_1", "prop_2", "prop_3"]);
        assert.deepEqual(factory.buildFilterFromURLObject(sampleObj), expected);
    });
});


