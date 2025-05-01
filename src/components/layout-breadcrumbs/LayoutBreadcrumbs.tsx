import React from 'react';
import { Box, Link, Stack, Typography, Breadcrumbs } from "@mui/material";
import { BreadcrumbsLinkProps } from "../custom-breadcrumbs/types";

// ----------------------------------------------------------------------

export interface LayoutBreadcrumbsLinkProps extends BreadcrumbsLinkProps {
  layout?: FlexboxLayoutDefinition;
}

export interface LayoutBreadcrumbsProps {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  action?: React.ReactNode;
  links: LayoutBreadcrumbsLinkProps[];
  sx?: object;
  switchToLayout?: (layout: FlexboxLayoutDefinition) => void;
}

export default function LayoutBreadcrumbs({
  links,
  action,
  heading,
  moreLink,
  activeLast,
  sx,
  switchToLayout,
  ...other
}: LayoutBreadcrumbsProps) {
  const lastLink = links[links.length - 1].name;

  return (
    <Box sx={{ mb: 5, ...sx }}>
      <Stack direction="row" alignItems="center">
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING */}
          {heading && (
            <Typography variant="h4" gutterBottom>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS */}
          {!!links.length && (
            <Breadcrumbs separator={<Separator />} {...other}>
              {links.map((link) => (
                <LinkItem
                  key={link.name || ""}
                  link={link}
                  activeLast={activeLast}
                  disabled={link.name === lastLink}
                  switchToLayout={switchToLayout}
                />
              ))}
            </Breadcrumbs>
          )}
        </Box>

        {action && <Box sx={{ flexShrink: 0 }}> {action} </Box>}
      </Stack>

      {/* MORE LINK */}
      {!!moreLink && (
        <Box sx={{ mt: 2 }}>
          {moreLink.map((href) => (
            <Link
              noWrap
              key={href}
              href={href}
              variant="body2"
              target="_blank"
              rel="noopener"
              sx={{ display: "table" }}
            >
              {href}
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

type LinkItemProps = {
  link: LayoutBreadcrumbsLinkProps;
  activeLast?: boolean;
  disabled: boolean;
  switchToLayout?: (layout: FlexboxLayoutDefinition) => void;
};

function LinkItem({ link, activeLast, disabled, switchToLayout }: LinkItemProps) {
  const { name, href, icon, layout } = link;

  const styles = {
    typography: "body2",
    alignItems: "center",
    color: "text.primary",
    display: "inline-flex",
    ...(disabled &&
      !activeLast && {
      cursor: "default",
      pointerEvents: "none",
      color: "text.disabled",
    }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: "inherit",
            "& svg": { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (layout && switchToLayout) {
      e.preventDefault();
      switchToLayout(layout);
    }
  };

  if (href) {
    return (
      <Link href={href} sx={styles} onClick={layout ? handleClick : undefined}>
        {renderContent}
      </Link>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}

function Separator() {
  return (
    <Box
      component="span"
      sx={{
        width: 4,
        height: 4,
        borderRadius: "50%",
        bgcolor: "text.disabled",
      }}
    />
  );
}