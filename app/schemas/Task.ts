import Task from "../models/Task";
import { gql } from "apollo-server-express";

/**
 * GraphQL types definition
 */
export const typeDefs = gql`
  type Task {
    id: ID!
    content: String
    isChecked: Boolean
  }
  type Query {
    getTasks: [Task]
  }
  input TaskInput {
    isChecked: Boolean
  }
  type Mutation {
    addTask(content: String!, isChecked: Boolean!): Task
    editTask(id: String!, input: TaskInput!): Task
    deleteTask(id: String!): Task
  }
`;

/**
 * GraphQL resolvers
 */
export const resolvers = {
  Query: {
    getTasks: async () => Task.find({}).exec()
  },
  Mutation: {
    addTask: async (_, args) => {
      try {
        return Task.create(args);
      } catch (e) {
        return e.message;
      }
    },
    editTask: async (_, { id, input }) => {
      const task: any = await Task.findOneAndUpdate(id, input);
      return task.toObject();
    },
    deleteTask: async (_, { id }) => {
      const task: any = await Task.findByIdAndRemove(id);
      return task ? task.toObject() : null;
    }
  }
};
