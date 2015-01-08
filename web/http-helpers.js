var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};
exports.mimeTypes = mimeTypes = {
  '.html' : 'text/html',
  '.css'  : 'text/css',
  '.js'   : 'application/javascript',
  '.json' : 'application/json',
  'json' : 'application/json'
}

exports.serveAsset = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(path.join(archive.paths.siteAssets, asset), function(err, file){
    if(err) {
      sendResponse(res, 404, 'not found.');
    } else {
      sendResponse(res, 200, file, path.extname(asset));
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
exports.sendResponse = sendResponse = function(res, code, body, contentType) {
  res.statusCode = code;
  res.setHeader('Content-Type', mimeTypes[contentType] || 'text/plain');
  res.writeHead(headers);
  res.end(body);
}
