
module.exports = {
    nitro: {
        outputDir: './output/nitro',
        threads: 5,
        libraries: {
            figure: {
                key: 'libraries',
                data: 'https://images.habblet.city/gamedata/avatar/FigureMap.json',
                folder: 'https://images.habblet.city/libraries/figure/%asset%.nitro'
            },
            effect: {
                key: 'effects',
                data: 'https://images.habblet.city/gamedata/avatar/EffectMap.json',
                folder: 'https://images.habblet.city/libraries/effect/%asset%.nitro'
            }
        }
    },
    flash: {

    }
}