import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";
import * as supabaseModule from "../../utils/supabase";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

jest.mock("../../utils/supabase", () => ({
  selectAll: jest.fn(),
  insertRecord: jest.fn(),
  deleteRecord: jest.fn(),
}));

describe("App", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test case 1
  test("タイトルが表示される", async () => {
    supabaseModule.selectAll.mockResolvedValue([]);
    render(<App />);
    const title = await screen.findByText("学習記録アプリ");
    expect(title).toBeInTheDocument();
  });

  // test case 2
  test("学習記録の登録を押すと記録が追加されている", async () => {
    const user = userEvent.setup();

    const initialRecords = [{ id: 1, title: "React動画学習", time: 2 }];
    supabaseModule.selectAll.mockResolvedValue(initialRecords);

    const newRecord = { id: 2, title: "TypeScriptを書籍で学習", time: 3 };
    supabaseModule.insertRecord.mockResolvedValue([newRecord]);

    render(<App />);

    const contentInput = await screen.findByLabelText("学習内容");
    const timeInput = screen.getByLabelText("学習時間");
    const addButton = screen.getByRole("button", { name: "登録" });

    await user.type(contentInput, "TypeScript");
    await user.clear(timeInput);
    await user.type(timeInput, "3");
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });

  // test case 3
  test("削除ボタンを押すと記録が1つ減る", async () => {
    const user = userEvent.setup();

    const initialRecords = [
      { id: 1, title: "React動画学習", time: 1 },
      { id: 2, title: "TypeScript書籍学習", time: 3 },
    ];
    supabaseModule.selectAll.mockResolvedValue(initialRecords);
    supabaseModule.deleteRecord.mockResolvedValue(true);

    render(<App />);

    const deleteButtons = await screen.findAllByRole("button", {
      name: "削除",
    });
    await user.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });

  // test case 4
  test("未入力で登録を押すとエラーが表示される", async () => {
    const user = userEvent.setup();
    supabaseModule.selectAll.mockResolvedValue([]);

    render(<App />);

    // awaitを追加
    const addButton = await screen.findByRole("button", { name: "登録" });
    await user.click(addButton);
    await waitFor(() => {
      expect(screen.getByText("登録内容に不備があります")).toBeInTheDocument();
    });
  });
});
