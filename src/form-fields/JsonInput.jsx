import { Field } from 'react-final-form';
import React, { Component } from 'react';
import './json.style.css';

// Our app
class JsonInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonValue: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    const { fieldProps } = this.props;
    if (fieldProps) {
      const { input: { value: initialValue } } = fieldProps;
      this.setState({ jsonValue: initialValue });
    }
  }

  handleChange = (event, fieldProps) => {
    const value = event.target.value;
    this.setState({ jsonValue: value });

    try {
      const parsedJson = JSON.parse(value);
      fieldProps.input.onChange(parsedJson);
      this.setState({ errorMessage: '' });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    const { jsonValue, errorMessage } = this.state;

    return (
      <Field name={this.props.source}>
        {(fieldProps) => {
          let value = jsonValue || fieldProps.input.value || '{}';
          let lines = [];

          if ( typeof value === 'string' ) {
            try {
              const parsedValue = JSON.parse(value);
              value = JSON.stringify(parsedValue, null, 2);
              lines = value.split('\n');
            } catch (e) {}
          } else if ( typeof value === 'object') {
            value = JSON.stringify(value, null, 2);
            lines = value.split('\n');
          }

          return (
            <div className="code-editor-container">
              <div className="code-editor-inner">
                <div className="code-editor">
                  <div className="line-numbers">
                    {lines?.map((_, index) => (
                      <span key={index}>{index + 1}</span>
                    ))}
                  </div>
                  <textarea
                    id ="ideaExtraData"
                    className="code-input"
                    onChange={(event) => this.handleChange(event, fieldProps)}
                    placeholder={value}
                    value={value}
                  />
                </div>
              </div>
              {!!value && (
                errorMessage ? (
                  <p style={{ color: 'red' }}>❌ {errorMessage}</p>
                ) : (
                  <p style={{ color: 'green' }}>✅</p>
                )
              )}
            </div>
          );
        }}
      </Field>
    );
  }
}

export default JsonInput;
