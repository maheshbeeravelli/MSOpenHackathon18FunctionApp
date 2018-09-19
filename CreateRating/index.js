const axios = require("axios");
const uuid = require("uuid");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('req.query.userId', req.query.userId);
    const userId = req.query.userId || req.body.userId;
    const productId = req.query.productId || req.body.productId;
    const id = uuid.v1();
    context.log('uuidv3', id);
    if (validateUserId(userId) && validateProductId(productId)) {
        const doc = req.body;
        doc.id = id;
        context.log('doc', doc);
        context.bindings.ratingsOut = JSON.stringify(doc);
        // context.done();
        context.res = {
            status: 200,
            body: doc
        }
    } else {
        context.res = {
            status: 400,
            body: 'Require valid userId and productId'
        }
    }
};

async function validateUserId(userId) {
    const USER_API = "https://serverlessohuser.trafficmanager.net/api/GetUser?userId=" + userId;
    await axios.get(USER_API).then(async function (response) {
        return true;
    }).catch(function (err) {
        return false;
        // context.res = {
        //     status: 400,
        //     body: err
        // }
    });
}
async function validateProductId(productId) {
    const PRODUCT_API = "https://serverlessohproduct.trafficmanager.net/api/GetProduct?productId=" + productId;
    await axios.get(PRODUCT_API).then(function (response) {
        return true;
    }).catch(function (err) {
        return false;
    });
}