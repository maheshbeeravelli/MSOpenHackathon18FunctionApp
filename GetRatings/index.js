module.exports = async function (context, req) {
    // context.log('JavaScript HTTP trigger function processed a request.');
    // const documents =  context.bindings.ratingsAllIn;
    //  context.res = {
    //     body: documents
    // };
    var documents = context.bindings.ratingsAllIn;
    var totalDocuments = documents.length;
    context.log('Found '+ totalDocuments +' documents');

    if(totalDocuments === 0){
        context.res = {
            status: 404,
            body : "No documents found"
        };
    }
    else {
        context.res = {
            body: documents
        };
    }
    
    context.done();
};