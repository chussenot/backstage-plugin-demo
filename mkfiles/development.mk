
.PHONY: setup
# Set up the development environment
setup:
	# Install Volta
	@curl https://get.volta.sh | bash

.PHONY: set-node-version set-yarn-version
# Target to set the Yarn version
set-yarn-version:
	# Install Yarn using Volta
	@volta install yarn@$(YARN_VERSION)

# Target to set the Node.js version
set-node-version:
	@volta install node@$(NODE_VERSION)

.PHONY: show-node-version show-yarn-version
# Show the currently set Node.js version
show-node-version:
	@node

# Show the currently set Yarn version
show-yarn-version:
	@yarn --version

.PHONY: dev start lint test test-all tsc prettier-check prettier
# Concurrently run the start backend and start frontend
dev:
	$(YARN_CMD) install
	$(YARN_CMD) run dev

# Run the start frontend
start:
	$(YARN_CMD) run start

# Run the linter
lint:
	$(YARN_CMD) run lint:all

# Run the test suite
test:
	$(YARN_CMD) run test

# Run the test suite and coverage
test-all:
	$(YARN_CMD) run test:all

# Run the TypeScript compiler
tsc:
	$(YARN_CMD) run tsc:full

# Run the prettier check
prettier-check:
	$(YARN_CMD) run prettier:check

# Run the prettier
prettier:
	$(YARN_CMD) run prettier . --write
