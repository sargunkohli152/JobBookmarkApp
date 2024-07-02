import React from "react";
import { Pressable, StyleSheet, ViewStyle, ColorValue } from "react-native";
import Text from "./Text";

import { colors } from "../../styles/colors"; 
import { horizontalSpacing, verticalSpacing } from "../../styles/spacing"; 
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

type CustomButtonType = {
  children: React.ReactNode;
  onPress: () => void;
  buttonStyle?: ViewStyle | ViewStyle[];
  textColor?: ColorValue;
  textSize?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
  isLoading?: boolean;
  shimmerStyle?: ViewStyle | ViewStyle[];
  textStyle?: ViewStyle | ViewStyle[];
};

const CustomButton = ({
  children,
  onPress,
  buttonStyle,
  textSize = "m",
  isLoading = false,
  shimmerStyle,
  textStyle,
}: CustomButtonType) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  if (isLoading) {
    return <ShimmerPlaceholder shimmerStyle={[shimmerStyle, buttonStyle]} />;
  }

  return (
    <Pressable
      onPress={onPress}
      style={[ styles.button, buttonStyle ]}
    >
      <Text
        size={textSize}
        style={textStyle}
      >
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: verticalSpacing.xs,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    paddingHorizontal: horizontalSpacing.s,
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: "row",
  },
});
