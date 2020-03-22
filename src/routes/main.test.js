import app from "../index";
import supertest from "supertest";
import route, { YOUTUBE_404 } from "./main";

const request = supertest(app);

describe("Endpoint Test Suite", () => {
  it("should return 200 for json format", async done => {
    // Do your async tests here
    const response = await request.get(
      `${route.path}/UC-lHJZR3Gqxm24_Vd_AJ5Yw?format=json`
    );
    expect(response.status).toBe(200);
    done();
  });

  it("should return 302 for redirect (default)", async done => {
    // Do your async tests here
    const response = await request.get(
      `${route.path}/UC-lHJZR3Gqxm24_Vd_AJ5Yw`
    );
    expect(response.status).toBe(302);
    done();
  });

  it("should return 404 to non-existant channel (redirect)", async done => {
    // Do your async tests here
    const response = await request.get(`${route.path}/fakechannelurl`);
    expect(response.headers.location).toBe(YOUTUBE_404);
    done();
  });

  it("should return 404 to non-existant channel (json)", async done => {
    // Do your async tests here
    const response = await request.get(
      `${route.path}/fakechannelurl?format=json`
    );
    expect(response.status).toBe(404);
    done();
  });
});
