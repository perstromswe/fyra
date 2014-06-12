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
  var query = knex('project')
    .insert({
      prj_number: inputs.body.prj_number,
      prj_title: inputs.body.prj_title,
      prj_year: inputs.body.prj_year,
      prj_leader: inputs.body.prj_leader,
      prj_type: inputs.body.prj_type.ty_id,
      prj_city: inputs.body.prj_city.ci_id,
      prj_discipline: inputs.body.prj_discipline.di_id,
      prj_level: inputs.body.prj_level.le_id,
      prj_area: inputs.body.prj_area,
      prj_price_offer: inputs.body.prj_price_offer,
      prj_price_final: inputs.body.prj_price_final,
      prj_hours: inputs.body.prj_hours
    })
    .returning('prj_id');

  query.exec(function (err, results) {
    if (err) {
      sendResponse(callback, err, 404);
      return console.error('error running query', err);
    }
    console.log(results);
    callback.send(200, {prj_id:results[0]});
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


/*
 GET fyra/api/city
 */
exports.getCities = function(req, res){
  var query = knex('city')
    .select()
    .orderBy('ci_title', 'desc');

  query.exec(function(err, cities){
    if(err){
      var response = {
        message: 'Something went wrong when trying to fetch cities',
        thrownErr: err
      };
      console.error(response);
    }
    res.send(200, cities);

  });
};

/*
 GET fyra/api/level
 */
exports.getLevels = function(req, res){
  var query = knex('level')
    .select()
    .orderBy('le_title', 'desc');

  query.exec(function(err, levels){
    if(err){
      var response = {
        message: 'Something went wrong when trying to fetch levels',
        thrownErr: err
      };
      throw new Error(response)
    }
    res.send(200, levels);

  });
};

/*
 GET fyra/api/type
 */
exports.getTypes = function(req, res){
  var query = knex('type')
    .select()
    .orderBy('ty_title', 'desc');

  query.exec(function(err, types){
    if(err){
      var response = {
        message: 'Something went wrong when trying to fetch levels',
        thrownErr: err
      };
      throw new Error(response)
    }
    res.send(200, types);

  });
};

/*
 GET fyra/api/discipline
 */
exports.getDisciplines = function(req, res){
  var query = knex('discipline')
    .select()
    .orderBy('di_title', 'desc');

  query.exec(function(err, disciplines){
    if(err){
      var response = {
        message: 'Something went wrong when trying to fetch disciplines',
        thrownErr: err
      };
      throw new Error(response)
    }
    res.send(200, disciplines);

  });
};