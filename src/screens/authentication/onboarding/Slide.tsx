import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

interface SlideProps {
  title: string;
  alignment: "left" | "right";
}

const { width, height } = Dimensions.get("window");
export const SLIDE_HEIGHT = 0.61 * height;

const Slide: React.FC<SlideProps> = ({ title, alignment }) => {
  const right = alignment === "right";

  const transform = [
    { translateY: (SLIDE_HEIGHT - 100) / 2 },
    { translateX: ((right ? 1 : -1) * width - (right ? 100 : -100)) / 2 },
    { rotate: right ? "-90deg" : "90deg" },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    width: width,
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
