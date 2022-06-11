"use strict";
const { customerService } = require('../services');
const { Validation } = require('../helpers')
var exportFuns = {};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @api {get} /api/customers/grossaries Customer Grossaries - Listing
 * @apiGroup Customer-Grossary
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiParam {String} page_no Page No.
 * @apiParam {String} limit Limit
 * @apiParam {String} keyword Search Keyword
 * @apiParam {String} start_date Start Date ( Format: YYYY-MM-DD )
 * @apiParam {String} end_date End Date ( Format: YYYY-MM-DD )
 * @apiParam {String} status Status
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
   {
    "status": true,
    "msg": "SUCCESS",
    "data": {
        "docs": [
            {
                "_id": "62a355286805d548cb02f7e6",
                "terms": "Atti2",
                "definitions": "Atti test2",
                "createdAt": "2022-06-10T14:28:56.869Z",
                "status": true
            },
            {
                "_id": "62a355226805d548cb02f7e5",
                "terms": "Atti",
                "definitions": "Atti test",
                "createdAt": "2022-06-10T14:28:50.487Z",
                "status": true
            }
        ],
        "totalDocs": 2,
        "limit": 10,
        "page": 1,
        "totalPages": 1,
        "pagingCounter": 1,
        "hasPrevPage": false,
        "hasNextPage": false,
        "prevPage": null,
        "nextPage": null
    }
}
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 Error
    {
        "message": "Error.",
        "data": {}
    }
*/
exportFuns.get_grossaries = async (req, res) => {
    try {
        const page = parseInt(req.query.page_no) || 1;
        var limit = parseInt(req.query.limit) || 10;
        limit = [10, 20, 50].includes(limit) ? limit : 10;
        // matchPattern
        let matchPattern = {
            status: true
        }
        let queryPattern = []
        queryPattern.push({ $match: matchPattern })
        //  sortPattern
        const sortPattern = { _id: -1 }

        customerService.getAggregatePaginatedData(queryPattern, sortPattern, page, limit).then((paginatedData) => {
            res.status(200).json({ status: true, msg: "SUCCESS", data: paginatedData });
        }).catch((err) => {
            let resMsg = Validation.getErrorMessage(err);
            res.status(400).json({ status: false, msg: resMsg, data: [] });
        })

    } catch (err) {
        res.send(err.message);
    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @api {post} /api/customers/grossaries Customer Grossaries - Adding
 * @apiGroup Customer-Grossary
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} terms Termas: "Your Terms here"
 * @apiParam {String} definitions Definitions: "Your Definitions here"
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "message": "Grossarry has created successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 Error
    {
        "message": "Erorr message",
        "data": {}
    }
*/
exportFuns.create_grossaries = async (req, res) => {
    try {
        var terms = req.body.terms || "";
        var definitions = req.body.definitions || "";

        var createPattern = {
            terms: terms,
            definitions: definitions
        };
        var findPattern = { terms: terms };
        var itemData = await customerService.findOne(findPattern);
        console.log(itemData);
        if(itemData){
            console.log();
            res.status(200).json({ status: true, msg: "RECORD ALREADY EXISTS", data: [] });
        }else{
            customerService.create(createPattern).then(async createRes => {
                res.status(200).json({ status: true, msg: "GLOSSARY CREATED SUCCESSFULLY", data: createRes });
            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                res.status(200).json({ status: false, msg: "SOMETHNG_WENT_WRONG", data: resMsg });
            });
        }
        

    } catch (err) {
        console.log("coming in else : ",err.message);
        res.status(500).json({ status: false, msg: err.message });

    }
};


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @api {get} /api/customer/grossaries/:item_id Grossary - Get Single
 * @apiGroup Customer-Grossary
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
    "status": true,
    "msg": "SUCCESS",
    "data": {
        "terms": "Glossary",
        "definitions": "Glossary definitions",
        "_id": "62a4126c10e636247c9217e5"
    }
}
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 Error
    {
        "message": "Invalid Glossary Request",
        "data": {}
    }
*/
exportFuns.get_grossary = (req, res) => {

    try {

        var item_id = req.params.item_id || null;

        var findPattern = { _id: item_id };
        var selectPattern = "terms definitions";

        customerService.findOne(findPattern, selectPattern,).then(itemData => {

            if (itemData) {
                res.status(200).json({ status: true, msg: "SUCCESS", data: itemData });
            } else {
                res.status(400).json({ status: false, msg: "INVALID_GLOSSARY_REQUEST", data: itemData });
            }

        }).catch(err => {
            let resMsg = Validation.getErrorMessage(err);
            res.status(400).json({ status: false, msg: resMsg, data: [] });
        });

    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });

    }
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * @api {put} /api/customers/grossaries/item_id Customer Grossaries - Updating
 * @apiGroup Customer-Grossary
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data",
    }
 *
 * @apiParam {String} terms Termas: "Your Terms here"
 * @apiParam {String} definitions Definitions: "Your Definitions here"
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "message": "Grossarry has updated successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 Error
    {
        "message": "Erorr message",
        "data": {}
    }
*/

exportFuns.update_grossary = async (req, res) => {

    try {

        var item_id = req.params.item_id || null;
        var terms = req.body.terms || "";
        var definitions = req.body.definitions || "";

        var findPattern = { _id: item_id };
        var itemData = await customerService.findOne(findPattern);

        if (!itemData) {
            res.status(400).json({ status: true, msg: "INVALID_GLOSSARY_REQUEST" });
        } else {

            var updatePattern = {
                terms: terms,
                definitions: definitions,
                updateAt: new Date()
            };

            customerService.findOneAndUpdate(findPattern, updatePattern).then(updatedRes => {
                res.status(200).json({ status: true, msg: "GLOSSARY_UPDATE_SUCCESS", returnData: updatedRes });

            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                res.status(400).json({ status: false, msg: resMsg });
            });
        }

    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });

    }
};


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
* @api {delete} /api/customers/grossaries/item_id Customer Grossaries - Deleting
 * @apiGroup Customer-Grossary
 *
 * @apiHeaderExample {multipart/form-data} Header-Example
    {
        "Content-Type": "multipart/form-data"
    }
 *
 * @apiSuccessExample {json} Success-Example
    HTTP/1.1 200 OK
    {
        "message": "Glossary has deleted successfully.",
        "data": {}
    }
 *
 * @apiErrorExample {json} Error-Example
    HTTP/1.1 400 Error
    {
        "message": "Invalid Glossary Request",
        "data": {}
    }
*/
exportFuns.delete_grossary = async (req, res) => {
    try {
        var item_id = req.params.item_id;
        var findPattern = { _id: item_id, status: true };
        var itemData = await customerService.findOne(findPattern);
        if (!itemData) {
            res.status(400).json({ status: true, msg: "INVALID_GLOSSARY_REQUEST" });
        } else {
            customerService.deleteOne(findPattern).then(updateRes => {
                res.status(200).json({ status: true, msg: "GLOSSARY_DELETE_SUCCESS", returnData: updateRes });
            }).catch(err => {
                let resMsg = Validation.getErrorMessage(err);
                res.status(400).json({ status: false, msg: resMsg });
            });
        }

    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
};


module.exports = exportFuns;