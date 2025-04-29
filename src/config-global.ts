// Layout

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

// API URls
export const API_URLS = {
  baseUrl: "https://api.fake-rest.refine.dev",
  meridianUrl: import.meta.env.NEXT_PUBLIC_MERIDIAN_API_URL,
  heimdallUrl: import.meta.env.NEXT_PUBLIC_HEIMDALL_API_URL,
}
