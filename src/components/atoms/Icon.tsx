import React from "react";
import { ColorValue, Image, StyleSheet, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { icons } from "../../assets/icons/index";
import { scaleHeight } from "../../utils/Responsive";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

type IconType = {
  icon: string;
  size?: number;
  color?: ColorValue;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  isLoading?: boolean;
  shimmerStyle?: ViewStyle;
};

const Icon = ({
  containerStyle,
  style,
  icon,
  size = 20,
  color,
  isLoading,
  shimmerStyle,
}: IconType) => {
  const iconDynamicStyle = getDynamicStyle({ color });
  return (
    <View style={[styles.container, style, containerStyle]}>
      <ShimmerPlaceHolder
          visible={!isLoading}
          width={scaleHeight(size)}
          height={scaleHeight(size)}
          shimmerStyle={[{ borderRadius: 4, marginBottom: 2 }, shimmerStyle]}
        >
          <Image
            source={icons[icon as keyof typeof icons]}
            style={[styles.icon, iconDynamicStyle.icon, { width: size, height: size }]}
          />
        </ShimmerPlaceHolder>
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    resizeMode: "contain",
  },
});

const getDynamicStyle = ({ color }: { color?: ColorValue }) =>
  StyleSheet.create({
    icon: {
      tintColor: color,
    },
});
