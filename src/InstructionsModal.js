import React from 'react';
import './InstructionsModal.css';

function InstructionsModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Instructions</h2>
        <p>
          Input a coin to start the game. The game spins three reels, each displaying
          a random value. If all three displayed values are the same, you win a
          payout. The payout amount is determined by the payout table below. The
          maximum amount you can win is 500 coins. You can select the amount you
          want to bet for each spin. You can deposit as many coins as you want in a
          single session.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default InstructionsModal;
