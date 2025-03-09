import React from "react";
import {
  useMutationMode,
  useNavigation,
  useTranslate,
  useUserFriendlyName,
  useRefineContext,
  useToPath,
  useResource,
  useRouterType,
  useBack,
  useGo,
} from "@refinedev/core";
import {
  DeleteButton,
  RefreshButton,
  ListButton,
  SaveButton,
  Breadcrumb,
  type ListButtonProps,
  type RefreshButtonProps,
  type DeleteButtonProps,
  type SaveButtonProps,
  AutoSaveIndicator,
} from "@refinedev/mui";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import type { EditProps } from "@refinedev/mui";
import { Button } from "@mui/material";
import CustomBreadcrumbs, {
  CustomBreadcrumbsProps,
} from "@components/custom-breadcrumbs";

/**
 * `<Edit>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/edit} for more details.
 */

type Props = {
  title?: string;
  customBreadcrumbsProps?: CustomBreadcrumbsProps;
} & EditProps;

export const Edit: React.FC<Props> = ({
  title,
  saveButtonProps: saveButtonPropsFromProps,
  mutationMode: mutationModeProp,
  recordItemId,
  children,
  deleteButtonProps: deleteButtonPropsFromProps,
  canDelete,
  resource: resourceFromProps,
  isLoading = false,
  breadcrumb: breadcrumbFromProps,
  dataProviderName,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  footerButtonProps,
  footerButtons,
  goBack: goBackFromProps,
  autoSaveProps,
  customBreadcrumbsProps,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();
  const { mutationMode: mutationModeContext } = useMutationMode();
  const mutationMode = mutationModeProp ?? mutationModeContext;

  const routerType = useRouterType();
  const back = useBack();
  const go = useGo();
  const { goBack, list: legacyGoList } = useNavigation();
  const getUserFriendlyName = useUserFriendlyName();

  const {
    resource,
    action,
    id: idFromParams,
    identifier,
  } = useResource(resourceFromProps);

  const goListPath = useToPath({
    resource,
    action: "list",
  });

  const id = recordItemId ?? idFromParams;

  const breadcrumb =
    typeof breadcrumbFromProps === "undefined"
      ? globalBreadcrumb
      : breadcrumbFromProps;

  const hasList = resource?.list && !recordItemId;
  const isDeleteButtonVisible =
    canDelete ??
    ((resource?.meta?.canDelete ?? resource?.canDelete) ||
      deleteButtonPropsFromProps);

  const listButtonProps: ListButtonProps | undefined = hasList
    ? {
        ...(isLoading ? { disabled: true } : {}),
        resource: routerType === "legacy" ? resource?.route : identifier,
      }
    : undefined;

  const refreshButtonProps: RefreshButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    resource: routerType === "legacy" ? resource?.route : identifier,
    recordItemId: id,
    dataProviderName,
  };

  const defaultHeaderButtons = (
    <Box display="flex" flexDirection="row" alignItems="center">
      {autoSaveProps && <AutoSaveIndicator {...autoSaveProps} />}
      {hasList && <ListButton {...listButtonProps} />}
      <RefreshButton {...refreshButtonProps} />
    </Box>
  );

  const deleteButtonProps: DeleteButtonProps | undefined = isDeleteButtonVisible
    ? ({
        ...(isLoading ? { disabled: true } : {}),
        resource: routerType === "legacy" ? resource?.route : identifier,
        mutationMode,
        variant: "outlined",
        onSuccess: () => {
          if (routerType === "legacy") {
            legacyGoList(resource?.route ?? resource?.name ?? "");
          } else {
            go({ to: goListPath });
          }
        },
        recordItemId: id,
        dataProviderName,
        ...deleteButtonPropsFromProps,
      } as const)
    : undefined;

  const saveButtonProps: SaveButtonProps = {
    ...(isLoading ? { disabled: true } : {}),
    ...saveButtonPropsFromProps,
  };

  const defaultFooterButtons = (
    <>
      {isDeleteButtonVisible && <DeleteButton {...deleteButtonProps} />}
      <SaveButton {...saveButtonProps} />
    </>
  );

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
            name: "Edit",
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
                  deleteButtonProps,
                  saveButtonProps,
                })
              : footerButtons
            : defaultFooterButtons}
        </CardActions>
      </Card>
    </>
  );
};
