import { registerRootComponent } from 'expo';
import App from './App';

// This is the command that fixes the "main has not been registered" error.
registerRootComponent(App);