import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import { database } from "./Firebase";

function Comments({ postData }) {
  const [comments, setComments] = useState(null);

  const fetchComments = async () => {
    let arr = [];
    for (let i = 0; i < postData.commments.length; i++) {
      let data = await database.comments.doc(postData.commments[i]).get();
      arr.push(data.data());
    }
    return arr;
  };

  useEffect(() => {
    const comms = fetchComments();
    setComments(comms);
  }, [postData]);

  return (
    <div>
      {comments == null ? (
        <CircularProgress />
      ) : (
        <>
          {comments.map((comment, index) => (
            <div style={{ display: "flex" }}>
              <Avatar src={comment.uProfileImage} />
              <p>
                &nbsp;&nbsp;
                <span style={{ fontWeight: "bold" }}>{comment.uName}</span>
                &nbsp;&nbsp; {comment.text}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
