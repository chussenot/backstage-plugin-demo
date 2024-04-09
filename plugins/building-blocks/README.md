# Building Blocks!

Managing reusable Continuous Integration (CI) jobs in GitHub can streamline your development workflow by allowing you to define common processes that can be shared and reused across multiple repositories or within a single repository. GitHub Actions is a powerful feature for automating these workflows directly in your GitHub repositories.

## How does it work?

### 1\. **Understand GitHub Actions**

- **Workflows**: Automated procedures that are added to your repository. They can be triggered by GitHub events such as a push, issue creation, or pull request.
- **Jobs**: Sets of steps that execute on the same runner. Jobs can run in parallel or be configured to run sequentially if they depend on each other.
- **Steps**: Individual tasks that run commands in a job. A step can be either an action or a shell command.
- **Actions**: Standalone commands that are combined into steps to create a job. Actions are the smallest portable building block of a workflow.

### 2\. **Create Reusable Workflows**

GitHub Actions allows you to define reusable workflows in a `.github/workflows` directory of a repository. These workflows can then be called from other workflows within the same repository, or from workflows in other repositories.

- **To Define a Reusable Workflow**:

  1.  Create a new `.yml` or `.yaml` file in the `.github/workflows` directory of your repository.
  2.  Define your workflow as you normally would, but consider it as a template for other workflows to use.

- **To Use a Reusable Workflow**:

  1.  In the calling workflow file, use the `uses` keyword with the path to the reusable workflow file, optionally specifying a ref (such as a branch or tag).
  2.  Pass any required inputs and set up necessary secrets or environment variables.

### 3\. **Use Marketplace Actions**

The GitHub [Marketplace](https://github.com/marketplace?type=actions) is a central hub for finding actions that have been shared by the GitHub community. You can use these actions as steps in your jobs, significantly reducing the need to write custom code for common tasks.

![Screenshot](https://0x0.st/XiFt.png)

### 4\. **Best Practices for Reusable CI Jobs**

- **Version Control**: Use tags or releases for your reusable workflows to manage versions effectively. This ensures stability across different uses.
- **Documentation**: Clearly document how your workflows should be used, including required inputs, secrets, and environment variables.
- **Modularity**: Design your workflows to be modular, allowing them to be easily combined or modified for different scenarios.

### 5\. **Example of a Reusable Workflow**

```yaml
name: Reusable CI Workflow
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "14"
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

This workflow can be reused in other repositories by referencing it using the `uses` keyword with the repository name and path to the workflow file.

## Reusable?

Including external workflows in your GitHub Actions setup allows you to reuse workflows stored in other repositories, which can significantly streamline your CI/CD pipelines by promoting reuse and reducing duplication. This feature is particularly useful when you have common CI tasks across multiple projects or when you want to use workflows maintained by others. Here's how to include external workflows in your GitHub Actions:

### 1\. **Understand Workflow Reusability**

GitHub introduced reusable workflows to allow workflows to call other workflows. This can be within the same repository or from a different repository, which can include public repositories or those within the same organization or user account.

### 2\. **Prerequisites**

- **Permissions**: Ensure you have the necessary permissions to access the external workflow. For workflows in private repositories, this usually means you need to be a collaborator or have access to the repository.
- **Tokens**: If the external workflow is in a private repository, you might need a personal access token (PAT) with the appropriate scopes, or use a GitHub App with the necessary permissions.

### 3\. **Syntax for Using External Workflows**

To call an external workflow, you use the `uses` keyword within a job in your workflow file. The syntax is as follows:

```yaml
jobs:
  call-external-workflow:
    uses: owner/repository/.github/workflows/workflow-file.yml@ref
    with:
      inputs:
        input1: value1
        input2: value2
    secrets: inherit
```

- `owner/repository` is the GitHub user or organization, and repository where the workflow is located.
- `workflow-file.yml` is the path to the workflow file.
- `@ref` specifies a branch, tag, or SHA to reference specific versions of the workflow. Using a SHA or a tag is recommended for stability.
- `inputs` are any inputs the external workflow requires. These must be defined in the called workflow.
- `secrets: inherit` specifies that the called workflow inherits all secrets from the parent workflow. Alternatively, you can pass specific secrets if needed.

### 4\. **Example Usage**

Suppose you have a common deployment workflow in a repository named `common-workflows` under the user `myorg`. The workflow file is named `deploy.yml`. To call this workflow from another repository, you would include something like the following in your `.github/workflows/main.yml` file:

```yaml
jobs:
  deploy-job:
    uses: myorg/common-workflows/.github/workflows/deploy.yml@main
    with:
      inputs:
        environment: production
    secrets: inherit
```

## Registration

Let's define something...

```yaml
apiVersion: backstage.io/v1alpha1
kind: Resource
metadata:
  name: some-workflow
  description: Reusable GitHub Actions workflow
  tags:
    - ci
    - cd
    - github-actions
  links:
    - url: https://docs.github.com/en/actions/learn-github-actions/reusing-workflows
      title: Reusing Workflows in GitHub Actions
      icon: github
      type: documentation
    - url: https://github.com/your-org/common-github-workflows
      title: Common GitHub Workflows Repository
      icon: github
      type: source-code
  path: workflows
  schema:
    title: GitHub CI/CD Workflow Blocks
    type: object
    required:
      - workflow_file_path
    properties:
      workflow_file_path:
        title: Workflow File Path
        type: string
        description: The path of the GitHub workflow file relative to the root of the repository.
        default: .github/workflows
spec:
  type: github-workflow
  lifecycle: production
  owner: delivery-team
```

Now we want to declare the type for this resource. @see the [catalog models](https://github.com/backstage/backstage/tree/master/packages/catalog-model) package.
