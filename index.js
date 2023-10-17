/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Realm from 'realm';
import 'react-native-get-random-values';
import 'moment-timezone';

Realm.flags.THROW_ON_GLOBAL_REALM = true;

AppRegistry.registerComponent(appName, () => App);
