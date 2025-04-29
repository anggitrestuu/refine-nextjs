"use client";

import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  RefineSnackbarProvider,
  useNotificationProvider,
} from "@refinedev/mui";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { dataProvider } from "@providers/rest-data-provider";
import { authProvider } from "@providers/auth-provider/auth-provider.client";

// scroll bar
import "simplebar-react/dist/simplebar.min.css";

// theme
import ThemeProvider from "../theme";

// components
import { ThemeSettings, SettingsProvider } from "../components/settings";
import { API_URLS } from "@config-global";


export const RefineContext = (
  props: React.PropsWithChildren
) => {
  return <App {...props} />;
};

const App = (props: React.PropsWithChildren) => {

  return (
    <>
      <RefineKbarProvider>
        <SettingsProvider>
          <ThemeProvider>
            <ThemeSettings>
              <RefineSnackbarProvider>
                <Refine
                  routerProvider={routerProvider}
                  dataProvider={{
                    default: dataProvider(
                      "https://api.fake-rest.refine.dev"
                    ),
                    meridian: dataProvider(
                      API_URLS.meridianUrl
                    ),
                    heimdall: dataProvider(
                      API_URLS.heimdallUrl
                    ),
                  }}
                  notificationProvider={useNotificationProvider}
                  authProvider={authProvider}
                  resources={[
                    {
                      name: "blog_posts",
                      list: "/blog-posts",
                      create: "/blog-posts/create",
                      edit: "/blog-posts/edit/:id",
                      show: "/blog-posts/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                    {
                      name: "categories",
                      list: "/categories",
                      create: "/categories/create",
                      edit: "/categories/edit/:id",
                      show: "/categories/show/:id",
                      meta: {
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                  }}
                >
                  {props.children}
                  <RefineKbar />
                </Refine>
              </RefineSnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </SettingsProvider>
      </RefineKbarProvider>
    </>
  );
};
