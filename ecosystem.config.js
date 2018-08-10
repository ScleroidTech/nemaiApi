module.exports = {
	apps: [{
		name: 'test',
		script: './servernew4.js'
	}],
	deploy: {
		production: {
			user: 'ubuntu',
			host: 'ec2-52-209-166-225.eu-west-1.compute.amazonaws.com',
			key: '~/Downloads/secureone.pem',
			ref: 'origin/master',
			repo: 'git@github.com:ganeshkaple/nemaiApi.git',
			path: '~/nemaiApi',
			'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
		}
	}
};