import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const proConstDiscusserStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
    `,
      },
      {
        role: 'user',
        content: options.prompt,
      },
    ],
    model: 'gpt-4',
  });
};
