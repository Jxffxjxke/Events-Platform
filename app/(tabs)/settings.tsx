import { ScrollView } from "react-native";
import {
  SettingsDividerShort,
  SettingsDividerLong,
  SettingsEditText,
  SettingsCategoryHeader,
  SettingsSwitch,
  SettingsPicker,
} from "react-native-settings-components";

const settings = () => {
  const userDetails = {
    username: "Jake",
    name: "Jake Whittaker",
    email: "jj.whittaker01@gmail.com",
    userPasswordLength: 10,
  };
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
      />
      <SettingsDividerLong />
      <SettingsEditText
        title="Name"
        dialogDescription={"Enter your full name"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={userDetails.name}
      />
      <SettingsDividerLong />
      <SettingsEditText
        title="Email"
        dialogDescription={"Enter your email"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={userDetails.email}
      />
      <SettingsEditText
        title="Password"
        dialogDescription={"Change your password"}
        valuePlaceholder="..."
        negativeButtonTitle={"Cancel"}
        buttonRightTitle={"Save"}
        value={'*'.repeat(userDetails.userPasswordLength)}
      />
    </ScrollView>
  );
};

export default settings;
