import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

type Props = {
  onPress: any;
  title: string;
  style?: any;
  image?: any;
  textStyle?: any;
};

const CustomButton: React.FC<Props> = ({
  onPress,
  title,
  style,
  image,
  textStyle,
}) => {
  const renderButtonIcon = () => {
    return <Image source={image} style={styles.customButtonImage} />;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.customButtonContainer, ...style }}
    >
      {image ? (
        <View style={styles.alignLeft}>{renderButtonIcon()}</View>
      ) : null}
      <View>
        <Text style={{ ...styles.customButtonText, ...textStyle }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customButtonContainer: {
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  customButtonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  customButtonImage: {
    width: 20,
    height: 20,
  },
  alignLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 50,
  },
});
