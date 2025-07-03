import React from 'react';
import { Table, Button, Space } from 'antd';
import { UrlItem } from '../services/types';

type UrlTableProps = {
  data: UrlItem[];
  onDelete: (record: UrlItem) => void;
  onUrlClick: (record: UrlItem) => void;
  isLoading: boolean
};

export const UrlTable = ({ data, onDelete, onUrlClick, isLoading}: UrlTableProps) => {
  const columns = [
    {
      title: 'Original URL',
      dataIndex: 'originalUrl',
      key: 'originalUrl',
      render: (text: string) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Short Code',
      dataIndex: 'shortCode',
      key: 'shortCode',
    },
    {
      title: 'Clicks',
      dataIndex: 'click_count',
      key: 'click_count',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: UrlItem) => (
        <Space>
          <Button danger onClick={() => onDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      rowKey="shortCode"
      loading={isLoading}
      onRow={(item)=>(
        {
          onClick: () => {
            onUrlClick(item)
          }
        }
      )}
    />
  );
};
