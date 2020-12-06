import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { interpolateColor } from "react-native-redash";

import Slide, { SLIDE_HEIGHT, BORDER_RADIUS } from "./Slide";
import Subslide from "./Subslide";
import Dot from "./Dot";

interface OnboardingProps {}

const { width } = Dimensions.get("window");

type SlideType = {
  title: string;
  color: string;
  alignment: "left" | "right";
  subtitle: string;
  description: string;
  picture: number;
};

const slides: SlideType[] = [
  {
    title: "Relaxed",
    color: "#BFEAF5",
    alignment: "left",
    subtitle: "Find Your Outfits",
    description:
      "Confused about your outfit? Don't worry! Find the best outfit here!",
    picture: require("../../../../assets/1.png"),
  },
  {
    title: "Playful",
    color: "#BEECC4",
    alignment: "right",
    subtitle: "Hear it First, Wear it First",
    description:
      "Hating the clothes in your wardrobe? Explore hundres of outfit ideas",
    picture: require("../../../../assets/1.png"),
  },
  {
    title: "Eccentric",
    color: "#FFE4D9",
    alignment: "left",
    subtitle: "Your style, Your Way",
    description:
      "Create your individual & unique style and look amazing everyday",
    picture: require("../../../../assets/1.png"),
  },
  {
    title: "Funky",
    color: "#FFDDDD",
    alignment: "right",
    subtitle: "Look Good, Feel Good",
    description:
      "Discover the latest trends in fashion and explore your personality",
    picture: require("../../../../assets/1.png"),
  },
];

const Onboarding: React.FC<OnboardingProps> = () => {
  const x = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset }) => {
      x.value = contentOffset.x;
    },
  });

  const backgroundColor = useDerivedValue(() =>
    interpolateColor(
      x.value,
      slides.map((_, i) => i * width),
      slides.map((slide) => slide.color),
    ),
  );

  const sliderStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const footerStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const footerContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -x.value }],
  }));

  const currentIndex = useDerivedValue(() => x.value / width);

  const scrollRef = useRef<Animated.ScrollView>(null);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, sliderStyle]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={onScroll}>
          {slides.map(({ title, alignment, picture }, index) => (
            <Slide key={index} {...{ title, alignment, picture }} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={[{ ...StyleSheet.absoluteFillObject }, footerStyle]}
        />
        <View style={[styles.footerContent]}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot key={index} {...{ index, currentIndex }} />
            ))}
          </View>
          <Animated.View
            style={[
              { width: width * slides.length, flexDirection: "row" },
              footerContentStyle,
            ]}>
            {slides.map(({ subtitle, description }, index) => (
              <Subslide
                key={index}
                onPress={() => {
                  if (scrollRef.current) {
                    scrollRef.current
                      .getNode()
                      .scrollTo({ x: width * (index + 1), animated: true });
                  }
                }}
                last={index === slides.length - 1}
                {...{ subtitle, description }}
              />
            ))}
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  slider: {
    height: SLIDE_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: {
    flex: 1,
    backgroundColor: "black",
  },
  footerContent: {
    flex: 1,
    paddingTop: BORDER_RADIUS / 2,
    backgroundColor: "white",
    borderTopLeftRadius: BORDER_RADIUS,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: BORDER_RADIUS,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
