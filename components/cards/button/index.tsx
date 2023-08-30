import { IButtonCardProps } from "@/types";
import React from "react";

const ButtonCard = (props: IButtonCardProps) => {
  if (props) {
    const { cardStyle, cardHeaderTitle, cardTooltip, cardOnClick } = props;
    return (
      <button className={cardStyle} title={cardTooltip} onClick={cardOnClick}>
        <h1 className="text-2xl font-bold">{cardHeaderTitle}</h1>
      </button>
    );
  } else return null;
};

export default ButtonCard;
