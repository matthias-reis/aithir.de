'use client';

import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import type { ItemMeta } from '../core/types';

export const Factors: FC<{ meta: ItemMeta }> = ({ meta }) => {
  const { has } = useSearchParams();
  return has('admin') ? (
    <ul className="text-s text-decent-500">
      <li>
        AGE <strong>{meta.factors?.ageFactor.toFixed(2)}</strong>
      </li>
      <li>
        PROGRESS <strong>{meta.factors?.progressFactor.toFixed(2)}</strong>
      </li>
      <li>
        SEED <strong>{meta.factors?.seedFactor.toFixed(2)}</strong>
      </li>
      <li>
        TYPE <strong>{meta.factors?.typeFactor.toFixed(2)}</strong>
      </li>
      <li>
        OVERALL <strong>{meta.factors?.overall.toFixed(2)}</strong>
      </li>
    </ul>
  ) : null;
};
