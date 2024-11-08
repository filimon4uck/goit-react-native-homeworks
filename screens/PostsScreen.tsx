import { StyleSheet, View } from "react-native";
import User from "../components/User";
import Post from "../components/Post";
import { commonStyles } from "../styles/global";
import { posts_data } from "../data/posts_data";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <User />
      {posts_data &&
        posts_data.map((post, index) => {
          return (
            <Post
              key={index}
              image={post.postImage}
              title={post.title}
              countComments={post.count_comments}
              location={post.location}
            />
          );
        })}
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
});
