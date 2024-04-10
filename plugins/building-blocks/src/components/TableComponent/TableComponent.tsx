import React, { useState, useEffect } from 'react';
import { useApi } from '@backstage/core-plugin-api';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { Page, Content, Progress, Table, TableColumn } from '@backstage/core-components';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { GitHubWorkflow } from '../../types';
import { Link } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';

export const TableComponent = () => {
  const catalogApi = useApi(catalogApiRef);
  const [workflows, setWorkflows] = useState<GitHubWorkflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<GitHubWorkflow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

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
        setLoading(false);
      }
    };

    fetchWorkflows();
    return () => { mounted = false; };
  }, [catalogApi]);

  const columns: TableColumn<GitHubWorkflow>[] = [
    { title: 'Name', field: 'metadata.name' },
    { title: 'Owner', field: 'spec.owner' },
    // Other columns as needed
  ];

  const handleRowClick = (event: React.MouseEvent, workflow: GitHubWorkflow) => {
    setSelectedWorkflow(workflow);
    navigate(`building-blocks/${workflow.metadata.name}`);
  };

  const handleCloseDialog = () => {
    setSelectedWorkflow(null);
    navigate('building-blocks');
  };

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return <div>Error loading workflows: {error.message}</div>;
  }

  return (
    <Page>
      <Content>
        <Table
          title="Workflows"
          options={{ search: true, paging: true, pageSize: 5 }}
          columns={columns}
          data={workflows}
          onRowClick={handleRowClick}
        />
        <Dialog
          open={!!selectedWorkflow}
          onClose={handleCloseDialog}
          aria-labelledby="workflow-dialog-title"
        >
          <DialogTitle id="workflow-dialog-title">{selectedWorkflow?.metadata.name}</DialogTitle>
          <DialogContent>
            <div>Description: {selectedWorkflow?.metadata.description}</div>
            <div>Owner: {selectedWorkflow?.spec.owner}</div>
            <div>Tags: {selectedWorkflow?.metadata.tags.join(', ')}</div>
            <br />
            <Typography variant="h7">Links:</Typography>
            {selectedWorkflow?.metadata.links.map((link, index) => (
              <div key={index}>
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </Link>
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      </Content>
    </Page>
  );
};
