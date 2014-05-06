var pg = require('pg');

var Knex = require('knex');

Knex.knex = Knex.initialize({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'fyra',
    password: 'postgres',
    database: 'fyra',
    charset: 'utf8'
  }
});

var knex = require('knex').knex;

var sendResponse = function (response, data, status) {
  response.charset = 'UTF-8';
  var responseStatus = status || 200;
  response.json(responseStatus, data);
};

/*
 404 error.
 */
exports.notFound = function (req, res) {
  res.charset = 'UTF-8';
  res.status(404).end();
};


/**Project calls**/
/*
 GET /api/project/ HTTP/1.1
 */
exports.allProjects = function (inputs, callback) {
  var query = knex('project')
    .join('city', 'project.prj_city', '=', 'city.ci_id')
    .join('discipline', 'project.prj_discipline', '=', 'discipline.di_id')
    .join('level', 'project.prj_level', '=', 'level.le_id')
    .join('type', 'project.prj_type', '=', 'type.ty_id')
    .select();

  query.exec(function (err, results) {
    if (err) {
      sendResponse(callback, err, 404);
      return console.error('error running query', err);
    }
    sendResponse(callback, results);
  });
};

/*
 POST /api/project HTTP/1.1
 */
exports.addProject = function (inputs, callback) {
  console.log(inputs.body);
  var query = knex('project')
    .insert({
      prj_number: inputs.body.prj_number,
      prj_title: inputs.body.prj_title,
      prj_year: inputs.body.prj_year,
      prj_leader: inputs.body.prj_leader,
      prj_type: inputs.body.prj_type.id,
      prj_city: inputs.body.prj_city.id,
      prj_discipline: inputs.body.prj_discipline.id,
      prj_level: inputs.body.prj_level.id,
      prj_area: inputs.body.prj_area,
      prj_price_offer: inputs.body.prj_price_offer,
      prj_price_final: inputs.body.prj_price_final,
      prj_hours: inputs.body.prj_hours
    });

  query.exec(function (err, results) {
    if (err) {
      sendResponse(callback, err, 404);
      return console.error('error running query', err);
    }
    sendResponse(callback, results);
  });
};

/*
 UPDATE /api/project/:prj_id
 */
//Todo: Unit test is missing
exports.updateProject = function (inputs, callback) {
  var query = knex('project')
    .where({
      prj_id: inputs.params.prj_id
    })
    .update({
      prj_number: inputs.body.prj_number,
      prj_title: inputs.body.prj_title,
      prj_year: inputs.body.prj_year,
      prj_leader: inputs.body.prj_leader,
      prj_type: inputs.body.prj_type,
      prj_city: inputs.body.prj_city,
      prj_discipline: inputs.body.prj_discipline,
      prj_level: inputs.body.prj_level,
      prj_area: inputs.body.prj_area,
      prj_price_offer: inputs.body.prj_price_offer,
      prj_price_final: inputs.body.prj_price_final,
      prj_hours: inputs.body.prj_hours,
      prj_changed_by: inputs.body.prj_changed_by,
      prj_changed_date: new Date()
    });

  query.exec(function (err) {
    if (err) {
      sendResponse(callback, err, 404);
      return console.error('error running query', err);
    }
    sendResponse(callback);
  });
};