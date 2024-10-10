'use client';

import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from '@amcharts/amcharts5/hierarchy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
// import agentsAllData from './chart-data.json';
import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import { getAllTraderAgents } from 'graphql/queries';
// import { TraderAgent } from 'graphql/types';
import { useLayoutEffect } from 'react';

import { getAgentName } from 'utils/agents';

// type TraderAgentInfo = Pick<TraderAgent, 'id' | 'totalBets'> | 'name';

export const Chart = () => {
  const { data: agentsAllData, isLoading } = useQuery({
    queryKey: ['getAllTraderAgents'],
    queryFn: async () => getAllTraderAgents(),
    select: (data) => data.traderAgents.filter((agent) => agent.totalBets > 200),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  useLayoutEffect(() => {
    const root = am5.Root.new('trader-agent-breakdown');

    root.setThemes([am5themes_Animated.new(root)]);

    const zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true,
      }),
    );

    zoomableContainer.children.push(
      am5.ZoomTools.new(root, {
        target: zoomableContainer,
      }),
    );

    const series = zoomableContainer.contents.children.push(
      am5hierarchy.Pack.new(root, {
        maskContent: false, //!important with zoomable containers
        topDepth: 1,
        valueField: 'totalBets',
        categoryField: 'name',
        childDataField: 'children',
        nodePadding: 12,
      }),
    );

    series.circles.template.setAll({
      fillOpacity: 0.7,
      strokeWidth: 1,
      strokeOpacity: 0,
    });

    // simulation of transactions being received every 4 seconds
    setInterval(async () => {
      if (!agentsAllData) return;

      const filteredAgents = agentsAllData.filter((agent) => agent.totalBets > 1000);
      const getRandomIndex = () => {
        if (!agentsAllData || agentsAllData.length === 0) return 0;

        if (filteredAgents.length === 0) return 0; // or handle the case where no agents meet the criteria

        const index = Math.floor(Math.random() * filteredAgents.length);

        const indexOfAgent = agentsAllData.findIndex(
          (agent) => agent.id === filteredAgents[index].id,
        );

        return indexOfAgent;
      };

      const allInnerCircles = series.circles;
      const circle = allInnerCircles.values[getRandomIndex()];

      if (!circle) return;

      const animation = circle.animate({
        key: 'y',
        from: -30,
        to: 30,
        loops: 2,
        duration: 200,
        easing: am5.ease.yoyo(am5.ease.cubic),
      });

      // wait for the animation to finish
      await new Promise((resolve) => setTimeout(resolve, 300));

      circle.animate({
        key: 'y',
        to: 0,
        duration: 50,
        easing: am5.ease.out(am5.ease.cubic),
      });

      animation.play();
    }, 3000);

    series.data.setAll([
      {
        name: '',
        children: agentsAllData?.map((data) => ({
          id: data.id,
          name: getAgentName(data.id),
          totalBets: data.totalBets,
        })),
      },
    ]);

    // series.labels.template.setAll({
    //   text: '{category}',
    //   visible: false,
    // });

    // Make stuff animate on load
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [agentsAllData]);

  return (
    <div id="trader-agent-breakdown" style={{ width: '100%', height: '640px' }}>
      {isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Chart;
