var request = require('supertest');
var server = require('../../server');

describe('GET /', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /contact', function() {
  it('should render ok', function(done) {
    request(server)
      .get('/contact')
      .expect(200, done);
  });
});

describe('GET /students', function() {
    it('should render ok', function(done) {
        request(server)
            .get('/students')
            .expect(302, done);
    });
});

describe('GET /create', function() {
    it('should render ok', function(done) {
        request(server)
            .get('/create')
            .expect(302, done);
    });
});



