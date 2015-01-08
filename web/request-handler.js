var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var web = require('./http-helpers.js');
var querystring = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var uri = url.parse(req.url);
  var uriParts = uri.pathname.split(path.sep);
  if(req.method === 'GET') {
    console.log('Handling GET' + uri.pathname);
    //TODO: more path routing here
    if(uriParts[1] === archive.paths.archiveREST) {
      web.serveArchive(res, uriParts.slice(2).join('/'));
    }else {
      if(uri.pathname === '/') {
        uri = url.parse('./index.html');
      }

      web.serveAsset(res, uri.pathname);
    }
  } else if(req.method === 'POST') {
    console.log('Handling POST' + uri.pathname);
    var data = "";
    req.on('data', function(chunk) {
      data+=chunk;
    })
    req.on('end', function() {
      var requestedUrl = querystring.parse(data).url;
      archive.isURLArchived(requestedUrl,function(exists) {
        if(exists) {
          web.sendResponse(res,302,"",{Location: path.join(archive.paths.archiveREST,requestedUrl)});
        } else {
          web.sendResponse(res,302,"",{Location: "loading.html"});
          archive.addUrlToList(requestedUrl);
        }
      });
    });
  } else if(req.method === 'OPTIONS') {
    web.sendResponse(res, 200, 'options, baby.');
  }
};
