import { useState } from "react";
import { ScrollView } from "react-native";
import {
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
} from "react-native-settings-components";

const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    username: "Jxffxjxke",
    name: "Jake Whittaker",
    email: "jj.whittaker01@gmail.com",
    userPasswordLength: 10,
  });
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
    >
      <SettingsCategoryHeader title={"My Account"} />
      <SettingsDividerLong />
      <SettingsEditText
        title="Username"
        dialogDescription={"Enter your username"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={userDetails.username}
        positiveButtonTitle={"username"}
      />
      <SettingsDividerLong />
      <SettingsEditText
        title="Name"
        dialogDescription={"Enter your full name"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={userDetails.name}
        positiveButtonTitle={"name"}
      />
      <SettingsDividerLong />
      <SettingsEditText
        title="Email"
        dialogDescription={"Enter your email"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={userDetails.email}
        positiveButtonTitle={"email"}
      />
      <SettingsEditText
        title="Password"
        dialogDescription={"Change your password"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={"*".repeat(userDetails.userPasswordLength)}
        positiveButtonTitle={"password"}
      />
    </ScrollView>
  );
};

export default Settings;
