.PHONY: build
include .env 
export

build:
	npm run build;
	scp -i $(SSH_KEY_PATH) -r build/* $(SSH_USERNAME)@$(SSH_HOST):/var/www/coca-stores ;