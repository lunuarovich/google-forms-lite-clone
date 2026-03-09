import { beforeEach, describe, expect, it } from "vitest";
import { resolvers } from "../resolvers/index.js";
import { db } from "../store/db.js";
import { QuestionType } from "../types/index.js";

describe("resolvers", () => {
  beforeEach(() => {
    db.reset();
  });

  it("creates a form with questions", () => {
    const result = resolvers.Mutation.createForm(null, {
      title: "Survey",
      description: "Description",
      questions: [
        {
          label: "Your stack",
          type: QuestionType.MULTIPLE_CHOICE,
          required: true,
          options: ["React", "Vue"],
        },
      ],
    });

    expect(result.id).toBeTruthy();
    expect(result.questions).toHaveLength(1);
    expect(result.questions[0]?.options).toEqual(["React", "Vue"]);
  });

  it("submits a response for an existing form", () => {
    const form = db.getForms()[0];
    expect(form).toBeTruthy();

    const requiredQuestions = form.questions.filter(
      (question) => question.required,
    );
    expect(requiredQuestions.length).toBeGreaterThan(0);

    const answers = requiredQuestions.map((question) => ({
      questionId: question.id,
      value:
        question.type === QuestionType.MULTIPLE_CHOICE
          ? [question.options[0] ?? ""]
          : question.type === QuestionType.DATE
            ? ["2026-03-09"]
            : ["John"],
    }));

    const response = resolvers.Mutation.submitResponse(null, {
      formId: form.id,
      answers,
    });

    expect(response.formId).toBe(form.id);
    expect(db.getResponsesByFormId(form.id)).toHaveLength(1);
  });

  it("throws when a required answer is missing", () => {
    const form = db.getForms()[0];

    expect(() =>
      resolvers.Mutation.submitResponse(null, {
        formId: form.id,
        answers: [],
      }),
    ).toThrowError(/required/i);
  });
});
