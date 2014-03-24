/**
 * Created by perstrom on 2014-03-18.
 * Description: API tests
 */

var should = require('should'),
  assert = require('assert'),
  request = require('supertest'),
  config = require('../config'),
  pg = require('pg');

describe('Routing -->', function () {

  var url = 'http://localhost:3000';

  function postProject() {
    var randomNumber = Math.floor((Math.random() * 1000000) + 1);
    return request(url)
      .post('/api/project')
      .set('Content-Type', 'multipart/form-data')
      .field('prj_title', 'hello')
      .field('prj_number', String(Math.floor((Math.random() * 500) + 1)))
      .field('prj_year', '2012')
      .field('prj_leader', 'PELLE')
      .field('prj_type', '1')
      .field('prj_city', '1')
      .field('prj_discipline', '1')
      .field('prj_level', '1')
      .field('prj_area', '1')
      .field('prj_price_offer', '23234')
      .field('prj_price_final', '33234')
  }

  describe('Project', function () {
    it('should return 200 OK on GET /api/project/', function (done) {
      request(url).get('/api/project').end(function (err, res) {
        should.not.exist(err);
        res.should.have.status('200');
        done();
      });
    });

    it('should be possible to insert new projects', function (done) {

      postProject()
        .end(function (err, res) {
          should.not.exist(err);

          res.should.have.status('200');
          //assert(res.text.match('OK')[0], 'OK', 'Should get message:OK from server');
          done();
        });
    });
  })


});
