module.exports = {
    // ...other configurations...
    devServer: {
        // ...other devServer configurations...
        setupMiddlewares: (middlewares, devServer) => {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            // Add your middleware here if needed
            
            return middlewares;
        }
    }
};