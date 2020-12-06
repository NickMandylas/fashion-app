import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";

interface SlideProps {
  title: string;
  alignment: "left" | "right";
  picture: number;
}

const { width, height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;
export const BORDER_RADIUS = 75;

const Slide: React.FC<SlideProps> = ({ title, alignment, picture }) => {
  const right = alignment === "right";

  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: ((right ? 1 : -1) * width - (right ? 100 : -100)) / 2 },
    { rotate: right ? "-90deg" : "90deg" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.underlay}>
        <Image source={picture} style={styles.picture} />
      </View>
      <View style={[styles.titleContainer, { transform }]}>
        <Text
          style={styles.title}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: BORDER_RADIUS,
    top: height * 0.31,
    overflow: "visible",
  },
  titleContainer: {
    height: 100,
    justifyContent: "center",
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontFamily: "SFProText-Bold",
    color: "white",
    textAlign: "center",
  },
});
