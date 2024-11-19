import { StyleSheet, Text, View } from "react-native";
import User from "../components/User";
import Post from "../components/Post";
import { posts_data } from "../data/posts_data";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../styles/global";
import { StackScreenProps } from "@react-navigation/stack";
import { stackParamList } from "../navigation/StackNavigator";
import { useSelector } from "react-redux";
import { selectPosts } from "../store/postsSlice/selectors";

type PostsScreenProps = StackScreenProps<stackParamList, "Posts">;
const PostsScreen: React.FC<PostsScreenProps> = () => {
  const navigation = useNavigation<PostsScreenProps["navigation"]>();
  const posts = useSelector(selectPosts);
  return (
    <View style={styles.container}>
      <User outerStyles={{ paddingHorizontal: 16 }} />
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
