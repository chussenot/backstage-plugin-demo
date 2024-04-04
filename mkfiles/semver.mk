# Bump the minor version using Semver
bump-minor-version:
	@latest_tag=$$(git for-each-ref --sort=-v:refname --format '%(refname:lstrip=2)' refs/tags | head -n 1); \
	if [ -z "$$latest_tag" ]; then \
		echo "No tags found in the repository."; \
	else \
		current_version=$$(echo "$$latest_tag" | sed -E 's/v([0-9]+\.[0-9]+\.[0-9]+)$$/\1/'); \
		if [ -z "$$current_version" ]; then \
			echo "Invalid tag format: $$latest_tag"; \
		else \
			major=$$(echo "$$current_version" | cut -d'.' -f1); \
			minor=$$(echo "$$current_version" | cut -d'.' -f2); \
			new_minor=$$(expr $$minor + 1); \
			new_version=$$major.$$new_minor.0; \
			echo "Bumping minor version: $$current_version -> $$new_version"; \
			git tag -a "v$$new_version" -m "Bump minor version to $$new_version"; \
			git push origin "v$$new_version"; \
		fi; \
	fi

# Bump the patch version using Semver
bump-patch-version:
	@latest_tag=$$(git for-each-ref --sort=-v:refname --format '%(refname:lstrip=2)' refs/tags | head -n 1); \
	if [ -z "$$latest_tag" ]; then \
		echo "No tags found in the repository."; \
	else \
		current_version=$$(echo "$$latest_tag" | sed -E 's/v([0-9]+\.[0-9]+\.[0-9]+)$$/\1/'); \
		if [ -z "$$current_version" ]; then \
			echo "Invalid tag format: $$latest_tag"; \
		else \
			major=$$(echo "$$current_version" | cut -d'.' -f1); \
			minor=$$(echo "$$current_version" | cut -d'.' -f2); \
			patch=$$(echo "$$current_version" | cut -d'.' -f3); \
			new_patch=$$(expr $$patch + 1); \
			new_version=$$major.$$minor.$$new_patch; \
			echo "Bumping patch version: $$current_version -> $$new_version"; \
			git tag -a "v$$new_version" -m "Bump patch version to $$new_version"; \
			git push origin "v$$new_version"; \
		fi; \
	fi
