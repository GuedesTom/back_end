var base_url = "http://localhost:5000/";
var token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmQ1NDA2MzE5MmNlZjg5ZjM4ODhmNCIsImlhdCI6MTY1MzEzNzkyMn0.U6yu2lk5P0zC_dee7f1_IpL-7-DzesbTVwJB9SqH4l0";
var request = require("request");

describe("CONTENT", function () {
  it("should request all content", function (done) {
    request.get(
      base_url + "api/content",
      {
        headers: {
          Authorization: "Bearer " + token,
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
      base_url + "api/user/62763bba23dc946f0cad9a80",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
  it("should post content", function (done) {
    request.post(
      {
        headers: { Authorization: "Bearer " + token },
        url: `${base_url} + "api/user/62763bba23dc946f0cad9a80"`,
        body: "name=contentJasmine",
      },
      function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
