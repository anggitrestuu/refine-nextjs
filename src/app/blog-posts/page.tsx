"use client";

import { Box, Typography, Button } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";

import { List as ListCustom } from "@components/crud/list";
import React from "react";

export default function BlogPostList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      dataGridProps?.rows
        ?.map((item: any) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "content",
        flex: 1,
        headerName: "Content",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          if (!value) return "-";
          return (
            <Typography
              component="p"
              whiteSpace="pre"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {value}
            </Typography>
          );
        },
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 160,
        display: "flex",
        valueGetter: (_, row) => {
          const value = row?.category;
          return value;
        },
        renderCell: function render({ value }) {
          return categoryIsLoading ? (
            <>Loading...</>
          ) : (
            categoryData?.data?.find((item) => item.id === value?.id)?.title
          );
        },
      },
      {
        field: "status",
        headerName: "Status",
        minWidth: 80,
        display: "flex",
      },
      {
        field: "createdAt",
        headerName: "Created at",
        minWidth: 120,
        display: "flex",
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    [categoryData, categoryIsLoading]
  );

  return (
    <>
      <Typography variant="h1" sx={{ mb: 1 }}>
        H1 Blog Posts
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        H2 Blog Posts
      </Typography>
      <Typography variant="h3" sx={{ mb: 1 }}>
        H3 Blog Posts
      </Typography>
      <Typography variant="h4" sx={{ mb: 1 }}>
        H4 Blog Posts
      </Typography>
      <Typography variant="h5" sx={{ mb: 1 }}>
        H5 Blog Posts
      </Typography>

      <Typography variant="h6" sx={{ mb: 1 }}>
        H6 Blog Posts
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Subtitle1 Blog Posts
      </Typography>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Subtitle2 Blog Posts
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        Body1 Blog Posts
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Body2 Blog Posts
      </Typography>

      <Typography variant="caption" sx={{ mb: 1 }}>
        Caption Blog Posts
      </Typography>

      <Typography variant="overline" sx={{ mb: 1 }}>
        Overline Blog Posts
      </Typography>

      <Typography variant="button" sx={{ mb: 1 }}>
        Button Blog Posts
      </Typography>

      <ListCustom>
        <DataGrid
          sx={{
            borderRadius: 1,
          }}
          {...dataGridProps}
          columns={columns}
        />
      </ListCustom>
      <Box sx={{ py: 2 }} />
      <List
        createButtonProps={{
          name: "Create Blog Post",
          title: "Create Blog Post",
          href: "/blog-posts/createsss",
        }}
      >
        <DataGrid {...dataGridProps} columns={columns} />
      </List>
    </>
  );
}
