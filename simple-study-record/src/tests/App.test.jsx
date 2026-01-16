import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import * as supabaseModule from "../../utils/supabase";

jest.mock("../../utils/supabase", () => ({
  selectAll: jest.fn(),
  insertRecord: jest.fn(),
  deleteRecord: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("タイトルが表示される", async () => {
    supabaseModule.selectAll.mockResolvedValue([]);
    render(<App />);
    const title = await screen.findByText("学習記録アプリ");
    expect(title).toBeInTheDocument();
  });
});
