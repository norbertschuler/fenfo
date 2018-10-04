import React, { Component } from 'react';
import { Alert, AppRegistry, Animated, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

// initialize the game
const moves = ['green', 'red', 'blue', 'yellow'];

export default class Senso extends React.Component {
    constructor(props) {
        super(props);
        // this.state = { };
    }

    // check the buttons pressed by the player
    onPressButton(color) {
        this.animatedButton(color)
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

    // show the buttons to remember
    async onPressStartButton() {
        for (var i = 0; i < moves.length; i++) {
            this.onPressButton(moves[i]);
            await sleep(800);
        }
    }

    render() {
        return (
            <View>
                <View style = { styles.container } >
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
                <View style={ [styles.box, this.props.style] } />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        paddingBottom: 200,
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 120,
        height: 120,
        margin: 10,
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
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    starttext: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    }
});

AppRegistry.registerComponent('senso', () => Senso)

// helper functions

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}