const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'ap-south-1'
});


const healthPath = '/health';
const additionPath='/addition';
const subtractionPath='/subtraction';
const multiplicationPath='/multiplication';
const divisionPath='/division';


exports.handler = async function(event){

  console.log('Request event: ', event);

  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;

      case event.httpMethod==='GET' && event.path === additionPath:
        response=add(200,event.queryStringParameters.val1,event.queryStringParameters.val2);
      break;
      case event.httpMethod==='GET' && event.path === subtractionPath:
        response=sub(200,event.queryStringParameters.val1,event.queryStringParameters.val2);
      break;
      case event.httpMethod==='GET' && event.path === multiplicationPath:
        response=multi(200,event.queryStringParameters.val1,event.queryStringParameters.val2);
      break;
      case event.httpMethod==='GET' && event.path === divisionPath:
        response=div(200,event.queryStringParameters.val1,event.queryStringParameters.val2);
      break;
      default:
      response = buildResponse(404, '404 Not Found');
  }
return response;
}


function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

function add(statusCode, val1,val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1)+parseInt(val2))
  }
}

function sub(statusCode, val1,val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1)-parseInt(val2))
  }
}


function multi(statusCode, val1,val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1)*parseInt(val2))
  }
}

function div(statusCode, val1,val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1)/parseInt(val2))
  }
}

