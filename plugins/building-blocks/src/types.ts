import { Entity } from '@backstage/catalog-model';

/*
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
  owner: your-org
*/

interface GitHubWorkflowSchema {
  title: string;
  type: 'object';
  required: string[];
  properties: {
    workflow_file_path: {
      title: string;
      type: 'string';
      description: string;
      default: string;
    };
  };
}

// @see Resource specification in the backstage documentation
// https://backstage.io/docs/reference/catalog-model#resource
// https://backstage.io/docs/features/software-catalog/descriptor-format#kind-resource
export type GitHubWorkflow = Entity & {
  metadata: {
    name: string;
    description: string;
    tags: string[];
    links: Array<{
      url: string;
      title: string;
      icon: string;
      type: string;
    }>;
    path: string;
    schema: GitHubWorkflowSchema;
  };
  spec: {
    type: 'github-workflow';
    lifecycle: string;
    owner: string;
    tags?: string[];
  };
};
