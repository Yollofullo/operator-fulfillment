// components/ui/card.tsx
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border rounded shadow-md p-4 bg-white">{children}</div>
);

export const CardContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="p-2">{children}</div>;
