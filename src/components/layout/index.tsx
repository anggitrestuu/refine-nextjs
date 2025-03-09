"use client";

import React from "react";
import { ThemedLayoutContextProvider } from "@refinedev/mui";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import Box from "@mui/material/Box";
import { Container, type BoxProps } from "@mui/material";
import type { RefineThemedLayoutV2Props } from "@refinedev/mui";
import { useSettingsContext } from "@components/settings";

interface ExtendedRefineThemedLayoutV2Props extends RefineThemedLayoutV2Props {
  childrenBoxProps?: BoxProps;
  containerBoxProps?: BoxProps;
}

export const ThemedLayoutV2: React.FC<ExtendedRefineThemedLayoutV2Props> = ({
  Sider,
  Header,
  Title,
  Footer,
  OffLayoutArea,
  children,
  initialSiderCollapsed,
  onSiderCollapsed,
  childrenBoxProps = {},
  containerBoxProps = {},
}) => {
  const SiderToRender = Sider ?? DefaultSider;
  const HeaderToRender = Header ?? DefaultHeader;

  const { sx: childrenSx, ...restChildrenProps } = childrenBoxProps;
  const { sx: containerSx, ...restContainerProps } = containerBoxProps;

  const { themeStretch } = useSettingsContext();

  return (
    <ThemedLayoutContextProvider
      initialSiderCollapsed={initialSiderCollapsed}
      onSiderCollapsed={onSiderCollapsed}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          minHeight: "100vh",
          ...containerSx,
        }}
        {...restContainerProps}
      >
        <SiderToRender Title={Title} />
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
              minHeight: "100vh",
              position: "relative",
              transition: "padding 0.2s ease",
            },
          ]}
        >
          <HeaderToRender />
          <Container
            maxWidth={themeStretch ? false : "lg"}
            sx={{
              py: 3,
              ...restChildrenProps,
            }}
          >
            {children}
          </Container>
          {Footer && <Footer />}
        </Box>
        {OffLayoutArea && <OffLayoutArea />}
      </Box>
    </ThemedLayoutContextProvider>
  );
};
