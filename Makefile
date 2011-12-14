
test:
	@NODE_ENV=test ./node_modules/expresso/bin/expresso \
	  --require should

.PHONY: test