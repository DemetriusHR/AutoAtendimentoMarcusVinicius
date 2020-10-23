import React, { useCallback, useState } from 'react';
import { InputProps } from 'antd/lib/input';

import Input from '../Input';

const NonNumeric = /\D/g;

const mapToNumeric: (value: string) => string = (value: string) => value.replace(NonNumeric, '');

const formataCPF: (value: string) => string = (value: string) => mapToNumeric(value)
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

const InputCPF: React.FC<InputProps> = React.memo(
  ({ onChange, ...rest }: InputProps) => {
    const [valueInput, setValue] = useState('');

    const onChangeInput = useCallback(
      (e) => {
        const { value } = e.target;
        let valor = value.length < 15 ? value : value.substring(0, value.length - 1);
        valor = formataCPF(valor);

        setValue(valor);

        if (onChange) {
          onChange(e);
        }
      },
      [onChange],
    );

    return <Input {...rest} onChange={onChangeInput} value={valueInput} />;
  },
);

export default InputCPF;
