const stylePrompts = {
  'Photo-Realistic': {
    prompt: 'photo-realistic, cinematic',
    negativePrompt: 'unrealistic, cartoonish, abstract, bad quality, low resolution'
  },
  'Anime': {
    prompt: 'in the style of anime, manga, japanese',
    negativePrompt: 'western, realistic'
  },
  'Logo': {
    prompt: 'in the style of logo, graphic design, minimalistic',
    negativePrompt: 'complex, detailed, busy'
  },
  'Painting': {
    prompt: 'in the style of painting, oil on canvas',
    negativePrompt: 'digital, modern, abstract'
  },
  'Cartoon': {
    prompt: 'in the style of cartoon, illustration, vector art, style of pixar',
    negativePrompt: 'realistic, photo-realistic, gritty'
  },
  'Background': {
    prompt: 'flat background, solid color',
    negativePrompt: 'objects, people, characters, pattern, texture'
  }
};

export default stylePrompts;
