import Reactotron from "reactotron-react-native";
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const sagaMonitorPlugin = sagaPlugin();

const reactotron = Reactotron.configure({
  name: 'SapaTour',
  // host: '192.168.1.31',
}) // controls connection & communication settings
  .use(reactotronRedux({}))
  // .use(sagaMonitorPlugin)
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

export default reactotron
export const sagaMonitor = sagaMonitorPlugin.createSagaMonitor?.();
