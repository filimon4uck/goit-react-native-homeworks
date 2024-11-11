import {
  Image,
  ImageSourcePropType,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { colors, commonStyles } from "../styles/global";
import CommentComp from "../components/CommentComp";
import { comments_data } from "../data/comments_data";
import Input from "../components/Input";
import ArrowTopIcon from "../assets/icons/arrowTop.svg";
import ButtonSecondary from "../components/ButtonSecondary";

const CommentsScreen: React.FC = () => {
  const [query, setQuery] = useState({ comment: "" });
  const onChangeHandler = (field: string, text: string) => {
    setQuery((prevState) => ({ ...prevState, [field]: text }));
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/ContentBlock.png")}
          />
        </View>
        <View style={styles.commentsContainer}>
          {comments_data.map((comment, index) => {
            return (
              <CommentComp
                key={index}
                isEven={index % 2 === 0}
                image={comment.img}
                text={comment.text}
                date={comment.date}
              />
            );
          })}
        </View>
        <Input
          value={query.comment}
          onChangeText={onChangeHandler}
          field="comment"
          outerStyles={styles.input}
          placeholder="Коментувати..."
        >
          <ButtonSecondary outerStyles={styles.sendBtn}>
            <ArrowTopIcon />
          </ButtonSecondary>
        </Input>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    gap: 32,
  },
  imageContainer: {
    width: "100%",
    height: "30%",
  },
  image: {
    objectFit: "fill",
    width: "100%",
  },
  commentsContainer: {
    gap: 24,
    width: "100%",
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
