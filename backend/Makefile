runserver:
	node index.js

debugserver:
	node_modules/.bin/nodemon --inspect=0.0.0.0:9231 --no-lazy dist/index.js

build:
	node_modules/.bin/babel ./src -d dist --watch