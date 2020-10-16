import React from 'react';


class MatchScores extends React.Component {
    serverEndpoint = require('../config.json').APIConfig.baseURL
    state = {
        data : {
            
        }
    };

    componentDidMount() {
        fetch(
            this.serverEndpoint + '/matchScores'
        ).then(response => response.json())
            .then(data => {
                this.setState({ data: data })
            })
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <div className="ms">
                { Object.keys(this.state.data).map((team) =>
                    <div className="flex">
                        <h1> {team} </h1>
                        <h4> {this.state.data[team].over} </h4>
                        <h2> {this.state.data[team].score} </h2>
                    </div>
                )
                }
            </div>
        )
    }
}



export default MatchScores;