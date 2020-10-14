import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const CustomButton = ({ onPress, title, style, image }) => {
  console.log(style);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.customButtonContainer, ...style }}
    >
      <View style={styles.alignLeft}>
        {image ? (
          <Image source={image} style={styles.customButtonImage} />
        ) : null}
      </View>
      <View>
        <Text style={[styles.customButtonText, style.fontSize ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 8,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 5,
    height: 50,
  },
  customButtonText: {
      alignSelf: ;
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  customButtonImage: {
    width: 20,
    height: 20,
  },
  alignLeft: {
    flexDirection: 'row',
  },
});
