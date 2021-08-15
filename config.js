
module.exports = {
  nitro: {
    outputDir: './output/nitro',
    enabled: true,
    threads: 5,
    libraries: [
      {
        name: 'figure',
        enabled: true,
        map: 'https://images.habblet.city/gamedata/avatar/FigureMap.json',
        folder: 'https://images.habblet.city/libraries/figure/%asset%.nitro'
      },
      {
        name: 'effect',
        enabled: true,
        map: 'https://images.habblet.city/gamedata/avatar/EffectMap.json',
        folder: 'https://images.habblet.city/libraries/effect/%asset%.nitro'
      }
    ]
  },
  flash: {
    outputDir: './output/flash',
    enabled: true,
    threads: 5,
    libraries: [
      {
        name: 'figure',
        enabled: true,
        map: 'https://images.habblet.city/library/gamedata/figuremap.xml',
        folder: 'https://images.habblet.city/library/%asset%.swf'
      },
      {
        name: 'effect',
        enabled: true, 
        map: 'https://images.habblet.city/library/effectmap.xml',
        folder: 'https://images.habblet.city/library/%asset%.swf'
      }
    ]
  }
}
