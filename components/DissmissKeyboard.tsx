import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { ReactNode } from "react";

type DismissKeyboardProps = {
  children: ReactNode;
};

export const DismissKeyboard: React.FC<DismissKeyboardProps> = ({
  children,
}) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}
  >
    {children}
  </TouchableWithoutFeedback>
);
