import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 4;
export const IMAGE_HEIGHT_SMALL = window.width / 9;

export default StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    height: 50,
    backgroundColor: 'transparent',
    marginBottom: 10
  },
  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding: 10,
    marginTop: 40,
    alignSelf: 'center'
  },
  btnStyle: {
    padding: 5,
    alignSelf: 'center',
    marginVertical: 20
  }
});
