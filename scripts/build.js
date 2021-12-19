const { build } = require('esbuild');
const glob = require('glob');
const entryPoints = glob.sync('src/**/*.ts', 'src/*.ts');

build({
	entryPoints,
	outbase: './src',
	outdir: './dist',
	platform: 'node',
	logLevel: 'info',
	external: [],
	watch: false,
	target: 'es2020',
	format: 'cjs',
});
