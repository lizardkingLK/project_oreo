import React, { useState } from 'react';
import {
    Collapse,
    Card,
    CardBody
} from 'reactstrap';

import CategoryMenuA from './CategoryMenuA';

const CategoryMenuB = (props) => {
    const { collapseState, categoryType, btnStyle, collapseStyle, cardStyle, cardBodyStyle, categoryStyle, categories } = props;
    const [isOpen, setIsOpen] = useState(collapseState);
    const toggleCollapse = () => setIsOpen(!isOpen);
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return (
        <div>
            <div className={btnStyle} onClick={toggleCollapse}><h6>{categoryType}</h6> <i className={!isOpen ? "fa fa-angle-down" : "fa fa-angle-up"}></i></div>
            <Collapse className={collapseStyle} isOpen={isOpen}>
                <Card className={cardStyle}>
                    <CardBody className={cardBodyStyle}>
                    {alphabet.map(letter => {
                        let list = categories.filter(c => {
                            return ((c.categoryName.charAt(0)).toUpperCase() === letter) 
                        })
                        return (
                            (list.length !== 0)
                            ?
                            <CategoryMenuA key={letter}
                                collapseState={false}
                                categoryType={letter}
                                btnStyle={"itemWindowLTopBC_btn"}
                                collapseStyle={"itemWindowLTopBC_collapse"}
                                cardStyle={"itemWindowLTopBCCo_card"}
                                cardBodyStyle={"itemWindowLTopBCCoCa_body"}
                                categoryStyle={categoryStyle}
                                categories={list}
                            />
                            :
                            <div key={letter}></div>
                        )
                    })}
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default CategoryMenuB;