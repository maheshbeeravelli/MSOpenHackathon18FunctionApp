module.exports = async function (context, req) {
    var documents = context.bindings.ratingsIn;
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