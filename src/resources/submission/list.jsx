import React, {cloneElement, Fragment} from 'react';
import {BulkDeleteButton, Datagrid, DateField, downloadCSV, Filter, Pagination, ShowButton, TextField, TextInput, TopToolbar, useListContext} from 'react-admin';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Inbox from '@material-ui/icons/Inbox';
import {ExportButton} from 'ra-ui-materialui';
import jsonExport from 'jsonexport/dist';
import {CustomList as List} from '../../components/CustomList/index.jsx';
import { exporter, ExportButtons } from '../../utils/export-buttons.jsx';

const SubmissionPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const useStyles = makeStyles(
    theme => ({
        message: {
            textAlign: 'center',
            opacity:   theme.palette.type === 'light' ? 0.5 : 0.8,
            margin:    '0 1em',
            color:
                       theme.palette.type === 'light'
                           ? 'inherit'
                           : theme.palette.text.primary,
        },
        icon:    {
            width:  '9em',
            height: '9em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
    }),
    {name: 'RaEmpty'}
);

const submissionsExporter = ( rows, type ) => {
  
  let rowsForExport = rows.map(row => {
    const {backlinks, author, ...rowForExport} = row; // omit backlinks and author
    if (rowForExport.can) {
      delete rowForExport.can;
    }
    
    const submittedData = rowForExport.submittedData;
    
    if (submittedData) {
      // Set every key in the submittedData as its' own column in the CSV data
      Object.keys(submittedData).forEach(key => {
        rowForExport[key] = submittedData[key];
      })
    }
    
    delete rowForExport.submittedData;
    
    return rowForExport;
  });

  exporter({ rowsForExport, fields: ['id', 'formName', 'status', 'createdAt'], filename: 'submissions', type })

};

const Empty = (props) => {
    const {basePath, resource} = useListContext();
    const classes              = useStyles(props);
    
    return (
        <div>
            <Box textAlign="center" m={1}>
                <div className={classes.message}>
                    <Inbox className={classes.icon}/>
                    
                    <Typography variant="h4" paragraph>
                        No submissions yet
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export const ListActions = props => {
    const {
              className,
              filters,
              permanentFilter,
              currentSort,
              resource,
              displayedFilters,
              filterValues,
              basePath,
              showFilter,
      data,
              total,
          } = props;
    
    return (
        <TopToolbar className={className}>
            {filters && cloneElement(filters, {
                resource,
                showFilter,
                displayedFilters,
                filterValues,
                context: 'button',
            })}
          <ExportButtons total={total} data={data} exporter={submissionsExporter}/>
        </TopToolbar>
    );
};

const ListBulkActionButtons = props => (
    <Fragment>
        <BulkDeleteButton undoable={false} {...props} />
    </Fragment>
);

const SubmissionFilters = (props) => (
    <Filter {...props}>
        <TextInput label="Id" source="id" defaultValue=""/>
        <TextInput label="Status" source="status" defaultValue=""/>
        <TextInput label="Form" source="formName" defaultValue=""/>
    </Filter>
);

export const SubmissionList = (props) => {
    return (
        <Fragment>
            <List {...props}
                  sort={{field: 'id', order: 'DESC'}}
                  filters={<SubmissionFilters/>}
                  actions={<ListActions/>}
                  bulkActionButtons={<ListBulkActionButtons/>}
                  exporter={exporter}
                  empty={<Empty/>}
                  pagination={<SubmissionPagination/>}
            >
                <Datagrid>
                    <TextField source="id"/>
                    <TextField source="formName"/>
                    <TextField source="status"/>
                    <DateField source="createdAt"/>
                    <ShowButton basePath="/submission"/>
                </Datagrid>
            </List>
        </Fragment>
    )
};
