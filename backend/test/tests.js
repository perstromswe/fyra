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

  describe('Project', function () {
    it('should return 200 OK on GET /api/project/', function (done) {
      request(url).get('/api/project/').end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
    });
  })
});
