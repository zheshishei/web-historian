var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var web = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var uri = url.parse(req.url);
  if(req.method === 'GET') {
    //TODO: more path routing here
    uriParts = uri.pathname.split(path.sep);
    if(uriParts[1] === 'archive') {
      archive.isURLArchived(uriParts.slice(2).join('/'), function(exists) {
        web.sendResponse(res, 200, 'it is ' + exists);
      });
    }else {
      if(uri.pathname === '/') {
        uri = url.parse('./index.html');
      }

      web.serveAsset(res, uri.pathname);
    }
  } else if(req.method === 'POST') {
    var data = "";
    req.on('data', function(chunk) {
      data+=chunk;
    })
    req.on('end', function() {
      web.sendResponse(res, 201, data.toString());
    });
  } else if(req.method === 'OPTIONS') {
    web.sendResponse(res, 200, 'options, baby.');
  }
};
