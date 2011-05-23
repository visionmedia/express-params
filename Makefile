
test:
	@NODE_ENV=test ./node_modules/.bin/expresso \
	  --require should

.PHONY: test