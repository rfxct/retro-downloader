
module.exports = {
  nitro: {
    outputDir: './output/nitro',
    threads: 5,
    libraries: [
      {
        name: 'figure',
        enabled: true,
        data: 'https://images.habblet.city/gamedata/avatar/FigureMap.json',
        folder: 'https://images.habblet.city/libraries/figure/%asset%.nitro'
      },
      {
        name: 'effect',
        enabled: true,
        data: 'https://images.habblet.city/gamedata/avatar/EffectMap.json',
        folder: 'https://images.habblet.city/libraries/effect/%asset%.nitro'
      }
    ]
  },
  flash: {

  }
}
