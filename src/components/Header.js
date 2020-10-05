import React from 'react';

export default function Header() {
    return (
        <div style={headContainer}>
            <h1 style={{
                fontWeight: 700,
                fontStyle: "bold"
            }}>
               $ Satta Group
            </h1>
            
        </div>
    );
}

const headContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "20vh",
    textAlign:"center",
    flexDirection: "column"
};