const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");


module.exports = {
    entry: './script/dicom-render.js',      // 시작 파일의 경로 명세
    output: {
        filename: 'bundle.js',              // 출력 파일의 이름
        path: path.resolve(__dirname, 'dist')// 출력 디렉토리
    },
    resolve: {
        modules: ['node_modules'],             // 모듈 검색 경로
        extensions: ['.ts', '.js', 'json', '.wasm'],
        fallback: {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "module": false
        }
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
    },
    mode: 'development',                     // 개발 모드
    module: {
        rules: [
            {
                test: /\.wasm$/,
                type: 'webassembly/async'
            }
        ]
    },
    experiments: {
        asyncWebAssembly: true
    },
    plugins: [
        new NodePolyfillPlugin()
    ]
};

