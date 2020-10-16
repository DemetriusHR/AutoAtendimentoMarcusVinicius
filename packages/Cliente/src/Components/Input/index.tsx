import React from 'react';
import AntInput, { InputProps } from 'antd/lib/input';
import styled from 'styled-components';

const InputWrapper = styled.div`
  * {
    transition: 0.3s all;
  }

  input {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--text-color);
    padding: 2px 5px;
    font-size: 1rem;
    transition: 0.3s all ease;
    color: var(--text-color);
    background: var(--background);
    width: 100%;
    outline: 0;

    &.ant-form-item-has-error {
      border-color: var(--error-color);
      border-width: 2px;

      &.ant-input:focus {
        outline: 0;
        border-bottom-color: var(--error-color);
        box-shadow: 0 0 0 0 transparent;
      }
    }

    :hover {
      border-bottom-color: var(--primary-color);
    }

    :focus {
      outline: 0;
      border-bottom-color: var(--primary-color);
      box-shadow: 0 0 0 0 transparent;

      & ~ .border-effect {
        width: 100%;
        background: var(--primary-color);
      }
    }
  }

  &.ant-form-item-has-error {
    border-color: var(--error-color);
    border-width: 2px;

    &.ant-input:focus {
      outline: 0;
      border-bottom-color: var(--error-color);
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .border-effect {
    width: 0;
    height: 1px;
    background: #fff;
  }
`;

const Input: React.FC<InputProps> = React.memo(
  (
    props: InputProps,
  ) => (
    <InputWrapper>
      <AntInput
        {...props}
      />
      <div className="border-effect" />
    </InputWrapper>
  ),
);

export default Input;
