import React from "react";
import { ISummaryCardContentProps, ISummaryCardProps } from "@/types";
import { cardBodyTypes } from "@/utils/enums";
import { formatCompactNumber } from "@/utils/helpers";
import SummaryCardLayout from "./layout";

const SummaryCard = (props: ISummaryCardProps) => {
  if (props) {
    const {
      cardStyle,
      cardType,
      cardHeaderTitle,
      cardHeaderContent,
      cardBodyType,
      cardBodyContent,
      cardBodyLongContent,
      cardFooterContent,
      cardClickEvent,
      cardTooltip,
    } = props;

    return (
      <SummaryCardLayout style={cardStyle} type={cardType} typeData={{ clickEvent: cardClickEvent }} tooltip={cardTooltip}>
        {cardHeaderTitle && (
          <div className="p-2 flex justify-between">
            <h1 className="text-lg font-bold">{cardHeaderTitle}</h1>
            <h1 className="text-lg font-bold">{cardHeaderContent}</h1>
          </div>
        )}
        <div className="p-4">
          <SummaryContent
            cardBodyType={cardBodyType}
            cardBodyContent={cardBodyContent}
            cardBodyLongContent={cardBodyLongContent}
          />
          {cardFooterContent &&
            <div className="pt-2 flex justify-end">
              {cardFooterContent}
            </div>}
        </div>
      </SummaryCardLayout>
    );
  } else return null;
};

const SummaryContent = (props: ISummaryCardContentProps) => {
  const {
    cardBodyType,
    cardBodyContent,
    cardBodyLongContent,
  } = props;
  if (cardBodyType === cardBodyTypes.NUMBER) {
    return (
      <h1 title={cardBodyContent.toString()} className="text-5xl font-bold">
        {formatCompactNumber(cardBodyContent.toString())}
      </h1>
    );
  } else if (cardBodyType === cardBodyTypes.STRING) {
    return (
      <h1
        title={cardBodyLongContent}
        className="text-sm h-20 overflow-hidden w-full font-bold"
      >
        {cardBodyContent}
      </h1>
    );
  } else if (cardBodyType === cardBodyTypes.ELEMENT && typeof cardBodyContent === "object") {
    return (
      <div title={cardBodyLongContent}>
        {cardBodyContent}
      </div>
    );
  } else return null;
};

export default SummaryCard;
