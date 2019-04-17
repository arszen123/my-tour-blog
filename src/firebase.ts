import * as firebase from 'firebase';
import {environment} from './environments/environment';

firebase.initializeApp(environment.config.firebase);

export {firebase as firebase};
