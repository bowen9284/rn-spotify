import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

type Props = {
  onPress: any;
  title: string;
  style?: any;
  image?: any;
  textStyle?: any;
};

const SpotifyAuthButton: React.FC<Props> = ({
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
        <View style={styles.imageLeft}>{renderButtonIcon()}</View>
      ) : null}

      <View style={styles.flex30}>
        <Text style={{ ...styles.customButtonText, ...textStyle }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SpotifyAuthButton;

const styles = StyleSheet.create({
  customButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  customButtonText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  customButtonImage: {
    marginLeft: 5,
    width: 20,
    height: 20,
  },
  imageLeft: {
    flex: 1,
    alignItems: 'flex-start',
    width: 50,
  },
  flex30: {
    flex: 30,
  },
});
