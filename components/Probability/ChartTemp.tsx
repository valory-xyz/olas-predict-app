import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CHART_HEIGHT, NA } from 'constants/index';

const outcomes = ['YES'];

export const Chart = ({ data }: { data: { timestamp: Date; value: number }[] }) => (
  <ResponsiveContainer height={CHART_HEIGHT}>
    <LineChart data={data}>
      <XAxis dataKey="timestamp" />
      <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
      <Tooltip
        content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            const value = payload[0].value;
            return (
              <div
                style={{
                  backgroundColor: '#fff',
                  padding: '10px',
                  border: '1px solid #ccc',
                }}
              >
                <b>{`${outcomes ? outcomes[0] : NA} ${value}%`}</b>
                <br />
                {label}
              </div>
            );
          }
          return null;
        }}
      />
      <Line type="monotone" dataKey="value" stroke="#FFFFFF" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);
