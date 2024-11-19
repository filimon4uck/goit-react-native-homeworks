import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserData } from "../types/UserType";
import { db } from "../../config";
import { uploadFile } from "./uploadFile";
import { PostType } from "../types/postType";

export const addUser = async (userId: string, userData: UserData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, {
      merge: true,
    });
    console.log("user added", userId);
  } catch (error) {
    console.log("Adding failed", error);
  }
};

export const getUserPosts = async (userId: string) => {
  const docRef = doc(db, "posts", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("USER POSTS//////////////", docSnap.data().posts);
    return docSnap.data().posts;
  } else {
    return null;
  }
};
export const getUser = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Error load user");

    return null;
  }
};

export const updateUserAvatar = async (
  userId: string,
  uri: string,
  fileName: string | undefined
) => {
  try {
    const avatarUrl = await uploadFile(uri, "profilePictures", fileName);
    console.log("Avatar URL", avatarUrl);
    await updateDoc(doc(db, "users", userId), {
      photoURL: avatarUrl,
    });

    console.log("User avatar updated successfully:", avatarUrl);
    return avatarUrl;
  } catch (error) {
    console.error("Error updating user avatar:", error);
    throw error;
  }
};
export const addDataToFirestore = async (
  uid: string,
  userPosts: PostType[],
  {
    title,
    photoURL,
    coordinates,
    country: country,
    comments = [],
    likes = 0,
  }: PostType
): Promise<PostType | null> => {
  const url = await uploadFile(photoURL, "postsImages", title);
  const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const post = {
    id,
    title,
    photoURL: url,
    coordinates: coordinates,
    country: country,
    likes,
    comments,
  };

  try {
    await setDoc(doc(db, "posts", uid), { posts: [...userPosts, post] });
    return post;
  } catch (error) {
    console.error("Error adding doc", error);
    return null;
  }
};

export const updatePostDataInFirestore = async (
  uid: string,
  postId: string,
  updatedPostData: Partial<PostType>
) => {
  try {
    const postRef = doc(db, "posts", uid);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const posts = postSnap.data()?.posts;
      const postIndex = posts.findIndex((post: PostType) => post.id === postId);

      if (postIndex !== -1) {
        const updatedPost = { ...posts[postIndex], ...updatedPostData };
        posts[postIndex] = updatedPost;

        await setDoc(doc(db, "posts", uid), { posts: posts });

        console.log("Post updated successfully");

        return updatedPost;
      } else {
        console.log("Post not found");
        return null;
      }
    } else {
      console.log("No posts found for user");
      return null;
    }
  } catch (error) {
    console.error("Error updating post:", error);
    return null;
  }
};
