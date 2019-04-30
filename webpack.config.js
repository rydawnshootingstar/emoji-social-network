const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CSSExtract = new ExtractTextPlugin('styles.css');
const dotenv = require('dotenv');
//const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

//this is "production" on heroku deployment, set to "test" when running test script, so it will be dev otherwise
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//import key values set in config files
if(process.env.NODE_ENV === 'test'){
    dotenv.config({path: '.env.test'});
}else if(process.env.NODE_ENV === 'development'){
    dotenv.config({path: __dirname + '/.env.development'});
    console.log(process.env);
};


module.exports = (env)=> {
    const isProduction = env === 'production';

    return {
        entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname,'public','dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
           '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config')  
        }
     },
    module: {
        rules:  [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.le|c?ss$/,
            use: CSSExtract.extract({
            use: [
                //'style-loader',
                {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }
            ,
            {
                loader: 'less-loader'
            }
            
            //{
            //     loader:'sass-loader',
            //     options: {
            //         sourceMap: true
            //     }
            // }
        ],
            })
        },
        // this rule handles images
        {
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
          use: 'file-loader?name=[name].[ext]?[hash]'
        },
    
        // the following 3 rules handle font extraction
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        
        {
          test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        },
        {
        test: /\.otf(\?.*)?$/,
        use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
        }
    //end of rules
    ]
    },
    plugins: [
        CSSExtract,
        // new webpack.DefinePlugin({
        //     'process.env.FIREBASE_API_KEY' : JSON.stringify(process.env.FIREBASE_API_KEY),
        //     'process.env.FIREBASE_AUTH_DOMAIN' : JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        //     'process.env.FIREBASE_DATABASE_URL' : JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        //     'process.env.FIREBASE_PROJECT_ID' : JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        //     'process.env.FIREBASE_STORAGE_BUCKET' : JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        //     'process.env.FIREBASE_MESSAGING_SENDER_ID' : JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        //     'process.env.IMAGE_PREVIEW_KEY' : JSON.stringify(process.env.IMAGE_PREVIEW_KEY)
        // })
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed)
        }),
      ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        publicPath: '/dist/'
    }
    }
}