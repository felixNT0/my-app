import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShareIcon from "@mui/icons-material/Share";
import TelegramIcon from "@mui/icons-material/Telegram";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CommentReactionProps, TodoProps } from "../../types/todo";

const actions = [
  {
    icon: (
      <a href="https://web.facebook.com/">
        <FacebookIcon />
      </a>
    ),
    name: "Facebook",
  },
  {
    icon: (
      <a href="https://www.instagram.com/">
        <InstagramIcon />
      </a>
    ),
    name: "Instagram",
  },
  {
    icon: (
      <a href="https://telegram.org/">
        <TelegramIcon />
      </a>
    ),
    name: "Telegram",
  },
  {
    icon: (
      <a href="https://twitter.com/">
        <TwitterIcon />
      </a>
    ),
    name: "Twitter",
  },
];

const actionsIcon = [
  {
    icon: <ThumbUpOutlinedIcon />,
    checkedIcon: <ThumbUpIcon />,
    count: 0,
    name: "Likes",
  },
  {
    icon: <ThumbDownAltOutlinedIcon />,
    checkedIcon: <ThumbDownAltIcon />,
    count: 0,
    name: "UnLikes",
  },
  {
    icon: <FavoriteBorderOutlinedIcon />,
    checkedIcon: <FavoriteOutlinedIcon />,
    count: 0,
    name: "Favorites",
  },
];

interface Props {
  todoId?: number;
  todo: TodoProps;
}

export default function TodoActionButtons(props: Props) {
  const { todoId, todo } = props;

  const [icon, setIcon] = useState(actionsIcon);

  const [reactOnComment, setReactOnComment] =
    useState<CommentReactionProps[]>();
  const { data, getData, setData } = useLocalStorage<CommentReactionProps[]>();

  const handleChange = (event: any) => {
    setIcon((prev) => ({ ...prev, [event.target.value]: event.target.value }));
  };

  const handleReactionsOnComment = (e: any) => {
    e.preventDefault();

    let reaction = data || [];
    let commentReaction = reaction.concat([
      {
        count: +1,
        id: Math.random(),
        todoId: todo.id,
      },
    ]);

    console.log(commentReaction);
    // setActionsIcon(reaction)
    setData("reactionOnComment", commentReaction);
    getData("reactionOnComment");

    // setActionsIcon();
  };

  useEffect(() => {
    getData("reactionOnComment");
  }, []);

  useEffect(() => {
    setReactOnComment(data?.filter((comment) => comment.todoId === todoId));
  }, [data]);
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      {icon.map((icon, index) => (
        <Fab key={index}>
          <Checkbox {...icon} onClick={handleReactionsOnComment} />
        </Fab>
      ))}

      <Fab>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: -0.1, right: -0.1 }}
          icon={<ShareIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Fab>
      <Box
        sx={{
          display: "inline-flex",
          gap: "15px",
        }}
      >
        {reactOnComment?.map((icon) => (
          <div>{icon.count}</div>
        ))}
        {icon.map((icon) => (
          <div>
            {/* {icon.count} */}
            {icon.name}
          </div>
        ))}
      </Box>
    </Box>
  );
}
