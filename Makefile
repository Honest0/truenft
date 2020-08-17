test:
	cd ethereum; ../node_modules/.bin/truffle compile --all; ../node_modules/.bin/truffle test

start_console:
	truffle develop

compile:
	npx saddle compile

saddle:
	 npx saddle compile && npx saddle test