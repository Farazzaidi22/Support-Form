import { describe, it, expect } from "vitest";
import formReducer, { saveFormData } from "../store/formSlice";
import { FormData } from "../types/types";

describe("formSlice", () => {
  it("should return the initial state", () => {
    expect(formReducer(undefined, { type: undefined })).toEqual({ data: null });
  });

  it("should handle saveFormData", () => {
    const testFormData: FormData = {
      fullName: "Jane Doe",
      email: "jane@example.com",
      issueType: "Feature Request",
      tags: ["Backend", "Performance"],
      steps: ["Step 1", "Step 2"],
    };

    const action = saveFormData(testFormData);
    const state = formReducer(undefined, action);

    expect(state.data).toEqual(testFormData);
  });
});
