import React, { useEffect, useState } from "react";
import { database } from "./Firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Video from "./Video";
import "./Post.css";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import Comments from "./Comments";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Like2 from "./Like2";
import Addcomment from "./Addcomment";

function Posts({ userData, userId }) {
  const [post, setPost] = useState(null);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    let parr = [];
    const unsub = database.posts
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        parr = [];
        querySnapshot.forEach((doc) => {
          let data = { ...doc.data(), postId: doc.id };
          parr.push(data);
        });
        setPost(parr);
      });
    return unsub;
  }, []);

  return (
    <div>
      {post == null || userData == null ? (
        <CircularProgress />
      ) : (
        <div className="video-container">
          {post.map((post, index) => (
            <React.Fragment key={index}>
              <div className="videos">
                <Video src={post.pUrl} />
                <div className="fa" style={{ display: "flex" }}>
                  <Avatar alt="Remy Sharp" src={userData.profileUrl} />
                  <h4>{userData.fullName}</h4>
                </div>
                <Like userData={userData} postData={post} userId={userId} />
                <ChatBubbleIcon
                  className="chat-styling"
                  onClick={() => handleClickOpen(post.pId)}
                />
                <Dialog
                  open={open === post.pId}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullWidth={true}
                  maxWidth="md"
                >
                  <div className="modal-container">
                    <div className="video-modal">
                      <video
                        src={post.pUrl}
                        autoPlay={true}
                        muted="muted"
                        controls
                      />
                    </div>
                    <div className="comment-modal">
                      <Card className="card1" style={{ padding: "1rem" }}>
                        <Comments postData={post} />
                      </Card>
                      <Card variant="outlined" className="card2">
                        <Typography style={{ padding: "0.4rem" }}>
                          {post.likes.length === 0
                            ? ""
                            : `Liked by ${post.likes.length} users`}
                        </Typography>
                        <div style={{ display: "flex" }}>
                          <Like2
                            userData={userData}
                            postData={post}
                            userId={userId}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <Addcomment
                            userData={userData}
                            postData={post}
                            userId={userId}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </Dialog>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
