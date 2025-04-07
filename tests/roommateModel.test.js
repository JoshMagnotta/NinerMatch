const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Roommate = require('../models/roommateModel');

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

describe('Roommate Model', () => {
  it('creates and saves a valid roommate', async () => {
    const roommate = new Roommate({
      title: 'Test Roommate',
      poster: new mongoose.Types.ObjectId(),
      details: 'This is a test roommate post with enough characters.',
      gender: 'Male',
      style: 'Apartment',
    });

    const savedRoommate = await roommate.save();
    expect(savedRoommate._id).toBeDefined();
    expect(savedRoommate.title).toBe('Test Roommate');
  });

  it('fails to save without required fields', async () => {
    const roommate = new Roommate({});

    let err;
    try {
      await roommate.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.details).toBeDefined();
  });
});
