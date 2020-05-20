import React from 'react';
import { Spinner } from 'reactstrap';

const MySpinner = (props) => {
    const spinState = props.spinState;
    
    return (
      <div>
          <Spinner color="dark" style={{zIndex: "10", backgroundColor: "var(--secondaryAccent)", position: "absolute", top: "50vh",left: "50vw",right: "50vw", display: spinState }} />
      </div>
    );
  }
  
  export default MySpinner;