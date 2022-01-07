import {DateField, getResources, Show, Tab, TabbedShowLayout, TextField, TopToolbar, ListButton} from 'react-admin';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = (state) => {
    const resources    = getResources(state);
    const siteResource = resources.find(resource => resource.name === 'site');
    
    return {
        siteId: siteResource.options.siteId
    }
};

const SubmissionTitle = ({submission}) => {
    return <span>Submission {submission ? `#${submission.id} of form "${submission.formName}"` : ''}</span>;
}

const JsonField = (submission) => {
    const submittedData = submission && submission.record && submission.record.submittedData;
    
    return <div>
        {Object.keys(submittedData).map((key) => {
            return (
                <div className="ra-field">
                    <div className="MuiFormControl-root MuiFormControl-marginDense">
                        <label
                            className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense">
                            <span>{key}</span>
                        </label>
                        <TextField record={submittedData} source={key} label="Test"/>
                    </div>
                </div>
            );
        })}
    </div>;
}

const PostShowActions = ({ basePath }) => (
    <TopToolbar>
        <ListButton basePath={basePath} label="Back to list" />
    </TopToolbar>
);

export const SubmissionShow = withRouter(connect(mapStateToProps)((props) => {
    
    return <Show actions={<PostShowActions />} title={<SubmissionTitle/>} {...props} >
        <TabbedShowLayout>
            <Tab label="Summary">
                <TextField source="id"></TextField>
                <DateField source="createdAt"></DateField>
                <TextField source="formName"></TextField>
            </Tab>
            <Tab label="Submitted data">
                <JsonField source="submittedData"/>
            </Tab>
        </TabbedShowLayout>
    </Show>
}));
