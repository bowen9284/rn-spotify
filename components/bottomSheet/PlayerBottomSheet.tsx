import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  color,
} from 'react-native-reanimated';
import FullScreenPlayer from '../player/FullScreenPlayer';

const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

interface Props {}

const PlayerBottomSheet = (props: Props) => {
  const { colors } = useTheme();

  const dimensions = useWindowDimensions();
  const top = useSharedValue(dimensions.height);
  const startingPosition = top.value;

  useEffect(() => {
    top.value = 0;
    return () => {
      top.value = startingPosition;
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd(_, context) {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height;
      } else {
        top.value = startingPosition;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
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
            backgroundColor: colors.background,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyle,
        ]}
      >
        <FullScreenPlayer />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default PlayerBottomSheet;
