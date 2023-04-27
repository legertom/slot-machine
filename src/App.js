import React, { useState } from "react";
import "./App.css";
import cherry from './cherry.png';
import seven from './seven.png';
import bar from './bar.png';
import InstructionsModal from "./InstructionsModal";


function App() {
  // Implementation goes here
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(1);
  const [reels, setReels] = useState(["-", "-", "-"]);
  const [message, setMessage] = useState("");
  const reelValues = [seven, bar, cherry];
  const [hasSpun, setHasSpun] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);




  function handleDeposit(amount) {
    // Add the specified amount to the current balance
    setBalance(balance + amount);
  }
  
  function handleBetChange(event) {
    // Update the bet amount with the user's input
    const newBet = parseInt(event.target.value, 10);
    if (newBet >= 1) {
      setBet(newBet);
    } else {
      setMessage("Bet amount must be at least 1 coin.");
    }
  }
  function toggleInstructionsModal() {
    setIsInstructionsModalOpen(!isInstructionsModalOpen);
  }
  
  

  function calculatePayout(reels) {
    const [reel1, reel2, reel3] = reels;
  
    // Check for winning combinations
    if (reel1 === seven && reel2 === seven && reel3 === seven) {
      return 500;
    } else if (reel1 === bar && reel2 === bar && reel3 === bar) {
      return 250;
    } else if (reel1 === cherry && reel2 === cherry && reel3 === cherry) {
      return 100;
    } else if (
      (reel1 === cherry && reel2 === cherry) ||
      (reel1 === cherry && reel3 === cherry) ||
      (reel2 === cherry && reel3 === cherry)
    ) {
      return 50;
    } else if (reel1 === cherry || reel2 === cherry || reel3 === cherry) {
      return 10;
    } else {
      return 0; // No payout for other combinations
    }
  }
  
  
  
  function handleSpin() {
    // Generate random values for the reels
    const newReels = reels.map(() => reelValues[Math.floor(Math.random() * reelValues.length)]);
    setReels(newReels);
    console.log(newReels);
  
    // Check for winning combination and calculate payout
    const payout = calculatePayout(newReels);
  
    // Check if the user has enough balance for the bet
    if (balance - bet < 0) {
      setMessage('You have run out of coins, please deposit more to continue');
    } else {
      // Update balance and message
      setBalance(balance - bet + payout);
  
      if (payout > 0) {
        setMessage(`You won ${payout} coins!`);
      } else {
        setMessage('No payout this time. Try again!');
      }
    }

    setHasSpun(true);
  }
  
  
  
  return (
    <div className="container">
    <div className="App">
      <h1>Slot Machine</h1>
      
      <button onClick={toggleInstructionsModal}>Instructions</button>
{isInstructionsModalOpen && <InstructionsModal onClose={toggleInstructionsModal} />}

  
      <div className="balance">
        <p>Remaining coins: {balance}</p>
        <button onClick={() => handleDeposit(100)}>Deposit 100 coins</button>
      </div>
  
      <div className="bet">
        <label htmlFor="betAmount">Bet amount: </label>
        <input type="number" min="1" id="betAmount" value={bet} onChange={handleBetChange} />
      </div>
  
      <button onClick={handleSpin}>Spin</button>
  
      {hasSpun && (
  <div className="reels">
    <img src={reels[0]} alt="reel1" className="reel" />
    <img src={reels[1]} alt="reel2" className="reel" />
    <img src={reels[2]} alt="reel3" className="reel" />
  </div>
)}



  
      <h2>Payout Table</h2>
      <table>
        <thead>
          <tr>
            <th>Winning Combination</th>
            <th>Payout Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Three 7s</td>
            <td>500 coins</td>
          </tr>
          <tr>
            <td>Three BARs</td>
            <td>250 coins</td>
          </tr>
          <tr>
            <td>Three cherries</td>
            <td>100 coins</td>
          </tr>
          <tr>
            <td>Two cherries</td>
            <td>50 coins</td>
          </tr>
          <tr>
            <td>One cherry</td>
            <td>10 coins</td>
          </tr>
          <tr>
            <td>Any other combination</td>
            <td>No payout</td>
          </tr>
        </tbody>
      </table>
  
      <div className="message">
        <p>{message}</p>
      </div>
    </div>
    </div>
  );
  
}

export default App;

