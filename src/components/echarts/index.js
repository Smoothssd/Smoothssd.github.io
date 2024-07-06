import { useEffect, useRef } from "react";
import * as echarts from "echarts";

function Chart({ options, Width, Height }) {
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {

            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current);
            }
            chartInstance.setOption(options);
        } catch (error) {
            console.error("error", error.message);
            chartInstance && chartInstance.dispose();
        }
    }


    function resizeHandler() {
        chartInstance.resize();
    }


    useEffect(() => {
        renderChart();

        return () => {

            chartInstance && chartInstance.dispose();
        };
    }, []);


    useEffect(() => {
        window.addEventListener("resize", resizeHandler);
        return () => window.removeEventListener("resize", resizeHandler);
    }, []);

    return (
        <div>

            <div style={{ height: Height, width: Width }} ref={chartRef} />
        </div>
    );
}

export default Chart;
