const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema(
  {
    color: { type: String, required: true },
    order: { type: Number, required: true },
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  { _id: false }
);

const gameSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  boardSize: { type: Number, required: true },
  date: { type: Date, required: true },
  moves: { type: [moveSchema], required: true },
  result: { type: String, required: true },
  username: { type: String, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
