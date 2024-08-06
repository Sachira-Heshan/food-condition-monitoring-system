import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type LineChartProps = {
    title: string;
    options: object;
    series: ApexAxisChartSeries;
}

export default function LineChart(props: LineChartProps) {
   return (
      <div className="">
         <h1>{props.title}</h1>
         <ApexChart
            options={props.options}
            series={props.series}
            type="line"
            height={350}
            // width={"100%"}
         />
      </div>
   );
}
