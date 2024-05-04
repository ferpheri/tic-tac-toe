import React, { useEffect } from "react";

type PopUpProps = {
  winner: string | null;
  isNoWinner: boolean;
  onClose: () => void;
};

const PopUp = ({ winner, isNoWinner, onClose }: PopUpProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.querySelector(".result-popup-content");
      if (popup && !popup.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const getResultMessage = () => {
    if (winner === "X") {
      return <p className="winner">You Win :)</p>;
    } else if (isNoWinner) {
      return <p className="no-winner">No One Wins :/</p>;
    } else if (winner === "O") {
      return <p className="loser">AI Wins :(</p>;
    }
    return null;
  };

  return (
    <div className="result-popup">
      <div className="result-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <p>{getResultMessage()}</p>
      </div>
    </div>
  );
};

export default PopUp;
