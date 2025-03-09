import CustomBreadcrumbs, {
  CustomBreadcrumbsProps,
} from "@components/custom-breadcrumbs";
import Iconify from "@components/iconify";
import { Box, Button, Card, CardContent } from "@mui/material";
import {
  useRefineContext,
  useResource,
  useRouterType,
  useTranslate,
  useUserFriendlyName,
} from "@refinedev/core";
import { CreateButtonProps, ListProps } from "@refinedev/mui";

type Props = {
  title?: string;
  customBreadcrumbsProps?: CustomBreadcrumbsProps;
  children: React.ReactNode;
} & ListProps;

export const List = ({
  title,
  children,
  resource: resourceFromProps,
  createButtonProps: createButtonPropsFromProps,
  canCreate,
  headerButtonProps,
  headerButtons,
  customBreadcrumbsProps,
}: Props) => {
  const translate = useTranslate();

  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const getUserFriendlyName = useUserFriendlyName();

  const { resource, identifier } = useResource(resourceFromProps);

  console.log("resource", resource);

  const routerType = useRouterType();

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonPropsFromProps);

  const createButtonProps: CreateButtonProps | undefined = isCreateButtonVisible
    ? {
        resource: routerType === "legacy" ? resource?.route : identifier,
        ...createButtonPropsFromProps,
      }
    : undefined;

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <Button
      variant="contained"
      startIcon={<Iconify icon="eva:plus-fill" />}
      href={resource?.create?.toString() ?? `/${identifier}/create`}
      {...createButtonProps}
    >
      {createButtonProps?.title ?? "Create"}
    </Button>
  ) : null;

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
            name: "List",
          },
        ]}
        action={
          <Box display="flex" gap="16px" {...headerButtonProps}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
                    createButtonProps,
                  })
                : headerButtons
              : defaultHeaderButtons}
          </Box>
        }
        {...customBreadcrumbsProps}
      />
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
};
