'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { TraderAgent } from 'graphql/types';
import { useLayoutEffect } from 'react';

import chartData from './chart-data.json';

type TraderAgentInfo = Pick<TraderAgent, 'id' | 'totalBets'>;

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
        valueField: 'totalBets',
        categoryField: 'id',
        childDataField: 'children',
        nodePadding: 12,
      }),
    );

    series.circles.template.setAll({
      fillOpacity: 0.7,
      strokeWidth: 1,
      strokeOpacity: 0,
    });

    // series.circles.template.adapters.add('fill', (fill, target) => {
    //   const dataItem = target.dataItem;
    //   if (dataItem) {
    //     const totalBets = (dataItem.dataContext as TraderAgentInfo).totalBets;
    //     if (totalBets < 100) {
    //       return am5.color(0x0000ff); // blue
    //     } else if (totalBets > 100 && totalBets < 200) {
    //       return am5.color(0x00ff00); // green
    //     } else if (totalBets >= 200 && totalBets < 300) {
    //       return am5.color(0xffff00); // yellow
    //     } else if (totalBets >= 300 && totalBets < 400) {
    //       return am5.color(0xffa500); // orange
    //     } else if (totalBets >= 400 && totalBets < 500) {
    //       return am5.color(0xff0000); // red
    //     } else if (totalBets >= 500) {
    //       return am5.color(0x8a2be2); // blueviolet
    //     }
    //   }
    //   return fill;
    // });

    setInterval(async () => {
      const allInnerCircles = series.circles;
      // console.log('allInnerCircles', allInnerCircles);
      const circle = allInnerCircles.values[1];
      // allInnerCircles._values.forEach((circle) => {
      // const circle = dataItem.get('circle');
      // console.log('dataItem', dataItem);

      // const circle = dataItem.get('circle');
      // console.log('circle', circle);

      // const dataContext = dataItem.dataContext as TraderAgentInfo;
      // const currentTotalBets = dataContext.totalBets;
      // console.log('circle', currentTotalBets);

      if (circle) {
        const animation = circle.animate({
          key: 'y',
          from: -20,
          to: 20,
          loops: 4,
          duration: 100,
          easing: am5.ease.yoyo(am5.ease.cubic),
        });

        await new Promise((resolve) => setTimeout(resolve, 300)); // 3 sec

        // animation.events.on('stopped', () => {
        circle.animate({
          key: 'y',
          to: 0,
          duration: 50,
          easing: am5.ease.out(am5.ease.cubic),
        });
        // .play();
        // });

        animation.play();
      }

      // dataItem.set('value', currentTotalBets);
      // Update the value (if necessary) in the dataItem
      // const dataContext = dataItem.dataContext as TraderAgentInfo;
      // const currentTotalBets = dataContext.totalBets;
      // dataItem.set('value', currentTotalBets);
      // });
    }, 2000);
    // });

    // Simulate data validation after a delay
    // setInterval(() => {
    //   // Update the data
    //   series.data.setIndex(0, {
    //     name: 'root',
    //     totalBets: Math.floor(Math.random() * 1000),
    //   });

    //   // Dispatch the dataitemsvalidated event
    //   if (!root.isDisposed()) {
    //     series.events.dispatch('datavalidated', {
    //       type: 'datavalidated',
    //       target: series,
    //     });
    //   }
    // }, 2000);

    series.data.setAll([
      {
        name: 'Root',
        children: chartData,
      },
    ]);

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" style={{ width: '100%', height: '640px' }}></div>;
};

export default Chart;
