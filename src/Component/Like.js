import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { database } from "./Firebase";

function Like({ userData, postData, userId }) {
  const [like, setLike] = useState(null);

  useEffect(() => {
    let check = postData.likes.includes(userId) ? true : false;
    console.log(check);
    setLike(check);
  }, [postData]);

  const handleLike = () => {
    if (like === true) {
      let narr = postData.likes.filter((el) => el !== userId);
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    } else {
      let narr = [...postData.likes, userId];
      database.posts.doc(postData.postId).update({
        likes: narr,
      });
    }
  };

  return (
    <div>
      {like !== null ? (
        <>
          {like === true ? (
            <FavoriteIcon
              onClick={handleLike}
              className={`icon-styling like`}
            />
          ) : (
            <FavoriteIcon
              className={`icon-styling unlike`}
              onClick={handleLike}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Like;
