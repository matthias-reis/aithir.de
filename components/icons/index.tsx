import { FC, SVGProps } from 'react';

import AiJobs from './ai-jobs';
import FourthWave from './fourth-wave';
import General from './general';
import Goliath from './goliath';
import Hermetics from './hermetics';
import Kret from './kret';
import Mesh from './mesh';
import SimulationTheory from './simulation-theory';
import Tattoos from './tattoos';
import Transspace from './transspace';
import World2 from './world-2';

export const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  'ai-jobs': AiJobs,
  'fourth-wave': FourthWave,
  general: General,
  goliath: Goliath,
  hermetics: Hermetics,
  kret: Kret,
  mesh: Mesh,
  'simulation-theory': SimulationTheory,
  tattoos: Tattoos,
  transspace: Transspace,
  'world-2': World2,
};