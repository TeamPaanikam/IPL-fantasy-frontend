
import React from 'react';
import Checkbox from './Checkbox/Checkbox.jsx';



class SattaForm extends React.Component {
    serverEndpoint = require('../config.json').APIConfig.baseURL
    state = {
        loading: false,
        alreadySelected: this.props.alreadySelected,
        selected: 0,
        batsmen: ['Warner', 'Azim', 'Shrey'],
        bowlers: ['Warner', 'Azim', 'Shrey'],
        wk: ['Warner', 'Azim', 'Shrey'],
        allrounders: ['Warner', 'Azim', 'Shrey'],
        selectedBatsmen: [],
        selectedBowlers: [],
        selectedWK: [],
        selectedAllRounders: [],
        teams: []
        // { "bhanu": ["abd", "vk"], "shrey": ["abd", "vk"] }
    };

    componentDidMount() {
        fetch(
            this.serverEndpoint + '/players'
        ).then(response => response.json())
            .then(data => {
                if (data != null) {
                    let batsmen = [], bowlers = [], wk = [], allrounders = []
                    data.players.forEach(player => {
                        if (player.type === 'bat') {
                            batsmen.push(player.name);
                        } else if (player.type === 'bowl') {
                            bowlers.push(player.name)
                        } else if (player.type === 'wk') {
                            wk.push(player.name)
                        } else if (player.type === 'all') {
                            allrounders.push(player.name)
                        }
                    })
                    this.setState({ batsmen: batsmen, bowlers: bowlers, wk: wk, allrounders: allrounders, loading: false, teams: data.teams })
                }
            })
    }
    choose = (event) => {
        let batsmen = this.state.selectedBatsmen, bowlers = this.state.selectedBowlers, wk = this.state.selectedWK, all = this.state.selectedAllRounders, index = -1
        if (event.target.checked) {
            switch (event.target.name) {
                case 'batsmen': batsmen.push(event.target.value)
                    break
                case 'bowlers': bowlers.push(event.target.value)
                    break
                case 'wk': wk.push(event.target.value)
                    break
                case 'all': all.push(event.target.value)
                    break
                default: break
            }
            this.setState({ selectedBatsmen: batsmen, selectedBowlers: bowlers, selectedWK: wk, selectedAllRounders: all, selected: this.state.selected + 1 });
        } else {
            switch (event.target.name) {
                case 'batsmen': index = batsmen.indexOf(event.target.value)
                    if (index > -1) {
                        batsmen.splice(index, 1)
                    }

                    break
                case 'bowlers': index = bowlers.indexOf(event.target.value)
                    if (index > -1) {
                        bowlers.splice(index, 1)
                    }
                    break
                case 'wk': index = wk.indexOf(event.target.value)
                    if (index > -1) {
                        wk.splice(index, 1)
                    }
                    break
                case 'all': index = all.indexOf(event.target.value)
                    if (index > -1) {
                        all.splice(index, 1)
                    }
                    break
                default: break
            }
            this.setState({ selectedBatsmen: batsmen, selectedBowlers: bowlers, selectedWK: wk, selectedAllRounders: all, selected: this.state.selected - 1 });
        }

    }

    validate = () => {
        if (this.state.selected !== 11) {
            window.alert('Team must have 11 players')
            return false
        } else if (this.state.selectedAllRounders.length !== 2) {
            window.alert('Team must have 2 allrounders')
            return false
        } else if (this.state.selectedBatsmen.length !== 4) {
            window.alert('Team must have 4 batsmen')
            return false
        } else if (this.state.selectedBowlers.length !== 4) {
            window.alert('Team must have 4 bowlers')
            return false
        } else if (this.state.selectedWK.length !== 1) {
            window.alert('Team must have a wicketkeeper')
            return false
        }
        return true
    }

    submitSatta = () => {
        if (!this.validate()) {
            return;
        }
        fetch(
            this.serverEndpoint + '/submitSatta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': this.props.user.username,
                'token': this.props.user.token,
                'players': [...this.state.selectedBatsmen, ...this.state.selectedBowlers, ...this.state.selectedWK, ...this.state.selectedAllRounders]
            })
        }
        ).then(response => response.json())
            .then(data => {
    
                alert('Satta successful')
                this.setState({ alreadySelected: true })
            })
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            this.state.loading ? (<div>Loading, Ruk zara</div>) : (
                this.state.alreadySelected ? (<div><h1>Teams</h1>
                    {
                        this.state.teams.map((team) => {
                            if (team.sattaLagaDiya) {
                                return (<div> <h4>{this.capitalizeFirstLetter(team.username.split('@')[0])} </h4>{team.players.map((player, index) => index === team.players.length - 1 ? (player) : (player + ", "))}</div>)
                            }
                            else return "";
                        })
                    }
                    <hr /> </div>) : (
                        <div className="sattaform">
                            <form>
                                <h2>Batsmen</h2>
                                <Checkbox name={'batsmen'} options={this.state.batsmen} onChange={(event) => { this.choose(event) }} />

                                <h2>All rounders</h2>

                                <Checkbox name={'all'} options={this.state.allrounders} onChange={(event) => { this.choose(event) }} />

                                <h2> Wicket Keepers</h2>

                                <Checkbox name={'wk'} options={this.state.wk} onChange={(event) => { this.choose(event) }} />

                                <h2>Bowler</h2>

                                <Checkbox name={'bowlers'} options={this.state.bowlers} onChange={(event) => { this.choose(event) }} />

                                <button className="btn btn-satta" onClick={(event) => { event.preventDefault(); this.submitSatta() }}>Submit Satta</button>
                            </form>
                        </div>
                    )
            )
        )
    }

}


export default SattaForm;