// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.

var archive = require('../helpers/archive-helpers');
var http = require('http');
var path = require('path');
var fs = require('fs');

archive.readListOfUrls(function(err, data) {
  console.log("data", data);
  data.forEach(function(url) {
    archive.isURLArchived(url,function(isArchived) {
      if(!isArchived) {
        http.get('http://' + url, function(res) {
          var html = "";
          res.on('data',function(chunk) {
            html += chunk;
          });
          res.on('end', function() {
            fs.writeFile(path.join(archive.paths.archivedSites,url), html, function(err){
              if(err) {
                console.log("ERROR WRITING FILE FOR SITE", url);
                console.dir(err);
              }
            });
          });
        }).on('error', function(err) {
          console.log('-ERROR: INVALID RESPONSE FROM', url, '--------------');
          console.dir(err);
        });
      }
    })
  });
});

