import React from "react";
import {
  Text as RNText,
  TextStyle,
  ViewStyle,
  TextProps,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { textsizes } from "../../styles/sizes";
import { scaleHeight } from "../../utils/Responsive";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

type TextType = {
  children: React.ReactNode;

  // optional
  size?: "xxxs" | "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl";
  style?: TextStyle;
  color?: string;
  isLoading?: boolean;
  shimmerWidth?: number | string;
  shimmerHeight?: number | string;
  shimmerStyle?: ViewStyle | ViewStyle[];
};

const Text = ({
  children,
  size = "m",
  style,
  color = '',
  isLoading = false,
  shimmerWidth,
  shimmerHeight,
  shimmerStyle,
  ...textProps
}: TextProps & TextType) => {
  const showContent = !isLoading;
  return (
    <ShimmerPlaceHolder
      visible={showContent}
      height={shimmerHeight ?? scaleHeight(textsizes[size])}
      width={shimmerWidth}
      shimmerStyle={[style, shimmerStyle]}
    >
        <RNText
            style={[style, {color: `${color}`}]}
            {...textProps}
        >
            {children}
        </RNText>
    </ShimmerPlaceHolder>
  );
};

export default Text;
