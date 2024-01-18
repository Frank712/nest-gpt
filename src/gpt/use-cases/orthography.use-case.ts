import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyUseCase = async (openai: OpenAI, options: Options) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
    Te serán proveídos textos en español con posibles errores ortográficos y gramáticales,
    Las palabras deben de existir en el diccionario de la Real Academia Española
    Debes responder el formato JSON,
    tu tarea es corregirlos y retornar soluciones,
    también debes de dar un porcentaje de acierto por el usuario.
    
    Si no hay errores, debes retornar un mensaje de felicitaciones.
    
    Ejemplo de salida:
    {
      userScore: number,
      errors: string[], // ['error -> solution']
      message: string, // Usa emojis y texto para felicitar al usuario
    }


    `,
      },
      {
        role: 'user',
        content: options.prompt,
      },
    ],
    model: 'gpt-4',
  });

  console.log(completion, options);
  console.log(completion.choices[0]);
  const jsonResponse = JSON.parse(completion.choices[0].message.content);
  return jsonResponse;
};
