import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import copy from 'rollup-plugin-copy'

export default {
    input: 'src/lib/lmc-maps.ts',
    output: [
        {
            file: 'dist/lmc-maps.js',
            format: 'es'
        },{
            file: 'dist/lmc-maps.cjs.js',
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
        typescript(),
        replace({
            TILESERVER_URL: JSON.stringify('https://tileserver.lmc.cz')
        }),
        commonjs({extensions: ['.js', '.ts']}),
        resolve(),
        postcss({
            extract: 'dist/lmc-maps.css',
            extensions: ['.css', '.sass', '.scss'],
            plugins: []
        }),
        copy({
            targets: [{
                src: 'src/lib/index.d.ts',
                dest: 'dist'
            }]
        })
    ]
};
