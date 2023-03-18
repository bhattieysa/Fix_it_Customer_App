import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  View,
  StyleSheet,
  ActivityIndicator,
  Easing,
} from 'react-native';
import  Colors  from '../constants/Colors';

class AppLoader extends React.Component {
  render() {
    const { onRequestClose, type, visible } = this.props;
    return (
      <>
      {visible==true?
              <View style={styles.container}>
                <ActivityIndicator animating size='large' color={Colors.main} />
              </View>
              :
              <></>
              
      }
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

AppLoader.propTypes = {
  onRequestClose: PropTypes.func,
};

AppLoader.defaultProps = {
  onRequestClose: () => { },
};

export default AppLoader;