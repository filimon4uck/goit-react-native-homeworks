import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ImageProfile from "../components/ImageProfile";
import { colors, textStyles } from "../styles/global";
import { posts_data } from "../data/posts_data";
import Post from "../components/Post";
import { ScrollView } from "react-native-gesture-handler";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/PhotoBG.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.profileContainer}>
        <Text style={styles.name}>Natali Romanova</Text>
        <ImageProfile loadedImage={true} />
        <ScrollView>
          {posts_data &&
            posts_data.map((post, index) => {
              return (
                <Post
                  key={index}
                  image={post.postImage}
                  title={post.title}
                  countComments={post.count_comments}
                  countLikes={post.likes}
                  country={post.country}
                />
              );
            })}
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

  image: {
    ...StyleSheet.absoluteFillObject,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: "cover",
  },
  profileContainer: {
    marginTop: 200,
    position: "relative",
    paddingHorizontal: 16,
    paddingTop: 92,
    width: SCREEN_WIDTH,
    height: 600,
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
});
