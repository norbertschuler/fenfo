import React, { Component } from 'react';
import { Alert, AppRegistry, Animated, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Sound from 'react-native-sound';

const colors = ['green', 'red', 'blue', 'yellow'];
var moves = [];

const win = new Sound('win.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('failed to load the sound', error);
    return;
  }
});
const fail = new Sound('fail.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.error('failed to load the sound', error);
    return;
  }
});

export default class Fenfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPosition: 0, currentLevel:0 };
    }

    // initialize the game
    initGame(level) {
        // clear the game with nothing or the first step
        if (level <= 1) {
            moves = [];
            for (var i = 0; i < level; i++) {
                moves[i] = colors[getRandomInt(0, 3)];
            }
        // add next step to the game
        } else {
            moves[level-1] = colors[getRandomInt(0, 3)];
        }
        this.setState( { currentPosition: 0, currentLevel: level } );
    }

    componentDidMount() {
        this.initGame(0);
    }

    // start a new game
    onPressStartButton() {
        this.initGame(1);
        this.animateGame();
    }

    // check the buttons pressed by the player
    onPressButton(color) {
        // correct button pressed?
        if (moves[this.state.currentPosition] == color) {
            // button for last move correctly pressed?
            if (this.state.currentPosition + 1 === moves.length) {
                win.setVolume(0.5).play();
                this.initGame( this.state.currentLevel + 1 );
                this.animateGame();
            // button within the game correctly pressed?
            } else {
                this.setState( { currentPosition: this.state.currentPosition + 1, currentLevel: this.state.currentLevel } );
            }
        }
        else {
            fail.setVolume(1).play();
            alert("You lost, please try again!");
            this.initGame(0);
        }
        this.animatedButton(color);
    }

    // show the buttons to remember
    async animateGame() {
        await sleep(1000);
        for (var i = 0; i < moves.length; i++) {
            this.animatedButton(moves[i]);
            await sleep(800);
        }
    }

    animatedButton(color) {
        switch (color) {
        case 'green':
            this._greenButton.highlight();
            break;
        case 'red':
            this._redButton.highlight();
            break;
        case 'blue':
            this._blueButton.highlight();
            break;
        case 'yellow':
            this._yellowButton.highlight();
            break;
        }
    }

    render() {
        return (
            <View style = { styles.container }>
                <View style = { styles.gamebox } >
                    <TouchableHighlight onPress={this.onPressButton.bind(this,'green')} underlayColor="black">
                        <SensoButton ref={component => this._greenButton = component} style={ styles.green } />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton.bind(this,'red')} underlayColor="black">
                        <SensoButton ref={component => this._redButton = component} style={ styles.red } />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton.bind(this,'blue')} underlayColor="black">
                        <SensoButton ref={component => this._blueButton = component} style={ styles.blue } />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressButton.bind(this,'yellow')} underlayColor="black">
                        <SensoButton ref={component => this._yellowButton = component} style={ styles.yellow } />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressStartButton.bind(this)} underlayColor="black">
                        <View style={ styles.startbox }>
                            <Text style={ styles.starttext }>Start</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
        // debug with: <Text style={ styles.starttext }>Start ({this.state.currentPosition},{this.state.currentLevel})</Text>

    }
}

class SensoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1),
        }
    }

    highlight() {
        Animated.sequence(
            [
                Animated.timing( this.state.fadeAnim, { toValue: 0, duration: 100, } ),
                Animated.timing( this.state.fadeAnim, { toValue: 1, duration: 100, } )
            ]
        ).start();
    }

    render() {
        let { fadeAnim } = this.state;
        return (
            <Animated.View style={ { opacity: fadeAnim } } >
                <View style={ [styles.buttonbox, this.props.style] } />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gamebox: {
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 340,
        height: 410,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonbox: {
        width: 125,
        height: 125,
        margin: 15,
        borderRadius: 50,
    },
    green: {
        backgroundColor: 'green',
    },
    red: {
        backgroundColor: 'red',
    },
    blue: {
        backgroundColor: 'blue',
    },
    yellow: {
        backgroundColor: 'yellow',
    },
    startbox: {
        width: 120,
        height: 60,
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'white',
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    starttext: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    }
});

AppRegistry.registerComponent('fenfo', () => Fenfo)

// helper functions

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}