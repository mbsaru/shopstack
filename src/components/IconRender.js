import * as Icons from "lucide-react";

export const IconRender = (iconName, size=18, ) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent size={size} /> : null;
};