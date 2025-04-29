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
                    frost: dataProvider(
                      API_URLS.frostUrl
                    ),
                  }}
                  notificationProvider={useNotificationProvider}
                  authProvider={authProvider}
                  resources={[
                    {
                      name: "home",
                      list: "/home",
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
