import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../styles/global";
import CommentComp from "../components/CommentComp";
import { comments_data } from "../data/comments_data";
import Input from "../components/Input";
import ArrowTopIcon from "../assets/icons/arrowTop.svg";
import ButtonSecondary from "../components/ButtonSecondary";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouteProp } from "@react-navigation/native";
import { stackParamList } from "../navigation/StackNavigator";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../store/postsSlice/selectors";
import { selectUserInfo } from "../store/authSlice/selectors";
import { formatDate } from "../helpers/dateFormat";
import { updatePostDataInFirestore } from "../utils/firestore";
import { updatePost } from "../store/postsSlice/slice";

type CommentsScreenProps = RouteProp<stackParamList, "Comments">;

const CommentsScreen = ({ route }: { route: CommentsScreenProps }) => {
  const [query, setQuery] = useState({ comment: "" });
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
  };
  const { id } = route.params;
  const posts = useSelector(selectPosts);
  const userInfo = useSelector(selectUserInfo);
  const post = posts.find((post) => post.id === id);
  const dispatch = useDispatch();
  const onSendComment = async () => {
    if (!userInfo?.photoURL || !id || !post) {
      console.error("Missing required data to send a comment");
      return;
    }
    setQuery({ comment: "" });
    const newComment = {
      avatar: userInfo?.photoURL,
      text: query.comment,
      date: formatDate(new Date()),
    };

    const updatedPost = {
      ...post,
      comments: [...post?.comments, newComment],
    };

    const res = await updatePostDataInFirestore(userInfo?.uid, id, updatedPost);
    if (res) dispatch(updatePost(res));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          enableOnAndroid={true}
          enableAutomaticScroll={Platform.OS === "ios"}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: post?.photoURL }} />
          </View>
          <View style={styles.commentsContainer}>
            {post?.comments.map((comment, index) => (
              <CommentComp
                key={index}
                isEven={index % 2 === 0}
                imageURL={comment.avatar}
                text={comment.text}
                date={comment.date}
              />
            ))}
          </View>
          <Input
            value={query.comment}
            onChangeText={onChangeHandler}
            field="comment"
            outerStyles={styles.input}
            placeholder="Коментувати..."
          >
            <ButtonSecondary
              onButtonPress={() => {
                onSendComment();
              }}
              outerStyles={styles.sendBtn}
            >
              <ArrowTopIcon />
            </ButtonSecondary>
          </Input>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: "100%",
    height: 240,
    marginBottom: 32,
  },
  image: {
    objectFit: "fill",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },
  commentsContainer: {
    marginBottom: 32,
    gap: 32,
  },
  sendBtn: {
    width: 34,
    height: 34,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
  },
  input: {
    borderRadius: 100,
  },
});
