import React, { useState } from 'react';
import {
    Collapse,
    Card,
    CardBody
} from 'reactstrap';

const CategoryMenu = (props) => {
    const { btnStyle, collapseStyle, cardStyle, cardBodyStyle, categoryType } = props;

    const [isOpen, setIsOpen] = useState(true);
    const toggleCollapse = () => setIsOpen(!isOpen);

    return (
        <div>
            <div className={btnStyle} onClick={toggleCollapse}>Toggle</div>
            <Collapse className={collapseStyle} isOpen={isOpen}>
                <Card className={cardStyle}>
                    <CardBody className={cardBodyStyle} style={{backgroundColor: "var(--primaryDark"}}>
                        Anim pariatur cliche reprehenderit,
                        enim eiusmod high life accusamus terry richardson ad squid. Nihil
                        anim keffiyeh helvetica, craft beer labore wes anderson cred
                        nesciunt sapiente ea proident.
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}

export default CategoryMenu;