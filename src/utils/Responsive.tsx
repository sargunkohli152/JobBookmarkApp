import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;
  
export const scaleHeight = (height: number) => {
  return hp((height / screenHeight) * 100);
};

export const scaleWidth = (width: number) => {
  return wp((width / screenWidth) * 100);
};
  