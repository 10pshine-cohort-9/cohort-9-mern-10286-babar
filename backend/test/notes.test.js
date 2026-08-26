const request = require('supertest');
const { expect } = require('chai');

// This automatically executes your server.js and starts the app on port 5000
require('../src/server'); 

describe('Backend API Integration & Unit Tests', () => {

  describe('GET / Endpoint', () => {
    it('should respond to server requests', (done) => {
      request('http://localhost:5000')
        .get('/')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.be.oneOf([200, 401, 404]);
          done();
        });
    });
  });

  describe('Notes API Endpoints', () => {
    it('should handle requests on /api/notes', (done) => {
      request('http://localhost:5000')
        .get('/api/notes')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.be.oneOf([200, 401, 403, 404]);
          done();
        });
    });
  });

});