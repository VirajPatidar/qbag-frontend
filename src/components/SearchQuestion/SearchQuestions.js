import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { userData } from "../../atoms";
import axiosInstance from "../../axios";
import { useRecoilState } from "recoil";
import { resQues } from "../../atoms";

//MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";


const SearchQuestions = () => {
  const navigate = useNavigate();
  const uData = useRecoilValue(userData);

  useEffect(() => {
    if (uData.user_type === "other") {
      navigate("/dashboard/question/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialFormData = Object.freeze({
    easy: "",
    medium: "",
    hard: "",
    board: "",
    grade: "",
    subject: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const [resQ, setResQ] = useRecoilState(resQues);

  const handleChange = (e) => {

    const newState = {
      ...formData,
      [e.target.name]:
        typeof e.target.value === "string"
          ? e.target.value.trim()
          : e.target.value,
    };

    updateFormData(newState);

    console.log({ formData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`questions/retrieve`, formData)
      .then((res) => {
        console.log(res);
        setResQ(res.data);
        console.log(res.data);
        navigate("/dashboard/question/list");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  return (
    <Grid container component="main">
      <Box
        sx={{
          my: 5,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "primary.main"}}>
          <SearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Seach Questions
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Easy"
                label="Easy"
                name="easy"
                autoComplete="easy"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Medium"
                label="Medium"
                name="medium"
                autoComplete="medium"
                onChange={handleChange}
              />
            </Grid>
          <Grid item xs={12} md={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Hard"
                label="Hard"
                name="hard"
                autoComplete="hard"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="subject"
                label="Subject"
                id="Subject"
                autoComplete="subject"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="grade"
                label="Grade"
                id="Grade"
                autoComplete="grade"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Board"
                label="Board"
                name="board"
                autoComplete="board"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={(theme) => ({
                margin: theme.spacing(3, 0, 2),
                mt: 5,
                mx: "auto"
              })}
            >
              Search
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default SearchQuestions;