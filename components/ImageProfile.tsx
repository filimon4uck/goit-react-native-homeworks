import { View, StyleSheet } from "react-native";
import { colors } from "../styles/global";
import Plus from "../assets/icons/Union.svg";

const ImageProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.addIcon}>
        <Plus fill={colors.orange} width={13} height={13} />
      </View>
    </View>
  );
};

export default ImageProfile;

const styles = StyleSheet.create({
  container: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: colors.gray,
    borderRadius: 16,
  },
  addIcon: {
    position: "absolute",
    bottom: 14,
    left: 107,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.orange,
  },
});
