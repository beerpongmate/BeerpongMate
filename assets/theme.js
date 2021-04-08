import { Platform } from 'react-native';

export default {
  colors: {
    primary: "black",
    tableOuterBorder: "#616163",
    tableInnerBorder: "#fff",
    cupRed: '#d12440',
    cupBlue: '#1c52b0'
  },
  components: {
    text: {
      fontFamily: Platform.OS === 'ios' ? 'Rubik' : 'Rubik-Medium'
    }
  }
};
