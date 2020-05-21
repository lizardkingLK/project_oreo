import React, { useState } from 'react';
import {
    Collapse,
    Card,
    CardBody
} from 'reactstrap';

const CategoryMenuA = (props) => {
    const { collapseState, categoryType, btnStyle, collapseStyle, cardStyle, cardBodyStyle, categoryStyle, categories, getCategoryItems } = props;
    const [isOpen, setIsOpen] = useState(collapseState);
    const toggleCollapse = () => setIsOpen(!isOpen);

    const getItems = (c) => {
        if(categoryType !== 'Primary')
            getCategoryItems(c);

        console.log(c);
    }

    return (
        <div>
            <div className={btnStyle} onClick={toggleCollapse}><h6>{categoryType}</h6> <i className={!isOpen ? "fa fa-angle-down" : "fa fa-angle-up"}></i></div>
            <Collapse className={collapseStyle} isOpen={isOpen}>
                <Card className={cardStyle}>
                    <CardBody className={cardBodyStyle}>
                        {categories.map(c => {
                            const name = c.categoryName.charAt(0).toUpperCase() + c.categoryName.slice(1);
                            return (
                                <p className={categoryStyle} onClick={() => getItems(c.categoryName)} key={c._id}>{name}</p>
                            )
                        })}
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default CategoryMenuA;