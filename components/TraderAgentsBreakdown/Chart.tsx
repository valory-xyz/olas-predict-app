'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
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

    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true,
      }),
    );

    const zoomTools = zoomableContainer.children.push(
      am5.ZoomTools.new(root, {
        target: zoomableContainer,
      }),
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
    const series = zoomableContainer.contents.children.push(
      am5hierarchy.Pack.new(root, {
        maskContent: false, //!important with zoomable containers
        topDepth: 1,
        valueField: 'value',
        categoryField: 'name',
        childDataField: 'children',
      }),
    );

    series.data.setAll([
      {
        name: 'root',
        children: chartData,
      },
    ]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>;
};

export default Chart;
