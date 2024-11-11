import { StyleSheet, View } from "react-native";
import User from "../components/User";
import Post from "../components/Post";
import { posts_data } from "../data/posts_data";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/global";

const PostsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <User outerStyles={{ paddingHorizontal: 16 }} />
      <ScrollView style={styles.postsContainer}>
        {posts_data &&
          posts_data.map((post, index) => {
            return (
              <Post
                onButtonPress={() => {
                  navigation.navigate("Comments");
                }}
                key={index}
                image={post.postImage}
                title={post.title}
                countComments={post.count_comments}
                location={post.location}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    gap: 32,
    backgroundColor: colors.white,
  },
  postsContainer: {
    gap: 32,
    paddingHorizontal: 16,
    marginBottom: 83,
  },
});
