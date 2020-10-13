import React, { useEffect } from 'react';

export default function Teams(props) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(()=>{
        props.teams.forEach(team => {
            team.players.sort();
        });
    })
    return (
        <div>
            <h1>Teams</h1>
            {
                props.teams.map((team) => {
                    if (team.sattaLagaDiya) {
                        return (<div> <h4>{capitalizeFirstLetter(team.username.split('@')[0])} </h4><p>{team.players.map((player, index) => index === team.players.length - 1 ? (player) : (player + ", "))}</p></div>)
                    }
                    else return "";
                })
            }
            <hr />
        </div>
    )
}