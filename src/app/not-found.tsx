"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { Authenticated } from "@refinedev/core";
import { Suspense } from "react";
import NextLink from "next/link";
import PageNotFoundIllustration from "../../public/assets/illustrations/PageNotFoundIllustration";

export default function NotFound() {
  return (
    <Suspense>
      <Authenticated key="not-found">
        {/* <ErrorComponent /> */}
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            height: "100vh",
          }}
        >
          <Box>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>
          </Box>

          <Box>
            <PageNotFoundIllustration
              sx={{
                height: 260,
                my: { xs: 5, sm: 10 },
              }}
            />
          </Box>

          <Button
            component={NextLink}
            href="/"
            size="large"
            variant="contained"
          >
            Go to Home
          </Button>
        </Container>
      </Authenticated>
    </Suspense>
  );
}
