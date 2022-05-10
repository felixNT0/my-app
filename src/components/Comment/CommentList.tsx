import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { TodoComment } from "../../types/todo";

interface Props {
  todoId?: number;
}

function CommentList(props: Props) {
  const { todoId } = props;
  const [comments, setComments] = useState<TodoComment[]>();
  const { data, getData, setData } = useLocalStorage<TodoComment[]>();

  const handleDeleteComment = () => {
    let deleteComment = data || [];
    let commentIndex = deleteComment.findIndex((com) => com.id === todoId);
    deleteComment.splice(commentIndex, 1);
    setData("comments", deleteComment);
    setComments(deleteComment);
    getData("comments");
  };

  useEffect(() => {
    getData("comments");
  }, []);

  useEffect(() => {
    setComments(data?.filter((comment) => comment.todoId === todoId));
  }, [data]);

  return (
    <div>
      {comments && !comments.length && (
        <Box
          sx={{
            textAlign: "center",
            marginBottom:
              "0.7px                                                                                                                                                                                                                                                                                                                            ",
          }}
        >
          Sorry No comments Yet
        </Box>
      )}

      {comments?.map((com) => (
        <div key={com.id}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Stack direction="row" spacing={1}>
                  <Chip
                    avatar={
                      <Avatar
                        alt="Natacha"
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
                      />
                    }
                    label="Felix"
                    variant="outlined"
                  />
                </Stack>
              </ListItemAvatar>
              <ListItemText
                primary="Material Ui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Tsowa Ndakolo Felix
                      <p>{com.time}</p>
                    </Typography>

                    {com.comment}
                  </React.Fragment>
                }
              />
              {/* <Tooltip title="Edit Comment" placement="top">
                <EditIcon />
              </Tooltip> */}
              <Tooltip title="Delete Comment" placement="top">
                <DeleteIcon onClick={handleDeleteComment} />
              </Tooltip>
            </ListItem>
          </List>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
