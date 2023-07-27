import React from "react";
import { ISummaryCardProps } from "@/types";
import { cardBodyTypes } from "@/utils/enums";
import { formatCompactNumber } from "@/utils/helpers";

const SummaryCard = (props: ISummaryCardProps) => {
  if (props) {
    const {
      cardStyle,
      cardHeaderTitle,
      cardHeaderContent,
      cardBodyType,
      cardBodyContent,
    } = props;
    return (
      <div className={cardStyle}>
        <div className="p-2 flex justify-between">
          <h1 className="text-lg font-bold">{cardHeaderTitle}</h1>
          <h1 className="text-lg font-bold">{cardHeaderContent}</h1>
        </div>
        <div className="p-4">
          <SummaryContent
            cardBodyType={cardBodyType}
            cardBodyContent={cardBodyContent}
          />
        </div>
      </div>
    );
  } else return null;
};

const SummaryContent = ({
  cardBodyType,
  cardBodyContent,
}: {
  cardBodyType: number;
  cardBodyContent: any;
}) => {
  if (cardBodyType === cardBodyTypes.NUMBER) {
    return (
      <h1 title={cardBodyContent} className="text-5xl font-bold">
        {formatCompactNumber(cardBodyContent)}
      </h1>
    );
  } else if (cardBodyType === cardBodyTypes.STRING) {
    return (
      <h1
        title={cardBodyContent}
        className="text-sm h-20 overflow-hidden w-full font-bold"
      >
        {cardBodyContent}
      </h1>
    );
  } else if (cardBodyType === cardBodyTypes.ELEMENT) {
    return cardBodyContent;
  } else return null;
};

export default SummaryCard;
