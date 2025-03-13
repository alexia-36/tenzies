import React from "react";
export default function Die(props) {
  const styles = {
    background: props.isHeld ? "rgb(255, 179, 0)" : "white",
  };
  return (
    <button
      style={styles}
      className="btn"
      onClick={() => {
        props.colorDice(props.id);
      }}
    >
      {props.value}
    </button>
  );
}
