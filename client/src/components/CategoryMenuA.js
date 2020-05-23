import React, { useState } from 'react';
import {
    Collapse,
    Card,
    CardBody
} from 'reactstrap';

const CategoryMenuA = (props) => {
    const { 
        collapseState, 
        categoryType, 
        btnStyle, 
        collapseStyle, 
        cardStyle, 
        cardBodyStyle, 
        categoryStyle, 
        categories, 
        getCategoryItems, 
        setMainCats 
    } = props;
    const [isOpen, setIsOpen] = useState(collapseState);
    const toggleCollapse = () => setIsOpen(!isOpen);

    const getItems = (c) => {
        if(categoryType !== 'Primary')
            getCategoryItems(c);
    }

    const handleCheck = (e) => {
        let arr = e.target.parentElement.parentElement.parentElement.children;
        let myArr = [];
        for(let i = 0; i<arr.length;i++) {
            let element = arr[i].children[1].children[0];
            const c = element.value.toLowerCase();
            const isC = element.checked;

            if(isC) myArr.push(c);
        };

        setMainCats(myArr);
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
                                <div className={categoryStyle} key={c._id}>
                                    <p onClick={() => getItems(c.categoryName)}>{name}</p> 
                                    {(categoryType === 'Primary')
                                    ?
                                    <p><input onChange={handleCheck} type="checkbox" value={name} /></p>
                                    :
                                    <p></p>
                                    }
                                </div>
                            )
                        })}
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default CategoryMenuA;