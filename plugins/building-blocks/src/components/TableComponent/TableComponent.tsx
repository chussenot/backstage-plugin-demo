import React from 'react';
import { Typography } from '@material-ui/core';
import { useApi } from '@backstage/core-plugin-api';
import { Page, Content, Progress } from '@backstage/core-components';
import { useEffect, useState } from 'react';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GitHubWorkflow } from '../../types';

export const TableComponent = () => {
  const catalogApi = useApi(catalogApiRef);
  const [workflows, setWorkflows] = useState<GitHubWorkflow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    let mounted = true;

    const fetchWorkflows = async () => {
      try {
        const response = await catalogApi.getEntities({
          filter: { kind: 'Resource', 'spec.type': 'github-workflow' },
        });

        if (mounted) {
          setWorkflows(response.items as GitHubWorkflow[]);
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchWorkflows();

    // Cleanup function to prevent setting state on unmounted component
    return () => {
      mounted = false;
    };
  }, [catalogApi]);

  if (loading) {
    return (
      <Page>
        <Content>
          <Progress />
        </Content>
      </Page>
    );
  }

  if (error) {
    return (
      <Page>
        <Content>
          <div>Error loading workflows: {error.message}</div>
        </Content>
      </Page>
    );
  }

  if (!workflows.length) {
    return (
      <Page>
        <Content>
          <Typography variant="body1">No workflows found</Typography>
        </Content>
      </Page>
    );
  } else {
    return (
      <Page>
        <Content>
          <Typography variant="h4">Workflows</Typography>
          <br />
          <Typography variant="body1">workflows found: {workflows.length}</Typography>  
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Owner</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {workflows.map(workflow => (
                <tr key={workflow.metadata.name}>
                  <td>{workflow.metadata.name}</td>
                  <td>{workflow.spec.owner}</td>
                  <td>{workflow.metadata.tags.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Content>
      </Page>
    );
  }
};
