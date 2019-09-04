import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
    input: 'src/lib/lmc-maps.js',
    output: [
        {
            file: 'dist/lmc-maps.es.js',
            format: 'es'
        },{
            file: 'dist/lmc-maps.js',
            format: 'cjs'
        },{
            file: 'dist/lmc-maps.iife.js',
            format: 'iife',
            name: 'LmcMaps',
            globals: {
                'mapbox-gl': 'mapboxgl'
            }
        }
    ],
    external: [
        'mapbox-gl'
    ],
    plugins: [
        babel(),
        commonjs(),
        resolve(),
        postcss({
            extract: 'dist/lmc-maps.css',
            extensions: ['.css', '.sass', '.scss'],
            plugins: []
        })
    ]
};
