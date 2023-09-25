const express = require('express');
const router = express.Router();

// Dummy game data (replace this with database later)
const games = [];

// Create a new game
router.post('/create', (req, res) => {
  const { gameId, board } = req.body;
  games.push({ gameId, board });
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
