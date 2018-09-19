const axios = require("axios");
const uuidv3 = require("uuid/v3");
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    context.log('req.query.userId', req.query.userId);
    if (req.query.userId || req.body && req.body.userId) {
        const userId = req.query.userId || req.body.userId;
        const USER_API = "https://serverlessohuser.trafficmanager.net/api/GetUser?userId=" + userId;
        context.log('User Request', USER_API);
        const id = uuidv3();
        context.log('uuidv3', id);
        await axios.get(USER_API).then(async function (response) {
            context.log(response);
            if (req.query.productId || req.body.productId) {
                const productId = req.query.productId || req.body.productId;
                const PRODUCT_API = "https://serverlessohproduct.trafficmanager.net/api/GetProduct?productId=" + productId;
                const id = uuidv3();
                context.log('uuidv3', id);
                await axios.get(PRODUCT_API).then(function (response) {
                    context.log(response);
                    const doc = req.query;
                    doc.id = id;
                    context.log('doc', doc);
                    context.bindings.ratingsOut = JSON.stringify(doc);
                    // context.done();
                    context.res = {
                        status: 200,
                        body: doc
                    }
                }).catch(function (err) {
                    context.res = {
                        status: 400,
                        body: err
                    }
                })
            } else {
                context.res = {
                    status: 400,
                    body: "Please pass a productId on the query string or in the request body"
                };
            }
            context.res = {
                body: 'Completed'
            }
        }).catch(function (err) {
            context.log(err);
            context.res = {
                status: 400,
                body: err
            }
        });
    } else {
        context.res = {
            status: 400,
            body: "Please pass a userId on the query string or in the request body"
        };
    }
};