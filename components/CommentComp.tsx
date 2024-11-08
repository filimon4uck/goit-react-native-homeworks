import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, textStyles } from "../styles/global";
import { comments_data } from "../data/comments_data";

type CommentCompProps = {
  image: ImageSourcePropType;
  text: string;
  date: string;
  isEven: boolean;
};

const CommentComp: React.FC<CommentCompProps> = ({
  image,
  text,
  date,
  isEven,
}) => {
  return (
    <View
      style={isEven ? styles.commentContainer : styles.commentContainerEven}
    >
      <View style={styles.commentImage}>
        <Image source={image} />
      </View>
      <View
        style={[
          styles.textDataWrapper,
          isEven ? styles.evenWrapper : styles.oddContainer,
          isEven ? { backgroundColor: "red" } : { backgroundColor: "blue" },
        ]}
      >
        <Text style={styles.commentText}>{text}</Text>
        <Text style={styles.commentDate}>{date}</Text>
      </View>
    </View>
  );
};

export default CommentComp;

const styles = StyleSheet.create({
  commentContainer: { flexDirection: "row", gap: 16 },
  commentContainerEven: {
    flexDirection: "row-reverse",
    gap: 16,
  },
  commentImage: {
    width: 28,
    height: 28,
    borderRadius: 100,
  },
  textDataWrapper: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.black_03,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    gap: 8,
  },
  evenWrapper: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 0,
  },
  oddContainer: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 6,
  },
  commentText: {
    ...textStyles.regularText,
    fontSize: 13,
    lineHeight: 18,
  },
  commentDate: {
    ...textStyles.regularText,
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },
});
