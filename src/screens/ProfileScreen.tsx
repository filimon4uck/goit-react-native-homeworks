import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ButtonSecondary from "../components/ButtonSecondary";
import ImageProfile from "../components/ImageProfile";
import { colors, textStyles } from "../styles/global";
import { posts_data } from "../data/posts_data";
import Post from "../components/Post";
import LogOutIcon from "../assets/icons/log-out.svg";
import { StackScreenProps } from "@react-navigation/stack";
import { stackParamList } from "../navigation/StackNavigator";
import { logout } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../store/authSlice/selectors";
import { useEffect } from "react";
import { selectPosts } from "../store/postsSlice/selectors";

type ProfileScreenProps = StackScreenProps<stackParamList, "Profile">;
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProps["navigation"]>();
  const userInfo = useSelector(selectUserInfo);
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const onLogout = async () => {
    await logout(dispatch);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/PhotoBG.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.profileContainer}>
        <ButtonSecondary onButtonPress={onLogout} outerStyles={styles.logout}>
          <LogOutIcon stroke={colors.dark_gray} />
        </ButtonSecondary>
        <Text style={styles.name}>{userInfo?.displayName}</Text>
        <ImageProfile />
        <ScrollView style={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map((post, index) => {
              return (
                <Post
                  onButtonPress={() => {
                    navigation.navigate("Comments", { id: post.id });
                  }}
                  key={index}
                  image={{ uri: post.photoURL }}
                  title={post.title}
                  countComments={post.comments.length}
                  country={post.country}
                  coordinates={post.coordinates}
                />
              );
            })
          ) : (
            <View>
              <Text>There is no posts</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    overflow: "scroll",
    gap: 32,
  },
  logout: {
    position: "absolute",
    top: 22,
    right: 16,
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: "cover",
  },
  profileContainer: {
    marginTop: 200,
    position: "relative",
    paddingTop: 92,
    width: SCREEN_WIDTH,
    height: 700,
    backgroundColor: colors.white,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
    gap: 32,
  },
  title: {
    ...textStyles.mediumText,
    textAlign: "center",
    color: colors.black,
  },
  name: {
    ...textStyles.mediumText,
    textAlign: "center",
    color: colors.black,
  },
  postsContainer: {
    gap: 32,
    paddingHorizontal: 16,
    marginBottom: 42,
  },
});
