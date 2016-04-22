var path = {
    src: 'app/',
    dst: 'public/'
};

module.exports = {
    sass: {
        src: path.src + 'sass/**/*.scss',
        dst: path.dst + 'css/',
        name: 'ongikar.css'
    },
    js: {
        src: path.src + 'js/**/*.js',
        dst: path.dst + 'js/',
        name: 'ongikar.min.js'
    },
    img: {
        src: path.src + 'img/**/*.*',
        dst: path.dst + 'img/'
    }
};