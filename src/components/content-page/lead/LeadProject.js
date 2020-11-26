import React from 'react';

// CSS style
const projectStyle =  {
    backgroundColor: "grey",
    margin: "10rem"
}

const LeadProject = () => {
    return (
        <div className="ui container" style={projectStyle}>
            <div className="text-center" style={{color: "white"}}>View Project Details</div>
        </div>
    );
}

export default LeadProject;