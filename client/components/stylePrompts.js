const stylePrompts = {
  'Photo-Realistic': {
    prompt: 'photo-realistic, cinematic',
    negativePrompt: 'unrealistic, cartoonish, abstract, bad quality, low resolution'
  },
  'Gradient': {
    prompt: 'gradient, graphic design, flat background',
    negativePrompt: 'complex, detailed, busy'
  },
  'Texture': {
    prompt: 'solid background, texture, abstract',
    negativePrompt: 'objects, people, characters, pattern, abstraction'
  },
  // 'Anime': {
  //   prompt: 'in the style of anime, manga, japanese',
  //   negativePrompt: 'western, realistic'
  // },
  'Painting': {
    prompt: 'in the style of painting, oil on canvas',
    negativePrompt: 'digital, modern, abstract'
  },
  'Cartoon': {
    prompt: 'in the style of cartoon, illustration, vector art, style of pixar',
    negativePrompt: 'realistic, photo-realistic, gritty'
  },
};

export default stylePrompts;
