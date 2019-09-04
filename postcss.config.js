module.exports = (ctx) => ({
    plugins: {
        'autoprefixer': {
            grid: 'autoplace',
            flexbox: 'no-2009',
        },
        'postcss-em-media-query': {
            precision: 3
        },
        'postcss-import': {},
        'postcss-url': {
            url: 'inline'
        },
        'cssnano': {}
    }
})
