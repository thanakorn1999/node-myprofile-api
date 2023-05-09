exports.getUserId = (token, callback) => {
  const atob = require("atob");
  //   console.log(`token`, token);
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace("-", "+").replace("_", "/");
  var tokenData = JSON.parse(atob(base64));
  //   console.log(`tokenData`, tokenData);
  callback(tokenData.id, tokenData.type, tokenData.iat);
};

// exports.getRole = (token, callback) => {
//     const atob = require("atob");

//     var base64Url = token.split(".")[1];
//     var base64 = base64Url.replace("-", "+").replace("_", "/");
//     var tokenData = JSON.parse(atob(base64));
//     callback(tokenData.role, tokenData.type, tokenData.iat);
// }
