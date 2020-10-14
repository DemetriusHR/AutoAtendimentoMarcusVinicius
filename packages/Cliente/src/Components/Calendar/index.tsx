import AntCalendar from 'antd/lib/calendar';
import styled from 'styled-components';
import shadeColor from '../../Utils/ShadeColor';

const Calendar = styled(AntCalendar)`
  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    text-align: center;
    padding-top: 1rem;
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-content {
    height: 1rem;
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value {
    color: ${(props) => shadeColor(props.theme.primaryColor, -20)};
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today {
    background: ${(props) => shadeColor(props.theme.primaryColor, 90)};
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today {
    border-color: var(--primary-color);
  }

  &.ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date {
    border: 1px solid #707070;
    margin-bottom: 0.3rem;
  }
`;

export default Calendar;
