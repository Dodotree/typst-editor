import { TinymistApp } from "../dist/index.js";

function createHttpService() {
  return {
    async post(url, payload) {
      console.info("[tinymist-host] HTTP POST", url, payload);

      // Minimal responses used by token-manager.ts and fallback.ts.
      if (url.includes("renew-ws-token")) {
        return {
          data: {
            success: true,
            token: "",
            expires_at: Math.floor(Date.now() / 1000) + 3600,
          },
        };
      }

      if (url.includes("compile")) {
        return {
          data: {
            success: false,
            diagnostics: [],
            docVersion: payload?.docVersion ?? 1,
            errors: ["No backend compiler configured in minimal host."],
          },
        };
      }

      return { data: { success: true } };
    },
  };
}

function bootTinymist() {
  const app = new TinymistApp({
    pageId: "0",
    wsToken: "",
  });

  app.setup(createHttpService());

  // Optional: expose for quick manual debugging in browser console.
  window.__tinymistApp = app;
}

bootTinymist();
