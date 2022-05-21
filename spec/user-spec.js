var base_url = "http://localhost:5000/";
var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmQ1NDA2MzE5MmNlZjg5ZjM4ODhmNCIsImlhdCI6MTY1MzEzNzkyMn0.U6yu2lk5P0zC_dee7f1_IpL-7-DzesbTVwJB9SqH4l0";
var request = require("request");
describe("USER", function () {
  it("should request all users", function (done) {
    request.get(
      base_url + "api/user/all",
      {
        headers: {
          Authorization:
            "Bearer " +
            token,
        },
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
  it("should request one user", function (done) {
    request.get(
      base_url + "api/user/626d53da3192cef89f3888e6",
      {
        headers: {
          Authorization:
            "Bearer " +
            token,
        },
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
  it("should request owner of the token", function (done) {
    request.get(
      base_url + "api/user",
      {
        headers: {
          Authorization:
            "Bearer " +
            token,
        },
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
