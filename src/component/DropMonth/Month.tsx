import React, { useState} from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select';
import styles from'./Month.module.css';

type stateManagedSelect = {
    value: number;
    label: string;
}

const options = [
    { value: 1, label: 'Tháng 1'},
    { value: 2, label: 'Tháng 2'},
    { value: 3, label: 'Tháng 3'},
    { value: 4, label: 'Tháng 4'},
    { value: 5, label: 'Tháng 5'},
    { value: 6, label: 'Tháng 6'},
    { value: 7, label: 'Tháng 7'},
    { value: 8, label: 'Tháng 8'},
    { value: 9, label: 'Tháng 9'},
    { value: 10, label: 'Tháng 10'},
    { value: 11, label: 'Tháng 11'},
    { value: 12, label: 'Tháng 12'},
]

type TypeProps = {
    onChange: (newValue: number | null) => void;
    className: string;
}

export const Month: React.FC<TypeProps> = ({ onChange, className }) => {
    const [select, setSelect] = useState<stateManagedSelect | null>(null);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const defaultValue: stateManagedSelect = {
        value: currentMonth,
        label: `Tháng ${currentMonth}, ${currentYear}`,
      };
    const handleChange = (newValue: stateManagedSelect | null) => {
        setSelect(newValue);
        onChange(newValue ? newValue.value : null);
    }
  return (
    <div className={styles.box}>
        <Select
            value={select}
            onChange={handleChange}
            options={options}
            className={`${styles.customStyle} ${className}`}
            placeholder={defaultValue.label}
        />
    </div>
  )
}
