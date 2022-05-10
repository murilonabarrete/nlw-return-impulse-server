import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,la123k3j4s5h5df5553lkjashdflkjahsdf',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,la123k3j4s5h5df5553lkjashdflkjahsdf',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });

  it('should be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,la123k3j4s5h5df5553lkjashdflkjahsdf',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });

  it('should be able to submit a feedback with invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'teste.png',
    })).rejects.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledTimes(0);
    expect(sendMailSpy).toHaveBeenCalledTimes(0);
  });
});
