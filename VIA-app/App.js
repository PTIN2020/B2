import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stitch, AnonymousCredential } from "mongodb-stitch-react-native-sdk";
import { AppLoading} from "expo";

import HomeScreen from './screens/HomeScreen'
import LogInScreen from './screens/LogInScreen'

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        loggedIn: true,
        currentUserId: undefined,
        client: undefined,
        isLoadingComplete: false
      };
      this._loadClient = this._loadClient.bind(this);
  }

  _loadClient() {
    Stitch.initializeDefaultAppClient("ptin-kumnq").then(client => {
      this.setState({ client });
      this.state.client.auth
        .loginWithCredential(new AnonymousCredential())
        .then(user => {
          console.log(`Successfully logged in as user ${user.id}`);
          this.setState({ currentUserId: user.id });
          this.setState({ currentUserId: client.auth.user.id });
        })
        .catch(err => {
          console.log(`Failed to log in anonymously: ${err}`);
          this.setState({ currentUserId: undefined });
        });
    });
  }
  
  _loadResourcesAsync = async () => {
    return Promise.all([
      
    ]);
  };
  
  _handleLoadingError = error => {
    console.warn(error);
  };
  
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  componentDidMount() {
    this._loadClient();
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <NavigationContainer>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            {
              this.state.loggedIn ?
                <HomeScreen/>
              :
                <LogInScreen/>
            }
        </NavigationContainer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
