const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Create a new game
router.post('/create', async (req, res) => {
  const { id, boardSize, date, moves, result, username } = req.body;
  const newGame = new Game({ id, boardSize, date, moves, result, username });
  await newGame.save();
  res.status(201).send('Game created');
});

// Update a game
router.put('/update/:gameId', (req, res) => {
  const { gameId } = req.params;
  const { board } = req.body;
  const game = games.find((g) => g.gameId === gameId);
  if (game) {
    game.board = board;
    res.status(200).send('Game updated');
  } else {
    res.status(404).send('Game not found');
  }
});

module.exports = router;
