import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import DashboardBox from "@/components/DashboardBox";
import BoxHeader from "@/components/BoxHeader";
import { useTheme } from "@mui/material";
import "./Row1.css";

interface KeuanganData {
  Bulan: string;
  Product: string;
  Masuk: number;
  Keluar: number;
  Stok: number;
  Total: number;
  Keterangan: string;
}

const Row1 = () => {
  const { palette } = useTheme();
  const [data, setData] = useState<KeuanganData[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null); // State for selected day in spider chart

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/PT.AdvanceFinance/GetKeuangan"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData.Data || []); // Ensure setData handles potential null or undefined cases
    } catch (error) {
      console.error("Error fetching data:", error);
      // Optionally, handle error states or alerts here
    }
  };

  const revenueExpensesData = data.map(
    ({ Product, Masuk: transaksiMasuk, Keluar: transaksiKeluar }) => ({
      name: Product,
      revenue: transaksiMasuk,
      expenses: transaksiKeluar,
    })
  );

  const revenueProfitData = data.map(
    ({ Bulan, Stok: jumlahTransaksi, Total: totalTransaksi }) => ({
      name: Bulan.substring(0, 3),
      revenue: ((jumlahTransaksi / totalTransaksi) * 100).toFixed(2), // Convert to percentage
      profit: (
        ((jumlahTransaksi - totalTransaksi) / totalTransaksi) *
        100
      ).toFixed(2), // Convert to percentage
    })
  );

  const revenueData = data.map(({ Bulan, Total: transaksiMasuk }) => ({
    name: Bulan.substring(0, 3),
    Total: transaksiMasuk,
  }));

  // Handle click on a day in spider chart
  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    // Add logic here if needed when a day is clicked
  };

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Masuk Dan Keluar Product"
          subtitle="Dihitung dalam beberapa minggu terakhir"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={revenueExpensesData}
            margin={{ top: 15, right: 25, left: -10, bottom: 60 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary.main}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary.main}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.secondary.main}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.secondary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[300]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              domain={[0, "auto"]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.secondary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b">
        <BoxHeader
          title="Data Mount"
          subtitle="Di Dapat Dari Beberapa Bulan Di Tahun 2022"
          sideText="+24%"
        />
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={revenueProfitData}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[300]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip formatter={(value, name, props) => `${value}%`} />
            <Legend wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.primary.main}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.secondary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Data Product"
          subtitle="Detail Product Dan Keterangan"
          sideText="+40% Dari Tahun Lalu"
        />
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={revenueData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis
              tick={false}
              angle={90}
              domain={[0, Math.max(...revenueData.map((item) => item.Total))]}
            />
            <Radar
              name="Total"
              dataKey="Total"
              stroke={palette.primary.main}
              fill={palette.primary.main}
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;
