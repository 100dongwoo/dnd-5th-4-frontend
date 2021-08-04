module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    alias: {
                        Fonts: './assets/fonts',
                        Images: './assets/images',
                        layout: './src/layout',
                        components: './src/components',
                        styles: './src/styles',
                        pages: './src/pages',
                    },
                },
            ],
        ],
    };
};
