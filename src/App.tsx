import { ConfigProvider, theme } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocaleData from 'dayjs/plugin/localeData';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import WeekDay from 'dayjs/plugin/weekday';
import React from 'react';
import { ThemeMode } from './enum';
import { MainWrapper } from './pages';
import { useTheme } from './store/useTheme';

dayjs.extend(WeekDay);
dayjs.extend(LocaleData);
dayjs.extend(LocalizedFormat);
dayjs.extend(customParseFormat);

export default function App() {
  const { themeMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        ...theme,
        algorithm:
          themeMode === ThemeMode.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <MainWrapper />
    </ConfigProvider>
  );
}
