import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Props {}

const PlayerBottomSheet = (props: Props) => {
  const dimensions = useWindowDimensions();

  const top = useSharedValue(dimensions.height);
  const gestureHandler = useAnimatedGestureHandler();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      >
        <Text>SHEEEET</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PlayerBottomSheet;
