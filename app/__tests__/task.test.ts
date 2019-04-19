import chai from "chai";
const expect = chai.expect;
import request from "supertest";

import app from "../index";

describe("GraphQL", () => {
  let testData = { id: "test", content: "test", isChecked: false };

  /**
   * Add a new task in the database for testing purpose
   */
  it("Add a new task", done => {
    request(app)
      .post("/graphql")
      .send({
        query: `mutation addTask { addTask(content: "testContent", isChecked: true) { id content isChecked } }`
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        // res will contain array of all tasks
        if (err) {
          return done(err);
        }
        // assume there is at least a task in the database
        const resData = res.body.data.addTask;

        expect(resData).to.have.property("id");
        expect(resData).to.have.property("content");
        expect(resData).to.have.property("isChecked");

        done();
      });
  });

  /**
   * Return all tasks of the database and assign the first one to testData
   */
  it("Returns tasks with correct format", done => {
    request(app)
      .post("/graphql")
      .send({ query: `query getTasks { getTasks { id content isChecked } }` })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        // res will contain array of all tasks
        if (err) {
          return done(err);
        }
        // assume there is at least a task in the database
        const resData = res.body.data.getTasks[0];

        expect(resData).to.have.property("id");
        expect(resData).to.have.property("content");
        expect(resData).to.have.property("isChecked");

        testData = resData;

        done();
      });
  });

  /**
   * Edit the first task listed (testData) by changing its isChecked field
   */

  it("Returns task checked / unchecked", done => {
    request(app)
      .post("/graphql")
      .send({
        query: `mutation editTask { editTask(id: "${
          testData.id
        }", input: { isChecked: ${!testData.isChecked} }) { id content isChecked }}`
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        // res will contain array of all tasks
        if (err) {
          return done(err);
        }
        // assume there is at least a task in the database
        const resData = res.body.data.editTask;

        expect(resData).to.have.property("id");
        expect(resData).to.have.property("content");
        expect(resData).to.have.property("isChecked");

        // We test the isChecked field inside our next call

        done();
      });
  });

  /**
   * Remove testData task from the database and check if its isChecked field was edited previously
   */

  it("Delete a specific task", done => {
    request(app)
      .post("/graphql")
      .send({
        query: `mutation deleteTask { deleteTask(id: "${
          testData.id
        }") { id content isChecked }}`
      })
      .set("Accept", "application/json")
      .expect(200)
      .end((err, res) => {
        // res will contain array of all tasks
        if (err) {
          return done(err);
        }
        // assume there is at least a task in the database
        const resData = res.body.data.deleteTask;

        expect(resData).to.have.property("id");
        expect(resData).to.have.property("content");
        expect(resData).to.have.property("isChecked");

        expect(resData.id).to.equal(testData.id);
        expect(resData.content).to.equal(testData.content);
        expect(resData.isChecked).to.equal(!testData.isChecked);

        // We test the isChecked field inside our next call
        expect(!resData.isChecked).to.equal(testData.isChecked);

        done();
      });
  });
});
