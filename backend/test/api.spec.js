/**
 * Created by perstrom on 2014-03-18.
 * Description: API tests
 */

var should = require('should'),
  //assert = require('assert'),
  request = require('supertest');
  //config = require('../config'),
  //pg = require('pg');

describe('Routing -->', function () {

  var url = 'http://localhost:3001';

  function postProject() {
    var randomNumber = Math.floor((Math.random() * 1000000) + 1);
    return request(url)
      .post('/fyra/api/project')
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
      request(url).get('/fyra/api/project')
        .expect(200, done);
    });

    it('should be possible to insert new projects', function (done) {
      postProject()
        .end(function(err, res){
          res.status.should.equal(200);
          res.body['prj_id'].should.exist;
          done();
        })
    });

    it('should be possible to fetch cities with /fyra/api/city', function(done){
        request(url).get('/fyra/api/city')
          .expect(200, done)
    });

    it('should be possible to fetch levels with /fyra/api/level', function(done){
      request(url).get('/fyra/api/level')
        .expect(200, done)
    });

    it('should be possible to fetch types with /fyra/api/type', function(done){
      request(url).get('/fyra/api/type')
        .expect(200, done)
    });

    it('should be possible to fetch disciplines with /fyra/api/disciplines', function(done){
      request(url).get('/fyra/api/discipline')
        .expect(200, done)
    });


  })


});
