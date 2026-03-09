import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BuilderQuestion, FormDraft, QuestionType } from '../types/forms';
import { createQuestionDraft } from '../utils/questionPresets';

const initialState: FormDraft = {
  title: '',
  description: '',
  questions: [],
};

const updateQuestionAtIndex = (
  questions: BuilderQuestion[],
  questionId: string,
  updater: (question: BuilderQuestion) => BuilderQuestion,
) => questions.map((question) => (question.id === questionId ? updater(question) : question));

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    addQuestion: (state, action: PayloadAction<QuestionType>) => {
      state.questions.push(createQuestionDraft(action.payload));
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter((question) => question.id !== action.payload);
    },
    updateQuestionLabel: (state, action: PayloadAction<{ questionId: string; label: string }>) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload.questionId, (question) => ({
        ...question,
        label: action.payload.label,
      }));
    },
    updateQuestionType: (state, action: PayloadAction<{ questionId: string; type: QuestionType }>) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload.questionId, (question) => ({
        ...question,
        type: action.payload.type,
        options:
          action.payload.type === 'MULTIPLE_CHOICE' || action.payload.type === 'CHECKBOX'
            ? question.options.length > 0
              ? question.options
              : ['Option 1', 'Option 2']
            : [],
      }));
    },
    toggleQuestionRequired: (state, action: PayloadAction<string>) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload, (question) => ({
        ...question,
        required: !question.required,
      }));
    },
    addQuestionOption: (state, action: PayloadAction<string>) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload, (question) => ({
        ...question,
        options: [...question.options, `Option ${question.options.length + 1}`],
      }));
    },
    updateQuestionOption: (
      state,
      action: PayloadAction<{ questionId: string; optionIndex: number; value: string }>,
    ) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload.questionId, (question) => ({
        ...question,
        options: question.options.map((option, index) =>
          index === action.payload.optionIndex ? action.payload.value : option,
        ),
      }));
    },
    removeQuestionOption: (state, action: PayloadAction<{ questionId: string; optionIndex: number }>) => {
      state.questions = updateQuestionAtIndex(state.questions, action.payload.questionId, (question) => ({
        ...question,
        options: question.options.filter((_, index) => index !== action.payload.optionIndex),
      }));
    },
    resetBuilder: () => initialState,
    loadDraft: (_state, action: PayloadAction<FormDraft>) => action.payload,
  },
});

export const {
  setTitle,
  setDescription,
  addQuestion,
  removeQuestion,
  updateQuestionLabel,
  updateQuestionType,
  toggleQuestionRequired,
  addQuestionOption,
  updateQuestionOption,
  removeQuestionOption,
  resetBuilder,
  loadDraft,
} = formBuilderSlice.actions;

export const formBuilderReducer = formBuilderSlice.reducer;
