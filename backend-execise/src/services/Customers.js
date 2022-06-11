"use strict";

const { glossaryModel } = require("../models");
var exportFuns = {};


exportFuns.getAggregatePaginatedData = function (queryPattern, sortPattern, page_no, limit) {
    // console.log({
    //     queryPattern: queryPattern[0], sortPattern, page_no, limit
    // })
    var query = glossaryModel.aggregate(queryPattern);
    //console.log("query : ", query);
    var options = {
        sort: sortPattern,
        page: page_no,
        limit: limit
    };
    // console.log("options : ", options);
    return glossaryModel.aggregatePaginate(query, options).then(resultData => {
        return resultData;
    }).catch(err => {
        throw err;
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.create = async function (createPattern) {

    return glossaryModel.create(createPattern).then(createRes => {
        return createRes;
    }).catch(err => {
        throw err;
    });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.findOne = async function (findPattern, selectPattern = "", populatePattern = null) {

    var query = glossaryModel.findOne(findPattern, selectPattern);

    if (populatePattern) {
        query.populate(populatePattern);
    }

    return query.then(resultData => {
        return resultData;
    }).catch(err => {
        throw err;
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exportFuns.findOneAndUpdate = async function (findPattern, updatePattern) {

    var options = { new: true, runValidators: true };
    return glossaryModel.findOneAndUpdate(findPattern, updatePattern, options).then(updatedData => {
        return updatedData;
    }).catch(err => {
        throw err;
    });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exportFuns.deleteOne = async function (deletePattern) {

    return glossaryModel.deleteOne(deletePattern).then(deleteRes => {
        return deleteRes;
    }).catch(err => {
        throw err;
    });
}
module.exports = exportFuns; 