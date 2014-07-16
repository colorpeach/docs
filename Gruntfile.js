module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build:{
                files:[{
                    expand: true,  
                    cwd: 'client/js',
                    src:'**/*.js',
                    dest: 'client/minjs/'
                }]
            }
        },
        jshint:{
            all:'client/js/*.js'
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // 默认任务
    grunt.registerTask('default', ['uglify','jshint']);
}