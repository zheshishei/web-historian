var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt'),
  'archiveREST' : 'archive',
  'temp' : path.join(__dirname, '../archives/temp/')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = readListOfUrls = function(callback) {
  fs.readFile(paths.list, {encoding: 'utf8'}, function(err,data) {
    if (err) {
      console.log('error reading list of urls');
      console.trace();
      callback(err,data);
    } else {
      callback(err,data.trim().split('\n'));
    }
  });
}

exports.isUrlInList = function(url,callback) {
  readListOfUrls(function(err, list) {
    if(err) {
      callback(false)
    } else {
      var isInList = (list.indexOf(url) !== -1);
      callback(isInList);
    }
  });
};

exports.addUrlToList = function(url,callback){
  fs.appendFile(paths.list, url + "\n", function(err) {
    if(err){
      console.log("ERROR APPENDING TO LIST FILE");
      console.trace();
    }
    if(callback) {
      callback(err);
    }
  })
};

exports.isURLArchived = function(url, callback){
  var fileName = path.join(paths.archivedSites, (url || ''));
  fs.open(fileName, 'r', function(err) {
    if(err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(){
};
