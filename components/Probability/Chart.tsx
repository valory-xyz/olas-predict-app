import { Flex } from 'antd';
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { CHART_HEIGHT } from 'constants/index';
import { COLOR } from 'constants/theme';

const TooltipContainer = styled(Flex)`
  padding: 8px;
  background-color: #fff;
  border: 1px solid ${COLOR.BLACK_TRANSPARENT_20};
  color: ${COLOR.TEXT};
  font-size: 12px;
`;

const formattedDate = (date: Date) =>
  date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

type ChartProps = {
  outcome: string;
  data: { timestamp: Date; value: number }[];
};

export const Chart = ({ outcome, data }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
      <LineChart data={data}>
        <CartesianGrid stroke="#6A5C9A" strokeDasharray="3 3" opacity={0.3} />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(timestamp) =>
            new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' }).format(timestamp)
          }
          tick={{ fill: COLOR.SECONDARY, fontSize: 12 }}
          interval="preserveEnd"
          minTickGap={20}
          allowDataOverflow
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          orientation="right"
          tickFormatter={(value) => `${value}%`}
          tick={{ fill: COLOR.SECONDARY, fontSize: 12 }}
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ payload, label }) => {
            const value = payload?.[0]?.value;
            return (
              <TooltipContainer vertical gap={4}>
                <span>
                  <b>{`${outcome} ${value}%`}</b>
                </span>
                <span>{formattedDate(label)}</span>
              </TooltipContainer>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={COLOR.TEXT_PRIMARY}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
