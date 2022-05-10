import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import { TextField, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";

interface MessageExample {
  primary: string;
  secondary: string;
  person: string;
  rateValue: number;
  id: string;
}

function refreshMessages(): MessageExample[] {
  const getRandomInt = (max: number) =>
    Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function TodoPost() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  const [expanded, setExpanded] = React.useState<string | false>("panel");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  //  const navigate = useNavigate();

  //   const rateValue = 3.5;
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const [searchTodo, setSearchTodo] = useState<string>("");
  const [todoResult, setTodoResult] = useState<MessageExample[]>();

  const handleChangeSearch = (event: any) => {
    setSearchTodo(event.target.value);
    let todos = [...messages];
    let searched = todos.filter(
      (todo) =>
        todo.primary.toLowerCase().includes(searchTodo.toLowerCase()) ||
        todo.secondary.toLowerCase().includes(searchTodo.toLowerCase())
    );
    setTodoResult(searched);
  };

  // useEffect(() => {
  //   setTodoResult(todoResult);
  // }, []);

  return (
    <div>
      <Typography sx={{ textAlign: "center" }} variant="h2" gutterBottom>
        Todo Posts
      </Typography>
      <hr />
      <br />
      {/* <Box
        sx={{
          // width: 200,
          ml: 69,
          display: "flex",
          alignItems: "center",
          gap: 0.5,
        }}
      > */}
      <TextField
        id="outlined-basic"
        label="Search For Posts Here..."
        onChange={handleChangeSearch}
      />
      <br />
      <br />
      <SearchIcon color="primary" />
      {/* </Box> */}
      <br />
      <br />
      <br />
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <List>
          {todoResult && !todoResult.length && (
            <Box sx={{ textAlign: "center" }}>Search Not Found</Box>
          )}
          {(todoResult ? todoResult : messages).map(
            ({ primary, secondary, person, rateValue, id }, index) => (
              <Accordion
                // TransitionProps={{ unmountOnExit: true }}
                key={index + person}
                expanded={expanded === "panel"}
                onChange={handleChange("panel")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel"
                  id={id}
                >
                  <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    Todo Post
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    See Comments and Rate
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ListItem button>
                    <Stack direction="row" spacing={2}>
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar alt="Profile Picture" src={person} />
                      </StyledBadge>
                    </Stack>
                    <ListItemText primary={primary} secondary={secondary} />
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={rateValue}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
                    </Box>
                  </ListItem>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </List>
      </Box>
    </div>
  );
}

const messageExamples: readonly MessageExample[] = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person:
      "/https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 0.5,
    id: "panel1",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person:
      "/https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 5,
    id: "panel2",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person:
      "https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 2,
    id: "panel3",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person:
      "https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 3.5,
    id: "panel4",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person:
      "https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 1,
    id: "panel5",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person:
      "https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 3,
    id: "panel6",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person:
      "/https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100",
    rateValue: 1.5,
    id: "panel7",
  },
];

export default TodoPost;
