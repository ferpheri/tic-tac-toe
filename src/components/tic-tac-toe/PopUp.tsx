import React, { useEffect } from "react";
import { CiFaceMeh, CiFaceFrown, CiFaceSmile } from "react-icons/ci";
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
      return <p className="winner">You Win <CiFaceSmile/> </p>;
    } else if (isNoWinner) {
      return <p className="no-winner">No One Wins <CiFaceMeh/></p>;
    } else if (winner === "O") {
      return <p className="loser">AI Wins <CiFaceFrown/></p>;
    }
    return null;
  };

  return (
    <div className="result-popup">
      <div className="result-popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {getResultMessage()}
      </div>
    </div>
  );
};

export default PopUp;
