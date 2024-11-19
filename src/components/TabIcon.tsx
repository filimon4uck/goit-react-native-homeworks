import React from "react";
import { colors } from "../styles/global";
import { SvgProps } from "react-native-svg";
type tabIconProps = {
  icon: React.FC<SvgProps>;
  focused: boolean;
  iconColor: string;
};
const TabIcon: React.FC<tabIconProps> = ({ icon: Icon, focused }) => {
  return <Icon stroke={focused ? colors.white : colors.dark_gray} />;
};

export default TabIcon;
