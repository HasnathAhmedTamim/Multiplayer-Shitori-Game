
# Multiplayer Shiritori Game

A simplified two-player Shiritori game built with React for the Nyntax Assessment 2025.

## Features
- **Turn-based gameplay:** Two players play from the same screen, taking turns.
- **Word validation:** Words must start with the last letter of the previous word, be at least 4 letters, not repeated, and be valid English words (checked via DictionaryAPI).
- **Countdown timer:** Each player has 10 seconds per turn.
- **Score tracking:** Players lose points for invalid words or running out of time.
- **Word history:** All previously entered words are displayed to avoid repetition.

## Setup & Usage
1. **Install dependencies:**
	```bash
	npm install
	```
2. **Start the development server:**
	```bash
	npm run dev
	```
3. **Open your browser:**
	Visit `http://localhost:5173` (or the port shown in your terminal).

## Gameplay Instructions
- Player 1 starts by entering any valid English word (minimum 4 letters).
- Player 2 must enter a word starting with the last letter of Player 1's word.
- Words cannot be repeated and must be found in the dictionary.
- Each player has 10 seconds per turn. If time runs out or an invalid word is entered, the player loses a point and the turn switches.
- The game continues until you decide to stop.

## Deployment
You can deploy this app easily to Netlify or Vercel:
- Build the app: `npm run build`
- Follow the platform's instructions to deploy the `dist` folder.

## Dictionary API
- Uses [dictionaryapi.dev](https://dictionaryapi.dev/) for word validation.
