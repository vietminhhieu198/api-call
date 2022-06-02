import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

interface GoBackProps {
  pageLink: string;
}

export const GoBack: React.FC<GoBackProps> = ({ pageLink }) => {
  return (
    <Container>
      <Link to={pageLink}>
        <Button
          sx={{
            marginTop: "2rem",
          }}
          color="secondary"
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Back
        </Button>
      </Link>
    </Container>
  );
};
