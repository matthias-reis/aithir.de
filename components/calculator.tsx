import styled from '@emotion/styled';
import { FC } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory';
import { fontSizeLarge, fontSizeStandard, fontStackSerif } from '../core/style';

const inhabitants = {
  pe: 1,
  de: 83_000_000,
  eu: 447_000_000,
  ch: 1_412_000_000,
  us: 332_000_000,
  wo: 7_674_000_000,
};

type Calculus = {
  name: string;
  value: number;
  reference: keyof typeof inhabitants;
};

const budget = 1.6; // tons per person per year

const color = '#6b898f';
const colorReference = '#3c4105';

export const Calculator: FC<{
  data: { title: string; text: string; calculus: Calculus[] };
}> = ({ data }) => {
  const graph: { name: string; result: number; reference?: boolean }[] =
    data.calculus.map(({ name, value, reference }) => ({
      name,
      result: Math.round((value * 100) / (inhabitants[reference] * budget)),
    }));
  graph.push({ name: 'Budget', result: 100, reference: true });
  return (
    <Viewer>
      <Legend>
        <Title>World 2</Title>
        <SubTitle>{data.title}</SubTitle>
        <TopText>{data.text}</TopText>
      </Legend>
      <Canvas>
        <CanvasChart>
          <VictoryChart
            domainPadding={{ x: 40, y: 0 }}
            width={400}
            height={350}
            padding={{ left: 100, right: 50 }}
          >
            <VictoryAxis width={200} />
            <VictoryBar
              data={graph}
              x="name"
              y="result"
              barRatio={0.8}
              horizontal
              labels={({ datum }) => datum.result + '%'}
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.reference ? colorReference : color,
                  stroke: '#000',
                  strokeWidth: '1px',
                  fillOpacity: 0.5,
                },
              }}
            />
          </VictoryChart>
        </CanvasChart>
      </Canvas>
      <BottomLegend>
        <BottomText>{data.text}</BottomText>
      </BottomLegend>
    </Viewer>
  );
};

const Viewer = styled.div`
  background-image: linear-gradient(
    15deg,
    #3c4105 10%,
    #777d30 40%,
    #f8e7c4 80%,
    #6b898f 90%
  );
  padding: 1rem;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  gap: 1rem;
  @media (max-width: 850px) {
    flex-direction: column;
    padding-bottom: 4rem;
  }
`;

const Legend = styled.div`
  flex: 1 1 50%;
`;

const Canvas = styled.div`
  flex: 1 1 50%;
  background: #fff4;
  padding: 1rem;
  border-radius: 1rem;
  backdrop-filter: blur(2rem);
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;
  font-family: ${fontStackSerif};
  font-size: ${fontSizeLarge};
  margin: 0;
  color: #000;
`;
const Text = styled.p`
  font-size: ${fontSizeStandard};
  margin: 0;
  margin-top: 2rem;
  color: #000;
`;
const BottomLegend = styled.div`
  flex: 1 1 50%;
  @media (min-width: 851px) {
    display: none;
  }
`;
const TopText = styled(Text)`
  @media (max-width: 850px) {
    display: none;
  }
`;
const BottomText = styled(Text)`
  color: #fff;
`;

const CanvasChart = styled.div`
  flex: 1 1 auto;
`;

const SubTitle = styled.h4`
  text-align: center;
  font-size: 1rem;
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin: 0;
  color: #000;
`;
