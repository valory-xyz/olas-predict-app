'use client';

import * as am5 from '@amcharts/amcharts5';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useLayoutEffect } from 'react';

import chartData from './chart-data.json';

export const Chart = () => {
  useLayoutEffect(() => {
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: 'zoomXY',
        pinchZoomX: true,
        pinchZoomY: true,
      }),
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    const xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    xAxis.children.moveValue(
      am5.Label.new(root, {
        text: 'GDP per Capita, USD',
        x: am5.p50,
        centerX: am5.p50,
      }),
      xAxis.children.length - 1,
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: false,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    yAxis.children.moveValue(
      am5.Label.new(root, {
        rotation: -90,
        text: 'Life expectancy, years',
        y: am5.p50,
        centerX: am5.p50,
      }),
      0,
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'y',
        valueXField: 'x',
        valueField: 'value',
        seriesTooltipTarget: 'bullet',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText:
            "[bold]{title}[/]\nLife expectancy: {valueY.formatNumber('#.0')}\nGDP: {valueX.formatNumber('#,###.')}\nPopulation: {value.formatNumber('#,###.')}",
        }),
      }),
    );

    series.strokes.template.set('visible', false);

    // Add bullet
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
    const circleTemplate = am5.Template.new({});
    circleTemplate.adapters.add('fill', function (fill, target) {
      const dataItem = target.dataItem;
      if (dataItem) {
        return am5.Color.fromString(dataItem.dataContext.color);
      }
      return fill;
    });
    series.bullets.push(function () {
      const bulletCircle = am5.Circle.new(
        root,
        {
          radius: 5,
          fill: series.get('fill'),
          fillOpacity: 0.8,
        },
        circleTemplate,
      );
      return am5.Bullet.new(root, {
        sprite: bulletCircle,
      });
    });

    // Add heat rule
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set('heatRules', [
      {
        target: circleTemplate,
        min: 3,
        max: 60,
        dataField: 'value',
        key: 'radius',
      },
    ]);

    // Set data
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
    series.data.setAll(chartData);

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    chart.set(
      'cursor',
      am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series],
      }),
    );

    // Add scrollbars
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      }),
    );

    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
      }),
    );

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default Chart;
