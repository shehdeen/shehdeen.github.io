// Configure Credentials to use Cognito
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-southeast-2:447f978b-ff4b-48cb-9f52-9895c6918fe4'
});

AWS.config.region = 'ap-southeast-2';
// We're going to partition Amazon Kinesis records based on an identity.
// We need to get credentials first, then attach our event listeners.

AWS.config.credentials.get(function(err) {
    // attach event listener
    if (err) {
        alert('Error retrieving credentials.');
        console.error(err);
        return;
    }
    // create Amazon Kinesis service object
    AWS.config.apiVersions = {
      firehose: '2015-08-04',
      // other service API versions
    };
    
});

function firehoseEvent(payload) {
    
    var firehose = new AWS.Firehose();

    var params = {
      DeliveryStreamName: 'Shehdeen-test', /* required */
      Record: { /* required */
        Data: payload
          //Data: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */ /* required */
      }
    };
    firehose.putRecord(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });

}
