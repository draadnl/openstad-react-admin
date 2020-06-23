import React from 'react';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import LightTooltip from '../LightTooltip';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

export default (props) => {
  const { csvValidationNotifications, dialogStatus } = props;

  if (dialogStatus === 'importFinished') {
    return (
      <React.Fragment>
        <Typography color="inherit">
          {
            csvValidationNotifications.map((validationError, index) => {
              return (
                <span
                  key={index}
                  style={{ color: validationError.color, display: 'block' }}
                >
                    {`${validationError.message}`}
                  </span>
              );
            })
          }
        </Typography>
      </React.Fragment>);
  }

  if (!csvValidationNotifications && csvValidationNotifications.length > 0) {
    return <></>;
  }

  return (
    <p>
      <span style={{ marginBottom: '0px', color: 'blue', display: 'inline-block' }}>
        {'Import validation alerts'}: <strong>{csvValidationNotifications.length}</strong>
      </span>
      <LightTooltip title={
        <React.Fragment>
          <Typography color="inherit">
            {
              csvValidationNotifications.map((validationError, index) => {
                return (
                  <span
                    key={index}
                    style={{ color: validationError.color, display: 'block' }}
                  >
                      {`${validationError.message}`}
                    </span>
                );
              })
            }
          </Typography>
        </React.Fragment>
      } TransitionComponent={Zoom} interactive arrow placement="top">
          <span
            style={{
              verticalAlign: 'middle',
              padding: '8px',
              cursor: 'pointer',
              color: 'blue',
            }}
            onClick={() => console.log('sss')}
          >
          <InfoOutlined/>
          </span>
      </LightTooltip>
    </p>
  );
}
