/**
 * Created by perstromswe on 2014-03-18
 * Description: The main file of code to start with
 */

var express = require('express'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

var server = express();

var expressLogFile = fs.createWriteStream('express.log', {flags: 'a'});

server.use(express.logger({stream: expressLogFile}));
server.use(express.logger('dev'));
server.use(express.methodOverride());
server.use(express.bodyParser({
  keepExtensions: true,
  uploadDir: __dirname + '/uploads/tmp/'
}));


process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

function routesSetup(server) {
  server.get('/fyra/api/project', api.allProjects);
  server.post('/fyra/api/project', api.addProject);
  server.post('/fyra/api/project/:prj_id', api.updateProject);

  server.get('/fyra/api/city', api.getCities);
  server.get('/fyra/api/level', api.getLevels);
  server.get('/fyra/api/discipline', api.getDisciplines);
  server.get('/fyra/api/type', api.getTypes);

  server.get('*', api.notFound);
}

function start() {
  routesSetup(server);
  server.listen(3001);
  console.log('app server up and running on 127.0.0.1:3001');
}

exports.start = start;
exports.server = server;