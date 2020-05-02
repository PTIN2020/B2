import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const statusBarHeight = getStatusBarHeight();

const bottomBarHeight = 60;

export default {
  window: {
    width,
    height,
  },
  statusBar: {
    height: statusBarHeight,
  },
  bottomBar: {
    height: bottomBarHeight,
  },
  isSmallDevice: width < 375,
};