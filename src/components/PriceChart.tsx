
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

interface PriceChartProps {
  data: {
    name: string;
    predictedPrice: number;
    averagePrice: number;
  }[];
}

const PriceChart = ({ data }: PriceChartProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Find the maximum value to set a proper domain for the Y axis
  const maxValue = Math.max(
    ...data.map((item) => Math.max(item.predictedPrice, item.averagePrice))
  );
  const yAxisDomain = [0, Math.ceil(maxValue * 1.1 / 100000) * 100000];

  return (
    <Card className="card-glass p-4 md:p-6">
      <h3 className="text-lg font-medium mb-4">Price Trend Analysis</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
            />
            <YAxis 
              tickFormatter={formatCurrency} 
              domain={yAxisDomain}
              tick={{ fontSize: 12 }} 
              tickMargin={10}
            />
            <Tooltip 
              formatter={(value) => [formatCurrency(value as number), '']}
              contentStyle={{ 
                borderRadius: '8px', 
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              }}
            />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="predictedPrice"
              name="Predicted Price"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorPredicted)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area
              type="monotone"
              dataKey="averagePrice"
              name="Market Average"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorAverage)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PriceChart;
