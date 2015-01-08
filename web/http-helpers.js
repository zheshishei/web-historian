var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

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

exports.serveAsset = function(res, asset) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  fs.readFile(path.join(archive.paths.siteAssets, asset), function(err, file){
    if(err) {
      sendResponse(res, 404, 'not found.');
    } else {
      sendResponse(res, 200, file, {"Content-Type": path.extname(asset)});
    }
  });
};

exports.serveArchive = serveArchive = function(res,url) {
   fs.readFile(path.join(archive.paths.archivedSites, url), function(err, file){
    if(err) {
      sendResponse(res, 500, 'internal server.');
    } else {
      sendResponse(res, 200, file, {"Content-Type": path.extname(url)});
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
exports.sendResponse = sendResponse = function(res, code, body, options) {
  res.setHeader('Content-Type', 'text/html'); //default
  _.each(options, function(val,key) {
    if(key === 'Content-Type') {
      res.setHeader(key, mimeTypes[val]);
    } else{
      res.setHeader(key,val);
    }
  });
  res.writeHead(code, headers);
  res.end(body);
}
