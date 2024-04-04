.PHONY: default help bump-backstage package build release deploy
.DEFAULT_GOAL := default
APPLICATION_FOLDER := .
DOCKER_IMAGE_NAME := backstage-demo
YARN_CMD := yarn --cwd $(APPLICATION_FOLDER)

# Source targets from makefiles directory
include mkfiles/semver.mk
include mkfiles/development.mk

# Default target to display available targets and their descriptions
default: help

# Help target to display available targets and their descriptions
help:
	@echo "Available targets:"
	## Setup targets
	@echo "  setup                   - Set up the development environment"
	@echo "  set-yarn-version        - Install Yarn using Volta"
	@echo "  set-node-version        - Set the Node.js version using Volta"
	@echo "  show-node-version       - Show the currently set Node.js version"
	@echo "  show-yarn-version       - Show the currently set Yarn version"
	## Local development targets with yarn
	@echo "  dev                     - Concurrently run the start backend and start frontend"
	@echo "  start                   - Run the start frontend"
	@echo "  lint                    - Run the linter"
	@echo "  test                    - Run the test suite"
	@echo "  test-all                - Run the test suite and coverage"
	@echo "  tsc                     - Run the TypeScript compiler"
	@echo "  prettier-check          - Run the prettier check"
	## Other targets
	@echo "  bump-backstage          - Bump Backstage packages version"
	@echo "  create-app              - Create a fresh Backstage application"
	@echo "  upgrade-cli             - Upgrate the CLI"
	@echo "  create-plugin-backend   - Create a backend plugin"
	@echo "  create-plugin-frontend  - Create a frontend plugin"
	@echo "  help                    - Display this help message"

# Create a fresh backstage application
create-app:
	@npx @backstage/create-app@latest --path $(APPLICATION_FOLDER) --skip-install

# Bump Backstage packages version
bump-backstage:
	$(YARN_CMD) backstage-cli versions:bump

# Upgrade Backstage CLI
upgrade-cli:
	$(YARN_CMD) upgrade @backstage-cli

# Create a frontend plugin package
create-plugin-frontend:
	$(YARN_CMD) backstage-cli new --select plugin

# Create a backend plugin package
create-plugin-backend:
	$(YARN_CMD) backstage-cli new --select backend-plugin

# For simple deployments, the Backstage backend has the ability to serve
# the frontend app to the browser, so you only have to build one Docker image.
build:
	@echo "VPN must be desactivated to properly build the image..."
	docker image build . -f Dockerfile --tag $(DOCKER_IMAGE_NAME):latest
