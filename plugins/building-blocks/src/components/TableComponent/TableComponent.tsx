import React, { useEffect, useState } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { Page, Content, Progress, Table, TableColumn } from '@backstage/core-components';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { GitHubWorkflow } from '../../types';

export const TableComponent = () => {
  const catalogApi = useApi(catalogApiRef);
  const [workflows, setWorkflows] = useState<GitHubWorkflow[]>([]);
  const [loading, setLoading] = useState(true);
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
          <div>No workflows found</div>
        </Content>
      </Page>
    );
  }

  const columns: TableColumn<GitHubWorkflow>[] = [
    { title: 'Name', field: 'metadata.name' },
    { title: 'Owner', field: 'spec.owner' },
    { title: 'Tags', render: rowData => rowData.metadata.tags.join(', ') },
  ];

  return (
    <Page>
      <Content>
        <Table
          title={`Workflows (${workflows.length})`}
          options={{ search: true, paging: true, pageSize: 10 }}
          columns={columns}
          data={workflows}
        />
      </Content>
    </Page>
  );
};
