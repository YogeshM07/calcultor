const AWS = require('aws-sdk');
AWS.config.update({
  region: 'ap-south-1'
});


const healthPath = '/health';
const additionPath = '/addition';
const subtractionPath = '/subtraction';
const multiplicationPath = '/multiplication';
const divisionPath = '/division';


exports.handler = async function (event) {

  const { body, httpMethod, path, queryStringParameters } = event;
  const { val1: queryval1, val2: queryval2 } = queryStringParameters || {};

  //const { val1, val2 } = body;
  const {val1, val2} = JSON.parse(body) || {};

  console.log('Request event: ', event);

  let response;

  if ((!val1 && !val2 && httpMethod === 'POST') 
                      || (!queryval1 && !queryval2 && httpMethod === 'GET') )  {
    return buildResponse(400);
  }
  
  switch (true) {
    case httpMethod === 'GET' && path === healthPath:
      response = buildResponse(200);
      break;

    case httpMethod === 'GET' && path === additionPath:
      response = add(200, queryval1, queryval2);
      break;
    case httpMethod === 'GET' && path === subtractionPath:
      response = sub(200, queryval1, queryval2);
      break;
    case httpMethod === 'POST' && path === multiplicationPath:
      response = multi(200, val1 ,val2);
      break;
    case httpMethod === 'GET' && path === divisionPath:
      response = div(200, queryval1, queryval2);
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

function add(statusCode, val1, val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1) + parseInt(val2))
  }
}

function sub(statusCode, val1, val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1) - parseInt(val2))
  }
}


function multi(statusCode, val1,val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(val1*val2)
  }
}

function div(statusCode, val1, val2) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(parseInt(val1) / parseInt(val2))
  }
}

