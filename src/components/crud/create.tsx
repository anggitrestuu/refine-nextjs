import React from "react";
import {
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRouterType,
  useBack,
  useResource,
} from "@refinedev/core";
import { SaveButton, type SaveButtonProps } from "@refinedev/mui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { alpha } from "@mui/system";
import type { CreateProps } from "@refinedev/mui";

import CustomBreadcrumbs, {
  CustomBreadcrumbsProps,
} from "@components/custom-breadcrumbs";
import { Button } from "@mui/material";

/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/create} for more details.
 */

type Props = {
  title?: string;
  customBreadcrumbsProps?: CustomBreadcrumbsProps;
} & CreateProps;

export const Create: React.FC<Props> = ({
  title,
  children,
  saveButtonProps: saveButtonPropsFromProps,
  resource: resourceFromProps,
  isLoading = false,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  contentProps,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
  customBreadcrumbsProps,
}) => {
  const translate = useTranslate();

  const routerType = useRouterType();
  const back = useBack();
  const { goBack } = useNavigation();
  const getUserFriendlyName = useUserFriendlyName();

  const { resource, action, identifier } = useResource(resourceFromProps);

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultFooterButtons = <SaveButton {...saveButtonProps} />;

  const getTitle = () => {
    return (
      title ??
      translate(
        `${identifier}.titles.list`,
        getUserFriendlyName(
          resource?.meta?.label ??
          resource?.options?.label ??
          resource?.label ??
          identifier,
          "plural"
        )
      )
    );
  };

  return (
    <>
      <CustomBreadcrumbs
        heading={getTitle()}
        links={[
          {
            name: getTitle(),
            href: resource?.list?.toString() ?? `/${identifier}`,
          },
          {
            name: "Create",
          },
        ]}
        action={
          typeof goBackFromProps !== "undefined" ? (
            goBackFromProps
          ) : (
            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={
                action !== "list" || typeof action !== "undefined"
                  ? routerType === "legacy"
                    ? goBack
                    : back
                  : undefined
              }
            >
              Back
            </Button>
          )
        }
        {...customBreadcrumbsProps}
      />

      <Card
        {...(wrapperProps ?? {})}
        sx={{
          position: "relative",
          ...wrapperProps?.sx,
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              // this is needed to support custom themes, dark mode etc.
              bgcolor: (theme) => alpha(theme.palette.background.paper, 0.4),
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <CardContent {...(contentProps ?? {})}>{children}</CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            padding: "16px",
          }}
          {...(footerButtonProps ?? {})}
        >
          {footerButtons
            ? typeof footerButtons === "function"
              ? footerButtons({
                defaultButtons: defaultFooterButtons,
                saveButtonProps,
              })
              : footerButtons
            : defaultFooterButtons}
        </CardActions>
      </Card>
    </>
  );
};
