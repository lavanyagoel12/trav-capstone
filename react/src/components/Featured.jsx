import Promo from "./Promo";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Featured = (props) => {
  return (
    <>
      <h5>Featured</h5>
      {/* <div
        className="card-container d-flex flex-row justify-content-start"
        style={{ gap: "20px", padding: "20px" }}
      >
        {["a", "b"].map((promo) => (
          <Promo key={promo.id} data={promo} />
        ))}
      </div> */}

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(3)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            {/* <Item>{index + 1}</Item> */}
            <p>{index}</p>
          </Grid>
        ))}
      </Grid>
      <br />
      <br />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(4)).map((_, index) => (
          <Grid key={index} size={{ xs: 4, sm: 4, md: 6 }}>
            {/* <Item>{index + 1}</Item> */}
            <p>Genre {index}</p>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Featured;
