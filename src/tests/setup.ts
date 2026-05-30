import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Menjalankan cleanup setelah setiap tes agar DOM kembali bersih
afterEach(() => {
  cleanup();
});
