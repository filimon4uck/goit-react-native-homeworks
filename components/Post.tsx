import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CommentIcon from "../assets/icons/message.svg";
import MapPinIcon from "../assets/icons/map-pin.svg";
import LikeIcon from "../assets/icons/thumbs-up.svg";
import { colors, textStyles } from "../styles/global";
import ButtonSecondary from "./ButtonSecondary";

type postProps = {
  image?: ImageSourcePropType;
  title: string;
  countComments: number;
  countLikes?: number;
  location?: string;
  country?: string;
  onButtonPress: () => void;
};

const Post: React.FC<postProps> = ({
  image,
  title,
  countComments = 0,
  countLikes,
  location,
  country,
  onButtonPress,
}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.commentsLocationWrapper}>
        <View style={styles.commentsLikesWrapper}>
          <View style={styles.iconText}>
            <ButtonSecondary onButtonPress={onButtonPress}>
              <CommentIcon
                stroke={countComments > 0 ? colors.orange : colors.dark_gray}
                fill={countComments > 0 ? colors.orange : "transparent"}
              />
            </ButtonSecondary>
            <Text
              style={[
                textStyles.regularText,
                styles.iconText,
                countComments > 0
                  ? { color: colors.black }
                  : { color: colors.dark_gray },
              ]}
            >
              {countComments}
            </Text>
          </View>
          {countLikes && (
            <View style={styles.iconText}>
              <LikeIcon stroke={colors.orange} strokeWidth={1} />
              <Text
                style={[
                  textStyles.regularText,
                  styles.iconText,
                  { color: colors.black },
                ]}
              >
                {countLikes}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.location}>
          <MapPinIcon stroke={colors.dark_gray} />
          <Text style={textStyles.regularText}>
            {location && location}
            {country && country}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    width: "100%",
    gap: 8,
    marginBottom: 32,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 3 / 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    ...textStyles.regularText,
    fontFamily: "Roboto-Medium",
  },
  commentsLocationWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentsLikesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  iconText: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
